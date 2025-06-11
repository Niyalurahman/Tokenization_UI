import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.CANTON_BASE_URL || 'http://localhost:8080';
const token = process.env.CANTON_TOKEN;

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

export const createAssetInCanton = async (data: any) => {
  const response = await axios.post(`${baseURL}/v1/create`, data, { headers });
  return response.data;
};

export const getAssetFromCanton = async (templateId: string, contractId: string) => {
  const response = await axios.post(
    `${baseURL}/v1/fetch`,
    { templateId, contractId },
    { headers }
  );
  return response.data;
};

