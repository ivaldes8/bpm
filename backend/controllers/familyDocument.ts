import { Request, Response } from "express";
import { prismaClient } from "../server";
import { createFamiliaDocumentoSchema, updateFamiliaDocumentoSchema } from "../schema/familyDocument";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";
import { InternalException } from "../exceptions/internal-exception";
import { BadRequestsException } from "../exceptions/bad-requests";

export const getFamilyDocuments = async (req: Request, res: Response) => {
  const familyDocuments = await prismaClient.familiaDocumento.findMany({});

  return res.json(familyDocuments);
};

export const createFamilyDocument = async (req: Request, res: Response) => {
  const validatedData = createFamiliaDocumentoSchema.parse(req.body);

  if (validatedData.Codigo) {
    const code = await prismaClient.familiaDocumento.findFirst({
      where: {
        Codigo: validatedData.Codigo,
      },
    });

    if (code) {
      throw new BadRequestsException(
        "Code already in use",
        ErrorCode.BAD_REQUEST_EXCEPTION
      );
    }
  }

  try {
    const familia = await prismaClient.familiaDocumento.create({
      data: validatedData as any,
    });

    res.json(familia);
  } catch (error) {
    console.log(error, "error");
    throw new InternalException(
      "Error while creating family document",
      error,
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
};

export const updateFamilyDocument = async (req: Request, res: Response) => {
  try {
    await prismaClient.familiaDocumento.findFirstOrThrow({
      where: {
        FamiliaId: parseInt(req.params.id),
      },
    });
  } catch (error) {
    throw new NotFoundException(
      "Family document not found",
      ErrorCode.NOT_FOUND_EXCEPTION
    );
  }

  try {
    await prismaClient.familiaDocumento.update({
      where: {
        FamiliaId: parseInt(req.params.id),
      },
      data: req.body,
    });
  } catch (error) {
    throw new NotFoundException(
      "Error while updating family document",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }

  const validatedData = updateFamiliaDocumentoSchema.parse(req.body);

  const updatedFamilia = await prismaClient.familiaDocumento.update({
    where: {
      FamiliaId: parseInt(req.params.id),
    },
    data: { ...(validatedData as any), FechaUltimaModif: new Date() },
  });

  res.json(updatedFamilia);
};

export const deleteFamilyDocument = async (req: Request, res: Response) => {
  try {
    await prismaClient.familiaDocumento.findFirstOrThrow({
      where: {
        FamiliaId: parseInt(req.params.id),
      },
    });
  } catch (error) {
    throw new NotFoundException(
      "Family document not found",
      ErrorCode.NOT_FOUND_EXCEPTION
    );
  }

  try {
    await prismaClient.familiaDocumento.delete({
      where: {
        FamiliaId: parseInt(req.params.id),
      },
    });
  } catch (error) {
    throw new NotFoundException(
      "Error while deleting family document",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }

  res.json({ message: "deleted" });
};

export const getFamilyDocumentById = async (req: Request, res: Response) => {
  try {
    const familia = await prismaClient.familiaDocumento.findFirstOrThrow({
      where: {
        FamiliaId: parseInt(req.params.id),
      },
    });

    res.json(familia);
  } catch (error) {
    throw new NotFoundException(
      "Error while getting family document",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
};
