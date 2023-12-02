import { axiosClient } from "@/lib/axios-client";
import { saveStorage } from "@/utils/storage";
interface SigninPayload {
  [x: string]: any;
}
interface SignupPayload {
  [x: string]: any;
}
export const signIn = async (loginDetail: SigninPayload) => {
  const response = await axiosClient.post(
    "http://localhost:8080/api/auth/signin",
    JSON.stringify(loginDetail)
  );
  // @ts-ignore
  if (response.status === true) {
    // @ts-ignore
    saveStorage("access_token", response.token);
  } else {
    console.log(response);
  }
  return response;
};
export const signUp = async (signupDetail: SignupPayload) => {
  const response = await axiosClient.post(
    "http://localhost:8080/api/auth/signup",
    JSON.stringify(signupDetail)
  );
  return response;
};
