import { Request, Response } from "express";
import { prismaClient } from "../server";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { CompanyCreateSchema, CompanyUpdateSchema } from "../schema/company";

export const getCompanies = async (req: Request, res: Response) => {
    const companies = await prismaClient.compania.findMany({})

    res.json(companies)
}

export const getCompaniesSimplified = async (req: Request, res: Response) => {
    const companies = await prismaClient.compania.findMany({
        select: {
            CompaniaId: true,
            Nombre: true,
            Codigo: true
        }
    })

    res.json(companies)
}

export const createCompany = async (req: Request, res: Response) => {

    const validatedData = CompanyCreateSchema.parse(req.body)

    if (validatedData.Codigo) {
        const code = await prismaClient.compania.findFirst({
            where: {
                Codigo: validatedData.Codigo
            }
        })

        if (code) {
            throw new NotFoundException("Code already in use", ErrorCode.COMPANY_CODE_ALREADY_IN_USE)
        }
    }

    if (validatedData.Descripcion) {
        const description = await prismaClient.compania.findFirst({
            where: {
                Descripcion: validatedData.Descripcion
            }
        })

        if (description) {
            throw new NotFoundException("Description already in use", ErrorCode.COMPANY_DESCRIPTION_ALREADY_IN_USE)
        }
    }

    const company = await prismaClient.compania.create({
        data: validatedData as any
    })

    res.json(company);
}

export const updateCompany = async (req: Request, res: Response) => {

    try {
        await prismaClient.compania.findFirstOrThrow({
            where: {
                CompaniaId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("Company not found", ErrorCode.COMPANY_NOT_FOUND)
    }

    const validatedData = CompanyUpdateSchema.parse(req.body)

    if (validatedData.Codigo) {
        const code = await prismaClient.compania.findFirst({
            where: {
                Codigo: validatedData.Codigo
            }
        })

        if (code && code.CompaniaId !== parseInt(req.params.id)) {
            throw new NotFoundException("Code already in use", ErrorCode.COMPANY_CODE_ALREADY_IN_USE)
        }
    }

    if (validatedData.Descripcion) {
        const description = await prismaClient.compania.findFirst({
            where: {
                Descripcion: validatedData.Descripcion
            }
        })

        if (description) {
            throw new NotFoundException("Description already in use", ErrorCode.COMPANY_DESCRIPTION_ALREADY_IN_USE)
        }
    }

    const updatedCompany = await prismaClient.compania.update({
        where: {
            CompaniaId: parseInt(req.params.id)
        },
        data: { ...validatedData as any, FechaUltimaModif: new Date() }
    })

    res.json(updatedCompany)
}

export const getCompanyById = async (req: Request, res: Response) => {
    try {
        const company = await prismaClient.compania.findFirstOrThrow({
            where: {
                CompaniaId: parseInt(req.params.id)
            }
        })

        res.json(company);
    } catch (error) {
        throw new NotFoundException("Compañía not found", ErrorCode.COMPANY_NOT_FOUND);
    }
}

export const deleteCompany = async (req: Request, res: Response) => {

    try {
        await prismaClient.compania.findFirstOrThrow({
            where: {
                CompaniaId: parseInt(req.params.id)
            }
        })
    } catch (error) {
        throw new NotFoundException("Compañía not found", ErrorCode.COMPANY_NOT_FOUND)
    }

    await prismaClient.compania.delete({
        where: {
            CompaniaId: parseInt(req.params.id)
        }
    })

    res.json({ message: "deleted" });
}