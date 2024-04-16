import { Request, Response } from "express";
import { prismaClient } from "../server";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { CompanySchema } from "../schema/company";

export const createCompany = async (req: Request, res: Response) => {

    const validatedData = CompanySchema.parse(req.body)

    const company = await prismaClient.compania.create({
        data: validatedData as any
    })

    res.json(company);
}

export const updateCompany = async (req: Request, res: Response) => {

    try {
        const company = await prismaClient.compania.findFirstOrThrow({
            where: {
                CompaniaId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("Company not found", ErrorCode.COMPANY_NOT_FOUND)
    }

    const validatedData = CompanySchema.parse(req.body)

    const updatedCompany = await prismaClient.compania.update({
        where: {
            CompaniaId: parseInt(req.params.id)
        },
        data: validatedData as any
    })

    res.json(updatedCompany)
}

export const getCompanyById = async (req: Request, res: Response) => {
    try {
        const company = await prismaClient.compania.findFirstOrThrow({
            where: {
                CompaniaId: +req.params.id
            }
        })

        res.json(company);
    } catch (error) {
        throw new NotFoundException("Compañía not found", ErrorCode.COMPANY_NOT_FOUND);
    }
}

export const getCompanies = async (req: Request, res: Response) => {
    const companies = await prismaClient.compania.findMany({})

    res.json(companies)
}

export const deleteCompany = async (req: Request, res: Response) => {

    try {
        const company = await prismaClient.compania.findFirstOrThrow({
            where: {
                CompaniaId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("Compañía not found", ErrorCode.COMPANY_NOT_FOUND)
    }

    const deletedCompany = await prismaClient.compania.delete({
        where: {
            CompaniaId: parseInt(req.params.id)
        }
    })

    res.json({ message: "deleted" });
}