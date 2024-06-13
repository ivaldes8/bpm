import { Request, Response } from "express";
import { prismaClient } from "../server";
import { createTypeConciliationSchema, updateTypeConciliationSchema } from "../schema/typeConciliation";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";
import { InternalException } from "../exceptions/internal-exception";

export const getTypeConciliation = async (req: Request, res: Response) => {
  const typeConciliation = await prismaClient.tipoConciliacion.findMany({});

  return res.json(typeConciliation);
};

export const createTypeConciliation = async (req: Request, res: Response) => {
  const validatedData = createTypeConciliationSchema.parse(req.body);

  try {
    const conciliacion = await prismaClient.tipoConciliacion.create({
      data: validatedData as any,
    });

    res.json(conciliacion);
  } catch (error) {
    console.log(error, "error");
    throw new InternalException(
      "Error while creating type conciliation",
      error,
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
};

export const updateTypeConciliation = async (req: Request, res: Response) => {
  const validatedData = updateTypeConciliationSchema.parse(req.body);

  try {
    await prismaClient.tipoConciliacion.findFirstOrThrow({
      where: {
        TipoConciliacionId: parseInt(req.params.id),
      },
    });
  } catch (error) {
    throw new NotFoundException(
      "Type conciliation not found",
      ErrorCode.NOT_FOUND_EXCEPTION
    );
  }

  try {
    const updatedTypeConciliation = await prismaClient.tipoConciliacion.update({
      where: {
        TipoConciliacionId: parseInt(req.params.id),
      },
      data: { ...(validatedData as any), FechaUltimaModif: new Date() },
    });

    res.json(updatedTypeConciliation);
  } catch (error) {
    throw new NotFoundException(
      "Error while updating type conciliation",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
};

export const deleteTypeConciliation = async (req: Request, res: Response) => {
  try {
    await prismaClient.tipoConciliacion.findFirstOrThrow({
      where: {
        TipoConciliacionId: parseInt(req.params.id),
      },
    });
  } catch (error) {
    throw new NotFoundException(
      "Type Conciliation not found",
      ErrorCode.NOT_FOUND_EXCEPTION
    );
  }
  try {
    await prismaClient.tipoConciliacion.delete({
      where: {
        TipoConciliacionId: parseInt(req.params.id),
      },
    });
  } catch (error) {
    throw new NotFoundException(
      "Error while deleting type conciliation",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }

  res.json({ message: "deleted" });
};

export const getTypeConciliationById = async (req: Request, res: Response) => {
  try {
    const conciliacion = await prismaClient.tipoConciliacion.findFirstOrThrow({
      where: {
        TipoConciliacionId: parseInt(req.params.id),
      },
    });

    res.json(conciliacion);
  } catch (error) {
    throw new NotFoundException(
      "Error while getting type conciliation",
      ErrorCode.INTERNAL_EXCEPTION
    );
  }
};
