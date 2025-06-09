import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const submitKYC = async (req: Request, res: Response) => {
  const { name, email, role } = req.body;

  const exists = await prisma.kYCSubmission.findUnique({ where: { email } });
  if (exists) {
    res.status(400).json({ message: 'KYC already submitted for this email' });
    return; // Important to avoid continuing
  }

  const submission = await prisma.kYCSubmission.create({
    data: { name, email, role },
  });

  res.status(201).json({ message: 'KYC submitted', submission });
};


export const getPendingKYCs = async (_req: Request, res: Response) => {
  const pending = await prisma.kYCSubmission.findMany({
    where: { status: 'PENDING' }
  });

  res.json(pending);
};

export const approveKYC = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const reviewer = req.body.reviewer || 'admin@example.com';

  const kyc = await prisma.kYCSubmission.update({
    where: { id },
    data: {
      status: 'APPROVED',
      reviewedAt: new Date(),
      reviewer,
    },
  });

  // Create user from approved KYC
  const user = await prisma.user.create({
    data: {
      name: kyc.name,
      email: kyc.email,
      role: kyc.role,
    },
  });

  res.json({ message: 'KYC Approved and user created', kyc, user });
};


export const rejectKYC = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { reviewer = 'admin@example.com', comments } = req.body;

  const updated = await prisma.kYCSubmission.update({
    where: { id: parseInt(id) },
    data: {
      status: 'REJECTED',
      reviewedAt: new Date(),
      reviewer,
      comments
    }
  });

  res.json({ message: 'KYC Rejected', updated });
};
