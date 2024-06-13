import { transporter } from "../nodemailer";
import { prismaClient } from "../server";

export const sendEmailWithIncidencesByContract = async () => {
    const contracts = await prismaClient.contrato.findMany({
        include: {
            Compania: true,
            CanalMediador: true,
            DocumentoContrato: {
                include: {
                    MaestroDocumentos: true,
                    IncidenciaDocumento: {
                        include: {
                            MaestroIncidencias: {
                                include: {
                                    TipoDocIncidencia: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    for (const contract of contracts) {
        if (shouldSendReminder(contract)) {
            const documents = await buildDocumentsWithIncidences(contract);
            if (documents.length > 0) {
                const cc = await searchCC(contract);
                await sendPolicyWithIncidenceReminder(contract.Compania.CorreoComp ?? '', cc, documents);
                await updateReclamationsNumber(contract.ContratoId);
            }
        }
    }
}

const shouldSendReminder = (contract: any): boolean => {
    return !contract.FechaConciliacion && isDueForReminder(contract.FechaUltimaModif);
}

const isDueForReminder = (lastModified: Date): boolean => {
    const currentDate = new Date();
    const lastModifiedDate = new Date(lastModified);
    const diffInTime = currentDate.getTime() - lastModifiedDate.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays === 30 || diffInDays === 60 || diffInDays === 90;
}

export const searchCC = async (contract: any): Promise<string> => {
    for (const document of contract.DocumentoContrato) {
        for (const incidence of document.IncidenciaDocumento) {
            for (const type of incidence.MaestroIncidencias.TipoDocIncidencia) {
                if (type.MailInterno) {
                    return contract.Compania.CorreoSoporte ?? '';
                }
            }
        }
    }
    return '';
}

export const buildDocumentsWithIncidences = async (contract: any) => {
    const documents = contract.DocumentoContrato.map((document: any) => {
        return {
            reclamations: document.NumeReclamaciones,
            name: document.MaestroDocumentos.Nombre,
            incidences: document.IncidenciaDocumento.map((incidence: any) => {
                return {
                    reclamations: incidence.NumReclamaciones,
                    description: incidence.MaestroIncidencias.Nombre
                }
            })
        }
    })

    return documents.filter((document: any) => document.incidences.length > 0);
}

export const sendPolicyWithIncidenceReminder = async (to: string, cc: string, documents: any[]) => {

    const documentsHtml = documents.map((document, i) => {
        const incidencesHtml = document.incidences.map((incidence: any, j: number) => `
            <div style="margin-bottom: 10px; border: 1px solid #ddd; padding: 10px; border-radius: 5px;">
                <h3 style="color: #d9534f;">Incidence ${j + 1}</h3>
                <p><strong>Reclamations:</strong> ${incidence.reclamations}</p>
                <p><strong>Incidence Description:</strong> ${incidence.description}</p>
            </div>
        `).join('');

        return `
            <div style="margin-bottom: 20px; border: 1px solid #ddd; padding: 20px; border-radius: 5px; background-color: #f5f5f5;">
                <h2 style="color: #5bc0de;">Document ${i + 1}</h2>
                <p><strong>Reclamations:</strong> ${document.reclamations}</p>
                <p><strong>Document Name:</strong> ${document.name}</p>
                ${incidencesHtml}
            </div>
        `;
    }).join('');

    // Setup email data
    let mailOptions = {
        from: 'kaosolution8@gmail.com',
        to: to,
        cc: cc,
        subject: 'Hello',
        text: '',
        html: `${documentsHtml} `
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });


}

const updateReclamationsNumber = async (contractId: number) => {
    const contract = await prismaClient.contrato.findFirst({
        where: {
            ContratoId: contractId
        },
        include: {
            DocumentoContrato: {
                include: {
                    IncidenciaDocumento: true
                }
            }
        }
    });

    if (contract) {
        for (const document of contract.DocumentoContrato) {
            if (document.IncidenciaDocumento.length > 0) {
                await prismaClient.documentoContrato.update({
                    where: {
                        DocumentoId: document.DocumentoId
                    },
                    data: {
                        NumeReclamaciones: document.NumeReclamaciones + 1
                    }
                })

                for (const incidence of document.IncidenciaDocumento) {
                    if (incidence) {
                        //@ts-ignore
                        await prismaClient.incidenciaDocumento.update({
                            where: {
                                IncidenciaId: incidence.IncidenciaId
                            },
                            data: {
                                //@ts-ignore
                                NumReclamaciones: incidence.NumReclamaciones + 1
                            }
                        })
                    }
                }
            }
        }
    }
}
