import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SegmentedControl } from "@/components/ui/segmented-control";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthContext } from "@/context/authContext";
import { DialogTitle } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INVESTMENT_STYLE = {
  UNKNOWN: "unknown",
  HYBRID: "hybrid",
  TECHNICAL: "technical",
  FUNDAMENTAL: "fundamental",
};

const INVESTMENT_EXPERIENCE = {
  NOEXPERIENCE: "noExperience",
  LESSTHANTWOYEAR: "lessthan2year",
  TWOTOFIVEYEAR: "2-5year",
  MORETHANFIVEYEAR: "morethan5year",
};

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const {
    input,
    authMode,
    setAuthMode,
    handleChangeInput,
    handleChangeInvestmentStyle,
    handleChangeInvestmentExperience,
    handleSubmit,
    handleGoogleLogin,
    isGoogleLogin,
    setIsGoogleLogin,
  } = useAuthContext();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-describedby={undefined}
        className="w-screen h-screen max-w-full max-h-full m-0 p-0 bg-[#FFFFFF] border-none rounded-none overflow-y-auto"
      >
        <DialogTitle className="hidden">Login</DialogTitle>
        <div className="h-full grid grid-cols-1 lg:grid-cols-1">
          {/* Left Side - Image/Content */}
          {/* <div className="hidden lg:flex flex-col bg-transparent p-0 p-2">
            <div className="flex-1 flex flex-col justify-center items-center text-center rounded-[30px] bg-[#040B1C] overflow-hidden border border-[#20293A]/30">
              <img
                src="/assets/images/login-image.png"
                alt="login background"
                className="w-full h-full object-cover"
              />
            </div>
          </div> */}

          {/* Right Side - Login Form */}
          <div className="relative flex flex-col h-full bg-[url('./assets/images/bg-login.png')] pt-10 md:pt-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-4 top-4 h-8 w-8 rounded-md border border-[#FFFFFF]/40 hover:bg-[#FFFFFF] text-[#FFFFFF] hover:text-primary"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="flex-1 flex flex-col justify-center items-center px-6 py-8">
              <div className="w-full max-w-md border border-[#E0E3EB] bg-[#F4F5F7] rounded-[20px] p-[40px] xl:p-[60px]">
                  <div className="flex justify-center mb-8">
                    <img
                      src="./assets/images/new-gold-logo.png"
                      alt="logo"
                      className="w-[40px] h-auto"
                    />
                  </div>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-normal text-secondary/80"
                        >
                          Username
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your username"
                          name="email"
                          value={input["email"]}
                          onChange={handleChangeInput}
                          className="bg-transparent border-[#A1A1AA]/30 text-secondary placeholder:text-[#A1A1AA]"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="password"
                          className="text-sm font-normal text-secondary/80"
                        >
                          Password
                        </label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          name="password"
                          value={input["password"]}
                          onChange={handleChangeInput}
                          className="bg-transparent border-[#A1A1AA]/30 text-secondary placeholder:text-[#A1A1AA]"
                          required
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-primary border-[#20293A]/20 rounded"
                          />
                          <span className="text-[14px] font-light text-secondary/60">
                            Remember me
                          </span>
                        </label>
                        {/* <button
                          type="button"
                          className="text-[14px] font-light text-[#7D879F] hover:text-primary"
                        >
                          Forgot password?
                        </button> */}
                      </div>

                  <div className="pt-4 w-full">
                    <Button
                      type="submit"
                      className="w-full h-[50px] bg-primary hover:bg-primary/80 text-[#FFFFFF]"
                    >
                      Login
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
