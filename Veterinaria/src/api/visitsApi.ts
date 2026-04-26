import axios from "axios";
import type { Visit } from "../types/visits";

const BASE = "http://localhost:3000";

export const getVisits = async (): Promise<Visit[]> => {
  const res = await axios.get(`${BASE}/visits`);
  return res.data;
};

export const getVisitById = async (id: number): Promise<Visit> => {
  const res = await axios.get(`${BASE}/visits/${id}`);
  return res.data;
};

export const getVisitsByPetId = async (petId: number): Promise<Visit[]> => {
  const res = await axios.get(`${BASE}/visits/pet/${petId}`);
  return res.data;
};

export const createVisit = async (data: Omit<Visit, "id_visit">): Promise<Visit> => {
  const res = await axios.post(`${BASE}/visits`, data);
  return res.data;
};

export const updateVisit = async (id: number, data: Omit<Visit, "id_visit">): Promise<Visit> => {
  const res = await axios.put(`${BASE}/visits/${id}`, data);
  return res.data;
};

export const deleteVisit = async (id: number): Promise<void> => {
  await axios.delete(`${BASE}/visits/${id}`);
};
