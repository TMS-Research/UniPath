import { api } from "../../../api";

export async function getCareerCluster() {
  try {
    const { data } = await api.get("/program");
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getSubjectDP() {
  try {
    const { data } = await api.get("/subject");
    return data;
  } catch (error) {
    throw error;
  }
}
