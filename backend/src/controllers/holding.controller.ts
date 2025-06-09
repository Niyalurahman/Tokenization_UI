import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const buyTokens = async (req: Request, res: Response) => {
  try {
    const { userId, propertyId, tokens } = req.body;

    if (!userId || !propertyId || !tokens || tokens <= 0) {
      res.status(400).json({ message: 'Invalid input' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const kyc = await prisma.kYCSubmission.findFirst({
      where: { email: user?.email, status: 'APPROVED' }
    });

    if (!user || !kyc) {
      res.status(403).json({ message: 'User not found or KYC not approved' });
      return;
    }

    const property = await prisma.propertySubmission.findUnique({ where: { id: propertyId } });

    if (!property || property.status !== 'APPROVED' || !property.tokenized) {
      res.status(403).json({ message: 'Property not available for investment' });
      return;
    }

    const existing = await prisma.propertyHolding.findFirst({
      where: { userId, propertyId }
    });

    let holding;

    if (existing) {
      holding = await prisma.propertyHolding.update({
        where: { id: existing.id },
        data: { tokens: existing.tokens + tokens }
      });
    } else {
      holding = await prisma.propertyHolding.create({
        data: { userId, propertyId, tokens }
      });
    }

    res.status(200).json({ message: 'Tokens purchased successfully', holding });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getHoldersByProperty = async (req: Request, res: Response) => {
  const { title } = req.params;

  if (!title) {
    res.status(400).json({ message: 'Property title is required' });
    return;
  }

  const property = await prisma.propertySubmission.findFirst({
    where: {
      title: {
        equals: title,
        mode: 'insensitive',
      },
    },
  });

  if (!property) {
    res.status(404).json({ message: 'Property not found' });
    return;
  }

  const holdings = await prisma.propertyHolding.findMany({
    where: { propertyId: property.id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  const result = holdings.map((h) => ({
    userId: h.user.id,
    name: h.user.name,
    email: h.user.email,
    tokensHeld: h.tokens,
  }));

  res.json({
    propertyId: property.id,
    propertyTitle: property.title,
    totalHolders: result.length,
    holders: result,
  });
};