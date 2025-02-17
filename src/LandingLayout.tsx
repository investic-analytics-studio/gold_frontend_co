import LoginModal from "@/components/auth/LoginModal";
import { Button } from "@/components/ui/button";
import { Outlet } from "@tanstack/react-router";
import { useAuthContext } from "./context/authContext";
import { removeAccessToken } from "@/utils/localStorage";
import { signOut } from "@/hooks/useAuth";
import { useRouter } from "@tanstack/react-router";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LandingLayout = () => {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    authUserData,
    setAuthUserData,
  } = useAuthContext();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      removeAccessToken();
      setAuthUserData({
        uid: "",
        gold_status: false,
        name: "",
        email: "",
      });
      router.navigate({ to: "/" });

      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
        variant: "default",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error logging out",
        description: "There was a problem logging out",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "#040813" }} className="min-h-screen">
        <header className="shadow-sm sticky top-0 z-50 bg-[#040813]">
          <div className="max-w-12xl mx-4 py-4 sm:px-12 md:px-0 lg:px-12 flex justify-between items-center">
            <img
              src="/assets/images/logo-investic-light.svg"
              alt="logo"
              className="w-[40px] h-auto"
            />
            {authUserData.uid ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer data-[state=open]:bg-[#209CFF]/20 hover:bg-[#209CFF]/20 p-1 rounded-full transition-all duration-300 ease-in-out">
                  <Avatar>
                    <AvatarImage
                      src="/assets/images/user.svg"
                      className="w-[40px] h-[40px] rounded-full"
                      alt="User avatar"
                    />
                    <AvatarFallback className="bg-[#209CFF] text-white">
                      {authUserData?.name[0]
                        ? authUserData?.name[0].toUpperCase()
                        : ""}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-full p-1 rounded-lg bg-[#0A1020] text-white border border-[#20293A]"
                  side="bottom"
                  align="center"
                  sideOffset={6}
                >
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer py-2 px-4 rounded-md text-[#F23645] hover:bg-[#172036] flex items-center justify-start"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => setIsLoginModalOpen(true)}
                variant="outline"
                className="bg-transparent border border-[#209CFF] rounded-[10px] w-[120px] h-[44px] text-[18px] text-[#209CFF] hover:bg-[#209CFF] hover:text-white"
              >
                Login
              </Button>
            )}
          </div>
        </header>
        <main>
          <div className="max-w-12xl mx-0 sm:px-12 lg:px-12">
            <Outlet />
          </div>
        </main>
      </div>
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </div>
  );
};

export default LandingLayout;
