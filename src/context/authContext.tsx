/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/utils/localStorage";
import {
  // allUserAutoValidate,
  checkExistEmailApi,
  getUserUid,
  registerApi,
} from "@/api/auth";
import { RegisterInput, RegisterReq } from "@/types/auth";
import { toast } from "@/hooks/use-toast";
import { signIn, signInWithGoogle, useTokenRefresh } from "@/hooks/useAuth";

interface AuthData {
  uid: string;
  gold_status: boolean;
  name: string;
  email: string;
  is_corporate: boolean;
}

type AuthContextType = {
  input: RegisterInput;
  authMode: "login" | "register";
  setAuthMode: React.Dispatch<React.SetStateAction<"login" | "register">>;
  authLoading: boolean;
  authUserData: AuthData;
  setAuthUserData: React.Dispatch<React.SetStateAction<AuthData>>;
  isGoogleLogin: boolean;
  setIsGoogleLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeInvestmentStyle: (value: string) => void;
  handleChangeInvestmentExperience: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleGoogleLogin: () => Promise<void>;
};

const initialUserRegisterInfo: RegisterInput = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phone: "",
  investmentStyle: "",
  investmentExperience: "",
};

export const AuthContext = createContext<AuthContextType>({
  input: initialUserRegisterInfo,
  authMode: "login",
  setAuthMode: () => {},
  authLoading: true,
  authUserData: {
    uid: "",
    gold_status: false,
    name: "",
    email: "",
    is_corporate: false,
  },
  setAuthUserData: () => {},
  handleSubmit: () => {},
  handleGoogleLogin: async () => {},
  handleChangeInput: () => {},
  handleChangeInvestmentStyle: () => {},
  handleChangeInvestmentExperience: () => {},
  isGoogleLogin: false,
  setIsGoogleLogin: () => {},
  isLoginModalOpen: false,
  setIsLoginModalOpen: () => {},
});

export const useAuthContext = () => useContext<AuthContextType>(AuthContext);

export const AuthContextProvider = ({ children }: any) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [authUserData, setAuthUserData] = useState<AuthData>({
    uid: "",
    gold_status: false,
    name: "",
    email: "",
    is_corporate: false,
  });
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [input, setInput] = useState<RegisterInput>(initialUserRegisterInfo);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [googleUid, setGoogleUid] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (getAccessToken()) {
          const res = await getUserUid();
          setAuthUserData(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setAuthLoading(false);
      }
    };
    fetchUser();
  }, []);

  useTokenRefresh();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeInvestmentStyle = (value: string) => {
    setInput((prev) => ({ ...prev, investmentStyle: value }));
  };

  const handleChangeInvestmentExperience = (value: string) => {
    setInput((prev) => ({ ...prev, investmentExperience: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData: RegisterReq = {
      method_sign_up: "",
      uid: "",
      email: input.email,
      password: input.password,
      name: input.firstName + " " + input.lastName,
      phone: input.phone,
      investment_style: input.investmentStyle,
      investment_experience: input.investmentExperience,
      img_url: null,
      ref_no: null,
      otp: null,
      date_of_birth: null,
    };

    if (authMode === "login") {
      await handleLogin(userData);
    } else {
      await handleRegister(userData);
    }
  };

  const handleLogin = async (userData: RegisterReq) => {
    try {
      const res = await signIn(userData.email, userData.password);

      let isExistEmail = false;
      const checkExistEmailRes = await checkExistEmailApi({
        email: res.userCredential?.user?.email ?? "",
      });

      isExistEmail = checkExistEmailRes.data;

      if (res.error === "credential invalid") {
        showToast("Error", "Credential invalid.", "destructive");
      } else if (res.userCredential?.user) {
        if (isExistEmail) {
          // TODO: comment becuase old email some email not verified
          // if (res.userCredential.user.emailVerified) {
          setAccessToken(res?.accessToken ?? "");

          const userUidRes = await getUserUid();
          setAuthUserData(userUidRes.data);

          if (!userUidRes.data.is_corporate) {
            showToast("Error", "Credential invalid.", "destructive");
            removeAccessToken();
            return;
          }

          // await validateEmailApi(userData.email);
          setIsLoginModalOpen(false);
          setInput((prev) => ({ ...prev, ...initialUserRegisterInfo }));
          showToast("Logged in successfully.", "You have been logged in.");
          // } else {
          //   showToast("Error", "Please verify your email.", "destructive");
          // }
        } else {
          setAuthMode("register");
          setInput((prev) => ({
            ...prev,
            email: res?.userCredential?.user?.email ?? "",
          }));
          setIsGoogleLogin(false);
        }
      } else {
        setAuthMode("register");
        setInput((prev) => ({ ...prev, email: userData.email }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (userData: RegisterReq) => {
    try {
      if (isGoogleLogin) {
        await handleGoogleRegister(userData);
      } else {
        await handleEmailRegister(userData);
      }
    } catch (error: any) {
      console.error("Error signing up", error);

      // Extract error message from the response
      const errorData = error?.response?.data?.error;
      console.error("Error data:", errorData);

      // Check if the error contains the MySQL duplicate entry error
      if (errorData && errorData.includes("Error 1062")) {
        // Extract the value between single quotes
        const matches = errorData.match(/'([^']*)'/);
        const duplicateValue = matches?.[1] || "";

        // Check which field is duplicate based on the error message
        if (errorData.includes("tbl_users.name")) {
          showToast(
            "Error",
            `The name "${duplicateValue}" is already registered. Please use a different name.`,
            "destructive"
          );
        } else if (errorData.includes("tbl_users.phone")) {
          showToast(
            "Error",
            `The phone number "${duplicateValue}" is already registered. Please use a different number.`,
            "destructive"
          );
        } else {
          showToast(
            "Error",
            `"${duplicateValue}" is already in use. Please try a different value.`,
            "destructive"
          );
        }
        return;
      }

      // Handle other types of errors
      const errorMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Error signing up.";

      showToast("Error", errorMessage, "destructive");
    }
  };

  const handleGoogleRegister = async (userData: RegisterReq) => {
    try {
      userData.method_sign_up = "google";
      userData.uid = googleUid;
      await registerApi(userData);

      setInput((prev) => ({ ...prev, ...initialUserRegisterInfo }));
      setAuthMode("login");

      showToast("Success", "Registered successfully");
    } catch (error) {
      console.error("Error register", error);
      throw error;
    }
  };

  const handleEmailRegister = async (userData: RegisterReq) => {
    try {
      const checkExistEmailRes = await checkExistEmailApi({
        email: userData.email ?? "",
      });
      const isExistEmail = checkExistEmailRes.data;

      if (isExistEmail) {
        showToast("Error", "Email already exists.", "destructive");
        return;
      }

      userData.method_sign_up = "email";
      await registerApi(userData);

      setInput((prev) => ({ ...prev, ...initialUserRegisterInfo }));
      setAuthMode("login");

      showToast("Success", "Registered successfully");
    } catch (error) {
      console.error("Error register", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // await allUserAutoValidate();

      const res = await signInWithGoogle();

      setGoogleUid(res?.userCredential?.user?.uid ?? "");

      let isExistEmail = false;
      const checkExistEmailRes = await checkExistEmailApi({
        email: res?.userCredential?.user?.email ?? "",
      });

      isExistEmail = checkExistEmailRes.data;

      if (res.userCredential?.user) {
        if (isExistEmail) {
          // if (res.userCredential.user.emailVerified) {
          setAccessToken(res?.accessToken ?? "");
          setIsLoginModalOpen(false);
          setInput((prev) => ({ ...prev, ...initialUserRegisterInfo }));

          const userUidRes = await getUserUid();
          setAuthUserData(userUidRes.data);

          showToast("Logged in successfully.", "You have been logged in.");
          // } else {
          //   showToast("Error", "Please verify your email.", "destructive");
          // }
        } else {
          setAuthMode("register");
          setInput((prev) => ({
            ...prev,
            email: res?.userCredential?.user?.email ?? "",
          }));
          setIsGoogleLogin(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showToast = (
    title: string,
    description: string,
    variant: "destructive" | "default" = "default"
  ) => {
    toast({ title, description, variant });
  };

  const contextValue: AuthContextType = {
    input,
    authMode,
    setAuthMode,
    authLoading,
    authUserData,
    setAuthUserData,
    handleSubmit,
    handleGoogleLogin,
    handleChangeInput,
    handleChangeInvestmentStyle,
    handleChangeInvestmentExperience,
    isGoogleLogin,
    setIsGoogleLogin,
    isLoginModalOpen,
    setIsLoginModalOpen,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {authLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
