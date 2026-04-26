import axios from "axios";
import type { Bill } from "../types/bills";

const BASE = "http://localhost:3000";

export const getBills = async (): Promise<Bill[]> => {
  const res = await axios.get(`${BASE}/bills`);
  return res.data;
};

export const getBillById = async (id: number): Promise<Bill> => {
  const res = await axios.get(`${BASE}/bills/${id}`);
  return res.data;
};

export const getBillByVisitId = async (visitId: number): Promise<Bill> => {
  const res = await axios.get(`${BASE}/bills/visit/${visitId}`);
  return res.data;
};

export const createBill = async (data: Omit<Bill, "id_payment">): Promise<Bill> => {
  const res = await axios.post(`${BASE}/bills`, data);
  return res.data;
};

export const updateBill = async (id: number, data: Omit<Bill, "id_payment">): Promise<Bill> => {
  const res = await axios.put(`${BASE}/bills/${id}`, data);
  return res.data;
};

export const deleteBill = async (id: number): Promise<void> => {
  await axios.delete(`${BASE}/bills/${id}`);
};
