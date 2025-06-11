import { Request, Response } from 'express';
import prisma from '../prisma/client';
import { createAssetInCanton, getAssetFromCanton } from '../services/canton.service';


export const createAsset = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await createAssetInCanton(data);
    const asset = result.result;

    const saved = await prisma.asset.create({
      data: {
        contractId: asset.contractId,
        templateId: asset.templateId,
        name: asset.payload.name,
        instrumentId: asset.payload.instrumentId,
        totalSupply: parseInt(asset.payload.totalSupply),
        price: parseFloat(asset.payload.price),
        issuer: asset.payload.issuer,
        investor: asset.payload.investor,
      },
    });

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create asset', details: err });
  }
};

export const getAsset = async (req: Request, res: Response) => {
  try {
    const { templateId, contractId } = req.body;
    const data = await getAssetFromCanton(templateId as string, contractId as string);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch asset', details: err });
  }
};
