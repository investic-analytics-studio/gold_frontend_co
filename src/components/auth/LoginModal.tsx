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
        className="w-screen h-screen max-w-full max-h-full m-0 p-0 bg-[#040813] border-none rounded-none overflow-y-auto"
      >
        <DialogTitle className="hidden">Login</DialogTitle>
        <div className="h-full grid grid-cols-1 lg:grid-cols-2">
          {/* Left Side - Image/Content */}
          <div className="hidden lg:flex flex-col bg-transparent p-0 p-2">
            <div className="flex-1 flex flex-col justify-center items-center text-center rounded-[30px] bg-[#040B1C] overflow-hidden border border-[#20293A]/30">
              <img
                src="/assets/images/login-image.png"
                alt="login background"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="relative flex flex-col h-full bg-[#040813] pt-10 md:pt-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute right-4 top-4 h-8 w-8 rounded-md hover:bg-[#172036] text-[#A1A1AA] hover:text-[#FAFAFA]"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="flex-1 flex flex-col justify-center items-center px-6 py-8">
              <div className="w-full max-w-md">
                {authMode === "login" && (
                  <div className="flex justify-center mb-8">
                    <img
                      src="./assets/images/logo-investic-light.svg"
                      alt="logo"
                      className="w-[40px] h-auto"
                    />
                  </div>
                )}

                <div className="mb-8 w-full">
                  <SegmentedControl
                    value={authMode}
                    onChange={(value) => {
                      setAuthMode(value as "login" | "register");
                      setIsGoogleLogin(false);
                    }}
                    segments={[
                      { value: "login", label: "Log In" },
                      { value: "register", label: "Register" },
                    ]}
                    className="w-full bg-transparent border-[#20293A]"
                  />
                </div>

                <div className="mb-8 w-full">
                  <Button
                    onClick={handleGoogleLogin}
                    className="w-full h-[50px] bg-[#080E1F] rounded-[10px] border border-[#20293A] hover:bg-[#172036]/70 text-white text-[14px] font-normal"
                  >
                    <img
                      src="./assets/images/icon-google.png"
                      alt="logo"
                      className="w-[20px] h-auto"
                    />
                    Continue with Google
                  </Button>
                </div>

                <div className="mb-0 w-full">
                  <div className="relative flex py-0 items-center">
                    <div className="flex-grow border-t border-[#20293A]"></div>
                    <span className="flex-shrink mx-4 text-[#7D879F] font-light text-[14px]">
                      OR
                    </span>
                    <div className="flex-grow border-t border-[#20293A]"></div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  {authMode === "login" && (
                    <>
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-normal text-[#FAFAFA]"
                        >
                          Email or Username
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email or username"
                          name="email"
                          value={input["email"]}
                          onChange={handleChangeInput}
                          className="bg-transparent border-[#20293A] text-[#FAFAFA] placeholder:text-[#353C4B]"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="password"
                          className="text-sm font-normal text-[#FAFAFA]"
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
                          className="bg-transparent border-[#20293A] text-[#FAFAFA] placeholder:text-[#353C4B]"
                          required
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-[#209CFF] bg-transparent border-[#20293A] rounded"
                          />
                          <span className="text-[14px] font-light text-[#A1A1AA]">
                            Remember me
                          </span>
                        </label>
                        {/* <button
                          type="button"
                          className="text-[14px] font-light text-[#7D879F] hover:text-[#209CFF]"
                        >
                          Forgot password?
                        </button> */}
                      </div>
                    </>
                  )}

                  {authMode === "register" && (
                    <>
                      <div
                        className={`grid gap-4 ${
                          isGoogleLogin
                            ? "grid-cols-1 md:grid-cols-1"
                            : "grid-cols-1 md:grid-cols-2"
                        }`}
                      >
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-normal text-[#FAFAFA]"
                          >
                            Email Address
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="yourname@mail.com"
                            name="email"
                            value={input["email"]}
                            onChange={handleChangeInput}
                            className="bg-transparent border-[#20293A] text-[#FAFAFA] placeholder:text-[#353C4B]"
                            required
                          />
                        </div>
                        {!isGoogleLogin && (
                          <div className="space-y-2">
                            <label
                              htmlFor="password"
                              className="text-sm font-normal text-[#FAFAFA]"
                            >
                              Password
                            </label>
                            <Input
                              id="password"
                              type="password"
                              placeholder="Password"
                              name="password"
                              value={input["password"]}
                              onChange={handleChangeInput}
                              className="bg-transparent border-[#20293A] text-[#FAFAFA] placeholder:text-[#353C4B]"
                              required
                            />
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="firstName"
                            className="text-sm font-normal text-[#FAFAFA]"
                          >
                            First Name
                          </label>
                          <Input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={input["firstName"]}
                            placeholder="First name"
                            className="bg-transparent border-[#20293A] text-[#FAFAFA] placeholder:text-[#353C4B]"
                            onChange={handleChangeInput}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="lastName"
                            className="text-sm font-normal text-[#FAFAFA]"
                          >
                            Last Name
                          </label>
                          <Input
                            id="lastName"
                            type="text"
                            name="lastName"
                            value={input["lastName"]}
                            placeholder="Last name"
                            onChange={handleChangeInput}
                            className="bg-transparent border-[#20293A] text-[#FAFAFA] placeholder:text-[#353C4B]"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="phone"
                            className="text-sm font-normal text-[#FAFAFA]"
                          >
                            Phone number
                          </label>
                          <Input
                            id="phone"
                            type="text"
                            name="phone"
                            value={input["phone"]}
                            onChange={handleChangeInput}
                            placeholder="Phone number"
                            className="bg-transparent border-[#20293A] text-[#FAFAFA] placeholder:text-[#353C4B]"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="tradingStyle"
                            className="text-sm font-normal text-[#FAFAFA]"
                          >
                            Trading Style
                          </label>
                          <Select onValueChange={handleChangeInvestmentStyle}>
                            <SelectTrigger className="w-full h-[50px] bg-transparent border-[#20293A] text-[#FAFAFA] placeholder:text-[#353C4B]">
                              <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0A1122] border-[#20293A]">
                              <SelectItem
                                value={INVESTMENT_STYLE["UNKNOWN"]}
                                className="text-[14px] text-[#FAFAFA] hover:bg-[#172036] focus:bg-[#172036] cursor-pointer"
                              >
                                Not Sure
                              </SelectItem>
                              <SelectItem
                                value={INVESTMENT_STYLE["HYBRID"]}
                                className="text-[14px] text-[#FAFAFA] hover:bg-[#172036] focus:bg-[#172036] cursor-pointer"
                              >
                                Hybrid
                              </SelectItem>
                              <SelectItem
                                value={INVESTMENT_STYLE["TECHNICAL"]}
                                className="text-[14px] text-[#FAFAFA] hover:bg-[#172036] focus:bg-[#172036] cursor-pointer"
                              >
                                Technical
                              </SelectItem>
                              <SelectItem
                                value={INVESTMENT_STYLE["FUNDAMENTAL"]}
                                className="text-[14px] text-[#FAFAFA] hover:bg-[#172036] focus:bg-[#172036] cursor-pointer"
                              >
                                Fundamental
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="investmentExperience"
                          className="text-sm font-normal text-[#FAFAFA]"
                        >
                          Investment Experience
                        </label>
                        <Select
                          onValueChange={handleChangeInvestmentExperience}
                        >
                          <SelectTrigger className="w-full h-[50px] bg-transparent border-[#20293A] text-[#FAFAFA] placeholder:text-[#353C4B]">
                            <SelectValue placeholder="Select Investment Experience" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0A1122] border-[#20293A]">
                            <SelectItem
                              value={INVESTMENT_EXPERIENCE["NOEXPERIENCE"]}
                              className="text-[14px] text-[#FAFAFA] hover:bg-[#172036] focus:bg-[#172036] cursor-pointer"
                            >
                              No Experience
                            </SelectItem>
                            <SelectItem
                              value={INVESTMENT_EXPERIENCE["LESSTHANTWOYEAR"]}
                              className="text-[14px] text-[#FAFAFA] hover:bg-[#172036] focus:bg-[#172036] cursor-pointer"
                            >
                              Less than 2 years
                            </SelectItem>
                            <SelectItem
                              value={INVESTMENT_EXPERIENCE["TWOTOFIVEYEAR"]}
                              className="text-[14px] text-[#FAFAFA] hover:bg-[#172036] focus:bg-[#172036] cursor-pointer"
                            >
                              2 - 5 years
                            </SelectItem>
                            <SelectItem
                              value={INVESTMENT_EXPERIENCE["MORETHANFIVEYEAR"]}
                              className="text-[14px] text-[#FAFAFA] hover:bg-[#172036] focus:bg-[#172036] cursor-pointer"
                            >
                              More than 5 years
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-[#209CFF] bg-[#0A1122] border-[#20293A] rounded"
                            required
                          />
                          <span className="text-sm font-normal text-[#7D879F]">
                            I agree to the Terms of Service and Privacy Policy
                          </span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-[#209CFF] bg-[#0A1122] border-[#20293A] rounded"
                            required
                          />
                          <span className="text-sm font-normal text-[#7D879F]">
                            I would like to receive emails about INVESTIC.
                          </span>
                        </label>
                      </div>
                    </>
                  )}
                  <div className="pt-4 w-full">
                    <Button
                      type="submit"
                      className="w-full h-[50px] bg-[#209CFF] hover:bg-[#209CFF]/80 text-[#040813]"
                    >
                      {authMode === "login" ? "Login" : "Create Account"}
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
