import { createReadStream } from 'fs';
import csvParser from 'csv-parser';
import * as excel from 'exceljs';


export const parseCsv = async (file: Express.Multer.File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const results: any[] = [];

        createReadStream(file.path)
            .pipe(csvParser({ separator: ';' }))
            .on('data', (data: any) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error: any) => reject(error));
    });
}

export const parseExcel = async (file: Express.Multer.File): Promise<any[]> => {
    return new Promise(async (resolve, reject) => {
        const workbook = new excel.Workbook();

        try {
            await workbook.xlsx.readFile(file.path);
            const worksheet = workbook.getWorksheet(1);
            const results: any[] = [];

            if (worksheet) {
                const headers: string[] = [];
                worksheet.eachRow((row: any, rowNumber: number) => {
                    const rowData: any = {};
                    row.eachCell((cell: any, colNumber: number) => {
                        if (rowNumber === 1) {
                            headers[colNumber] = cell.value;
                        } else {
                            rowData[headers[colNumber]] = cell.value;
                        }
                    });
                    if (rowNumber !== 1) {
                        results.push(rowData);
                    }
                });
            }

            resolve(results);
        } catch (error) {
            console.log(error, "ERROR");
            reject(error);
        }
    });
}