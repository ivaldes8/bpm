import { Request, Response } from "express";
import { prismaClient } from "../server";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createCompany = async (req: Request, res: Response) => {
    const company = await prismaClient.company.create({
        data: req.body
    })

    res.json(company);
}

export const updateCompany = async (req: Request, res: Response) => {
    try {
        const company = req.body

        const updatedCompany = await prismaClient.company.update({
            where: {
                id: +req.params.id
            },
            data: company
        })
        res.json(updatedCompany)
    } catch (error) {
        throw new NotFoundException("Company not found", ErrorCode.COMPANY_NOT_FOUND);
    }
}

export const getCompanyById = async (req: Request, res: Response) => {
    try {
        const company = await prismaClient.company.findFirstOrThrow({
            where: {
                id: +req.params.id
            }
        })

        res.json(company);
    } catch (error) {
        throw new NotFoundException("Company not found", ErrorCode.COMPANY_NOT_FOUND);
    }
}

export const getCompanies = async (req: Request, res: Response) => {
    const count = await prismaClient.company.count()
    const companies = await prismaClient.company.findMany({
        skip: +req.query.skip! || 0,
        take: +req.query.take! || 5
    })

    res.json({
        count, data: companies
    })
}

export const deleteCompany = async (req: Request, res: Response) => {

    try {
        const deletedCompany = await prismaClient.company.delete({
            where: {
                id: +req.params.id
            }
        })

        res.json({ message: "deleted" });
    } catch (error) {
        throw new NotFoundException("Company not found", ErrorCode.COMPANY_NOT_FOUND);
    }

}