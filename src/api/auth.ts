import {
  AutoValidateReq,
  CheckEmailReq,
  LoginReq,
  RegisterReq,
} from "@/types/auth";
import axios from "../config/axios";

const baseUrl = import.meta.env.VITE_BACKEND_API;

export function checkExistEmailApi(body: CheckEmailReq) {
  return axios.post(baseUrl + "/auth/exist-email", body);
}

export function registerApi(body: RegisterReq) {
  return axios.post(baseUrl + "/auth/signup", body);
}

export function validateEmailApi(email: string) {
  return axios.post(baseUrl + "/auth/validate-email", { email });
}

export function getUserUid() {
  return axios.get(baseUrl + "/auth/get-me");
}

export function autoValidate(body: AutoValidateReq) {
  return axios.post(baseUrl + "/auth/auto-validate-email-in-firebase", body);
}

export function allUserAutoValidate() {
  return axios.patch(
    baseUrl + "/auth/all-user-auto-validate-email-in-firebase"
  );
}

export function loginBackend(body: LoginReq) {
  return axios.post(baseUrl + "/auth/login", body);
}
