import { createReadStream } from 'fs';
import csvParser from 'csv-parser';
import * as excel from 'exceljs';

export const parseCsv = async (file: Express.Multer.File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const results: any[] = [];
        const stream = createReadStream(file.path)
            .pipe(csvParser({ separator: ';' }));

        stream.on('data', (data: any) => results.push(data));
        stream.on('end', () => resolve(results));
        stream.on('error', (error: any) => reject(new Error(error)));
    });
}

export const parseExcel = (file: Express.Multer.File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const workbook = new excel.Workbook();

        workbook.xlsx.readFile(file.path)
            .then(() => {
                const worksheet = workbook.getWorksheet(1);
                if (worksheet) {
                    const results = extractDataFromWorksheet(worksheet);
                    resolve(results);
                } else {
                    reject(new Error('Worksheet not found'));
                }
            })
            .catch((error) => reject(new Error(error)));
    });
}

const extractDataFromWorksheet = (worksheet: excel.Worksheet): any[] => {
    const results: any[] = [];
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

    return results;
}
