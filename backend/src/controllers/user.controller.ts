import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all users with KYC status
export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  const usersWithKYC = await Promise.all(
    users.map(async (user) => {
      const kyc = await prisma.kYCSubmission.findFirst({
        where: { email: user.email },
        select: { status: true },
      });

      return {
        ...user,
        kycStatus: kyc?.status || 'NONE',
      };
    })
  );

  res.json(usersWithKYC);
};

// Change user role
export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { role },
  });

  res.json({ message: 'Role updated', user });
};

// Activate/Deactivate user
export const updateUserStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isActive } = req.body;

  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { isActive },
  });

  res.json({ message: 'User status updated', user });
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.user.delete({
    where: { id: parseInt(id) },
  });

  res.json({ message: 'User deleted' });
};
