export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  investmentStyle: string;
  investmentExperience: string;
}

export interface RegisterReq {
  method_sign_up: string;
  uid: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  img_url: string | null;
  investment_experience: string | null;
  investment_style: string | null;
  ref_no: string | null;
  otp: string | null;
  date_of_birth: Date | null;
}

export interface LoginInput {
  emailOrUsername: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  img_url: string | null;
  investment_experience: string | null;
  investment_style: string | null;
}

export interface AuthProviderValue {
  login?: (credentials: LoginInput) => Promise<void>;
  logout?: () => void;
  authUser?: User | null;
  isAuthUserLoading?: boolean;
  signInWithGoogle?: () => Promise<boolean>;
}

export interface ReactChildren {
  children: React.ReactNode;
}

export interface CheckEmailReq {
  email: string;
}

export interface AutoValidateReq {
  uid: string;
}

export interface LoginReq {
  uid: string;
  login_type: string;
}
