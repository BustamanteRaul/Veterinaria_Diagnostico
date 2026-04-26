import axios from "axios";
import type { Pet } from "../types/pets";

const BASE = "http://localhost:3000";

export const getPets = async (): Promise<Pet[]> => {
  const res = await axios.get(`${BASE}/pets`);
  return res.data;
};

export const getPetById = async (id: number): Promise<Pet> => {
  const res = await axios.get(`${BASE}/pets/${id}`);
  return res.data;
};

export const getPetsByOwnerId = async (ownerId: number): Promise<Pet[]> => {
  const res = await axios.get(`${BASE}/pets/owner/${ownerId}`);
  return res.data;
};

export const createPet = async (data: Omit<Pet, "id_pet">): Promise<Pet> => {
  const res = await axios.post(`${BASE}/pets`, data);
  return res.data;
};

export const updatePet = async (id: number, data: Omit<Pet, "id_pet">): Promise<Pet> => {
  const res = await axios.put(`${BASE}/pets/${id}`, data);
  return res.data;
};

export const deletePet = async (id: number): Promise<void> => {
  await axios.delete(`${BASE}/pets/${id}`);
};
