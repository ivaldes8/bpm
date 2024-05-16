import nodemailer from "nodemailer"
import { GOOGLE_EMAIL, GOOGLE_EMAIL_PASSWORD } from "./secrets";
import { prismaClient } from "./server";

export const transporter = nodemailer.createTransport({
    service: 'gmail', // replace with your email service
    auth: {
        user: GOOGLE_EMAIL,
        pass: GOOGLE_EMAIL_PASSWORD
    }
});


export const sendEmailWithIncidencesByContract = async () => {
    const contracts = await prismaClient.contrato.findMany({
        include: {
            CanalMediador: true,
            DocumentoContrato: {
                include: {
                    MaestroDocumentos: true,
                    IncidenciaDocumento: {
                        include: {
                            MaestroIncidencias: true
                        }
                    }
                }
            }
        }
    });

    for (const contract of contracts) {
        if (!contract.FechaConciliacion) {
            const currentDate = new Date();
            const lastModifiedDate = new Date(contract.FechaUltimaModif);
            const diffInTime = currentDate.getTime() - lastModifiedDate.getTime();
            const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
            // if (diffInDays === 30 || diffInDays === 60 || diffInDays === 90) {
            const documents = await buildDocumentsWithIncidences(contract);
            sendPolicyWithIncidenceReminder(contract.CanalMediador.EmailResponsable ?? '', documents);
            await updateReclamationsNumber(contract.ContratoId);
            // }
        }
    }
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

export const sendPolicyWithIncidenceReminder = async (to: string, documents: any[]) => {

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
        from: 'kaosolution8@gmail.com', // sender address
        to: to, // list of receivers
        subject: 'Hello', // Subject line
        text: 'Hello world?', // plain text body
        html: `
            <b>Hello world?</b>
            ${documentsHtml}
        `
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


