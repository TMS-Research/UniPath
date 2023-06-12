import { api } from "../../../api";

export async function getCareerCluster() {
  try {
    const { data } = await api.get("/program");
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getSubjectDP(idFormStepOne) {
  try {
    const { data } = await api.get(`/form/steptwo/sb/${idFormStepOne}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getRequiredSubjectDP(idFormStepOne) {
  try {
    const { data } = await api.get(`/form/steptwo/${idFormStepOne}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTheCoosenSubject(idFormStepOne) {
  try {
    const { data } = await api.get(`/form/stepthree/${idFormStepOne}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function postClusterProgramStepOne(programs) {
  try {
    const { data } = await api.post("/form/stepone", programs);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function postSubjectDPStepTwo(subjects) {
  console.log(subjects);
  try {
    const { data } = await api.post("/form/steptwo", subjects);
    return data;
  } catch (error) {}
}
