"use server";

import { handleResponse, fetchExams, fetchOlympiads } from "@/requests";

export async function getExams() {
  return handleResponse(fetchExams());
}

export async function getOlympiads() {
  return handleResponse(fetchOlympiads());
}
