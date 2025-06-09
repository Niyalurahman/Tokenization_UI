import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const submitProperty = async (req: Request, res: Response) => {
  const { ownerId, title, description, location, documentsUrl } = req.body;

  const submission = await prisma.propertySubmission.create({
    data: { ownerId, title, description, location, documentsUrl },
  });

  res.status(201).json({ message: 'Property submitted', submission });
};

export const getPendingProperties = async (_: Request, res: Response) => {
  const pending = await prisma.propertySubmission.findMany({
    where: { status: 'PENDING' },
  });

  res.json(pending);
};

export const approveProperty = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const reviewer = req.body.reviewer || 'admin@example.com';
  const totalTokens = req.body.totalTokens || 100;

  const updated = await prisma.propertySubmission.update({
    where: { id },
    data: {
      status: 'APPROVED',
      reviewedAt: new Date(),
      reviewer,
      tokenized: true,
      totalTokens,
    },
  });

  res.json({ message: 'Property approved and tokenized', updated });
};


export const rejectProperty = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { reviewer = 'admin@example.com', rejectionReason } = req.body;

  const updated = await prisma.propertySubmission.update({
    where: { id },
    data: {
      status: 'REJECTED',
      reviewedAt: new Date(),
      reviewer,
      rejectionReason,
    },
  });

  res.json({ message: 'Property rejected', updated });
};

export const getTokenizedProperties = async (_req: Request, res: Response) => {
  const properties = await prisma.propertySubmission.findMany({
    where: {
      status: 'APPROVED',
      tokenized: true,
    },
    select: {
      id: true,
      title: true,
      location: true,
      totalTokens: true,
      reviewedAt: true,
    },
  });

  res.json(properties);
};
