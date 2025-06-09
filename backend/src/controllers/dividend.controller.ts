import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const calculateDividend = async (req: Request, res: Response) => {
  const { title, totalDividend } = req.body;

  if (!title || !totalDividend || totalDividend <= 0) {
    res.status(400).json({ message: 'Invalid input' });
    return;
  }

  const property = await prisma.propertySubmission.findFirst({
    where: {
      title: {
        equals: title,
        mode: 'insensitive',
      },
      status: 'APPROVED',
      tokenized: true,
    },
    select: {
      id: true,
      title: true,
      totalTokens: true,
    },
  });

  if (!property) {
    res.status(404).json({ message: 'Property not found or not tokenized' });
    return;
  }

  const perToken = totalDividend / property.totalTokens;

  const holdings = await prisma.propertyHolding.findMany({
    where: { propertyId: property.id },
    include: { user: true },
  });

  const payouts = holdings.map((h) => ({
    userId: h.userId,
    userEmail: h.user.email,
    tokens: h.tokens,
    payout: h.tokens * perToken,
  }));

  res.json({
    propertyTitle: property.title,
    totalDividend,
    perTokenDividend: perToken,
    payouts,
  });
};
