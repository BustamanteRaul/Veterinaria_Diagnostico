import axios from "axios";
import type { Owner } from "../types/owners";

const BASE = "http://localhost:3000";

export const getOwners = async (): Promise<Owner[]> => {
  const res = await axios.get(`${BASE}/owners`);
  return res.data;
};

export const getOwnerById = async (id: number): Promise<Owner> => {
  const res = await axios.get(`${BASE}/owners/${id}`);
  return res.data;
};

export const createOwner = async (data: Omit<Owner, "id_owner">): Promise<Owner> => {
  const res = await axios.post(`${BASE}/owners`, data);
  return res.data;
};

export const updateOwner = async (id: number, data: Omit<Owner, "id_owner">): Promise<Owner> => {
  const res = await axios.put(`${BASE}/owners/${id}`, data);
  return res.data;
};

export const deleteOwner = async (id: number): Promise<void> => {
  await axios.delete(`${BASE}/owners/${id}`);
};
