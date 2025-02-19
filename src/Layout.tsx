import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Link, Outlet, useRouter } from "@tanstack/react-router";
import {
  ChartBarIncreasing,
  ChartCandlestick,
  ChartLine,
  ChevronRight,
  ChevronsUpDown,
  LogOut,
} from "lucide-react";
import React, { useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { useAuthContext } from "./context/authContext";
import { removeAccessToken } from "@/utils/localStorage";
import { signOut } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useInitialPageContext } from "./context/initialPageContext";
import { MESSENGER_URL } from "./lib/constants";
// import LockModal from "./components/LockModal";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

const sidebarItems = [
  {
    icon: ChartLine,
    label: "Net Sentiment",
    href: "/gold",
    needSubscribe: false,
    initialPageShowName: "net_sentiment_page",
    lockPage: import.meta.env.VITE_IS_LOCK_NET_SENTIMENT === "true",
  },
  // { icon: ChartNoAxesColumnIncreasing, label: "Gamma OI", href: "/gold/gamma-oi" },
  {
    icon: ChartBarIncreasing,
    label: "Retail Sentiment",
    href: "/gold/retail-sentiment",
    needSubscribe: true,
    initialPageShowName: "retail_sentiment_page",
    lockPage: import.meta.env.VITE_IS_LOCK_RETAIL_SENTIMENT === "true",
  },
  {
    icon: ChartCandlestick,
    label: "Investic Weight OI",
    href: "/gold/investic-weight-oi",
    needSubscribe: true,
    initialPageShowName: "weight_oi_page",
    lockPage: import.meta.env.VITE_IS_LOCK_WEIGHTED_OI === "true",
  },
  // { icon: ChartNoAxesCombined, label: "Trend and Momentum", href: "/gold/trend-and-momentum" },
];

// const userData = {
//   name: "Name",
//   email: "Email",
//   avatar: "/placeholder.svg?height=32&width=32",
// };

const themeStyle = `
  :root {
    --background: #030816;
    --foreground: #ffffff;
    --primary: #3a86ff;
    --secondary: #8338ec;
    --accent: #ff006e;
    --muted: #374151;
    --muted-foreground: #9ca3af;
    --card: #111827;
    --card-foreground: #ffffff;
    --border: #20293A;
    --input: #1f2937;
    --hover: #d0d5dd;
    --sidebar-bg: #040B1C;
    --sidebar-hover: #172036;
  }
`;

const SidebarHeaderComponent = () => (
  <SidebarHeader>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link to="/" className="w-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenu className="rounded-md hover:bg-primary/10 cursor-pointer">
                  <SidebarMenuItem>
                    <div className="flex items-center justify-between w-full px-2 py-2">
                      <div className="flex items-center gap-2">
                        <img
                          src="/logo-investic-light.svg"
                          alt="Logo"
                          className="h-6 w-6 flex-shrink-0"
                        />
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold text-white">
                            Gold Studio
                          </span>
                          <span className="truncate text-xs text-gray-400">
                            Investic Analytics Studio
                          </span>
                        </div>
                      </div>
                    </div>
                  </SidebarMenuItem>
                </SidebarMenu>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                align="end"
                sideOffset={4}
                className="bg-[#172036] text-white text-xs border-none"
              >
                <p>Go to home page</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      </DropdownMenuTrigger>
    </DropdownMenu>
  </SidebarHeader>
);

const SidebarFooterComponent = () => {
  const { authUserData, setAuthUserData } = useAuthContext();
  const router = useRouter();
  const { toast } = useToast();
  const defaultAvatar = "/placeholder.svg?height=32&width=32";
  const handleLogout = async () => {
    try {
      await signOut();
      removeAccessToken();
      setAuthUserData({
        uid: "",
        gold_status: false,
        name: "",
        email: "",
        is_corporate: false,
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
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-[var(--sidebar-hover)] data-[state=open]:text-white"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={defaultAvatar} alt={authUserData?.name} />
                  <AvatarFallback className="rounded-lg bg-primary text-white">
                    {authUserData?.name[0]
                      ? authUserData?.name[0].toUpperCase()
                      : ""}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-white">
                    {authUserData?.name}
                  </span>
                  <span className="truncate text-xs text-gray-400">
                    {authUserData?.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 text-gray-400" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-[#030816] text-white border border-[#20293A]"
              side="top"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-[#F23645]"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

const Breadcrumb = () => {
  const router = useRouter();
  const currentPath = router.state.location.pathname;
  const [currentItem, setCurrentItem] = React.useState<
    (typeof sidebarItems)[0] | undefined
  >();

  // Update currentItem whenever the path changes
  React.useEffect(() => {
    const matchingItem = sidebarItems.find(
      (item) =>
        item.href === currentPath ||
        (currentPath.startsWith(item.href) && item.href !== "/gold")
    );
    setCurrentItem(matchingItem);
  }, [currentPath]);

  // Subscribe to router state changes
  React.useEffect(() => {
    // Subscribe to router changes using the correct event type
    const unsubscribe = router.subscribe("onBeforeLoad", () => {
      const matchingItem = sidebarItems.find(
        (item) =>
          item.href === router.state.location.pathname ||
          (router.state.location.pathname.startsWith(item.href) &&
            item.href !== "/gold")
      );
      setCurrentItem(matchingItem);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, [router]);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1">
        <li className="flex items-center">
          <span className="text-[12px] font-normal text-[#A1A1AA]/70 pointer-events-none cursor-default">
            Gold
          </span>
        </li>

        {currentItem && (
          <li className="flex items-center">
            <ChevronRight className="w-4 h-4 text-[#A1A1AA]" />
            <span className="ml-1 text-[12px] font-normal text-white text-center">
              {currentItem.label}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default function Layout() {
  const router = useRouter();
  const [activePath, setActivePath] = React.useState(
    router.state.location.pathname
  );
  const { authUserData } = useAuthContext();
  const isGoldSubscribed = authUserData.gold_status;
  // const [showLockModal, setShowLockModal] = React.useState(false);

  // useEffect(() => {
  //   if (!isGoldSubscribed) {
  //     setShowLockModal(true);
  //   } else {
  //     setShowLockModal(false);
  //   }
  // }, [isGoldSubscribed]);

  const isMobile = useIsMobile();
  const isSmallScreen = isMobile;

  // Update active menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setActivePath(router.state.location.pathname);
    };

    // Subscribe to router changes
    const unsubscribe = router.subscribe("onBeforeLoad", handleRouteChange);
    return unsubscribe;
  }, [router]);

  const { initialShowPageStatus } = useInitialPageContext();

  return (
    <>
      <style>{themeStyle}</style>
      <SidebarProvider>
        <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)]">
          <Sidebar
            collapsible="icon"
            className="bg-[var(--sidebar-bg)] border-r border-[var(--border)]"
          >
            <SidebarHeaderComponent />
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="text-[#FAFAFA] mb-2 ml-1">
                  Gold
                </SidebarGroupLabel>
                <SidebarMenu>
                  {sidebarItems.map((item) => {
                    const isActive = activePath === item.href;
                    const isDisabled = item.needSubscribe && !isGoldSubscribed;
                    const isSoon = item.href === "/gold/test";
                    const isInitialPageShow =
                      initialShowPageStatus[item.initialPageShowName];
                    const isLockPage = item.lockPage;
                    return (
                      <Collapsible key={item.href}>
                        <CollapsibleTrigger className="w-full">
                          {isDisabled && !isSoon && isInitialPageShow ? (
                            <>
                              {isSmallScreen ? (
                                <Drawer>
                                  <DrawerTrigger asChild>
                                    <div className="z-10 flex items-center justify-between w-full p-2 py-3 hover:bg-[#172036]/70 rounded-lg">
                                      <div className="flex items-center gap-2 min-w-fit ml-2">
                                        <item.icon
                                          className={cn(
                                            "opacity-100 group-hover/collapsible:opacity-100 h-4 w-4 flex-shrink-0",
                                            isActive
                                              ? "text-primary opacity-100"
                                              : "text-[#A1A1AA]"
                                          )}
                                        />
                                        <span
                                          className={cn(
                                            "text-[#A1A1AA] text-[14px] hover:text-none",
                                            isActive ? "text-primary" : ""
                                          )}
                                        >
                                          {item.label}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-[#FFC31F] text-[12px] font-medium bg-[#FFC31F]/20 px-2 py-1 rounded-md">
                                          Pro
                                        </span>
                                      </div>
                                    </div>
                                  </DrawerTrigger>
                                  <DrawerContent className="h-[35%] bg-[#030816] border-t border-[#20293A] p-4">
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-4">
                                        <div>
                                          <h4 className="font-medium text-[16px] text-white">
                                            {item.label}
                                          </h4>
                                        </div>
                                        <div>
                                          <span className="text-[#FFC31F] text-[12px] font-medium bg-[#FFC31F]/20 px-2 py-1 rounded-md">
                                            Pro
                                          </span>
                                        </div>
                                      </div>
                                      <p className="text-[14px] text-[#A1A1AA]">
                                        Get access to premium features
                                        including:
                                      </p>
                                      <ul className="space-y-2 text-[14px] text-[#A1A1AA] pb-2">
                                        <li className="flex items-center gap-2">
                                          • {item.label}
                                        </li>
                                        <li className="flex items-center gap-2">
                                          • Advanced analytics
                                        </li>
                                        <li className="flex items-center gap-2">
                                          • Real-time market data
                                        </li>
                                      </ul>
                                      <button
                                        className="w-full h-[50px] bg-[#FFC31F] hover:bg-[#FFC31F]/90 text-[#0A1020] rounded-lg py-2 text-[14px] font-medium"
                                        onClick={() =>
                                          window.open(MESSENGER_URL, "_blank")
                                        }
                                      >
                                        Upgrade Now
                                      </button>
                                    </div>
                                  </DrawerContent>
                                </Drawer>
                              ) : (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <div
                                      className={cn("w-full", "cursor-pointer")}
                                    >
                                      <SidebarMenuButton
                                        size="lg"
                                        className={cn(
                                          "w-full justify-between",
                                          isActive &&
                                            "bg-[var(--sidebar-hover)] text-white"
                                        )}
                                      >
                                        <div className="flex items-center gap-2 min-w-fit ml-2">
                                          <item.icon
                                            className={cn(
                                              "opacity-100 group-hover/collapsible:opacity-100 h-4 w-4 flex-shrink-0",
                                              isActive
                                                ? "text-primary opacity-100"
                                                : "text-[#A1A1AA]"
                                            )}
                                          />
                                          <span
                                            className={cn(
                                              "text-[#A1A1AA] hover:text-none",
                                              isActive ? "text-primary" : ""
                                            )}
                                          >
                                            {item.label}
                                          </span>
                                        </div>
                                        <div>
                                          <span className="text-[#FFC31F] text-[12px] font-medium bg-[#FFC31F]/20 px-2 py-1 rounded-md">
                                            Pro
                                          </span>
                                        </div>
                                      </SidebarMenuButton>
                                    </div>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-80 bg-[#0A1020] border border-[#20293A] p-4 rounded-lg"
                                    side="right"
                                    align="start"
                                    sideOffset={20}
                                  >
                                    <div className="space-y-4">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <h4 className="font-medium text-[16px] text-white">
                                            {item.label}
                                          </h4>
                                        </div>
                                        <div>
                                          <span className="text-[#FFC31F] text-[12px] font-medium bg-[#FFC31F]/20 px-2 py-1 rounded-md">
                                            Pro
                                          </span>
                                        </div>
                                      </div>
                                      <p className="text-[14px] text-[#A1A1AA]">
                                        Get access to premium features
                                        including:
                                      </p>
                                      <ul className="space-y-2 text-[14px] text-[#A1A1AA]">
                                        <li className="flex items-center gap-2">
                                          • {item.label}
                                        </li>
                                        <li className="flex items-center gap-2">
                                          • Advanced analytics
                                        </li>
                                        <li className="flex items-center gap-2">
                                          • Real-time market data
                                        </li>
                                      </ul>
                                      <button
                                        className="w-full bg-[#FFC31F] hover:bg-[#FFC31F]/90 text-[#0A1020] rounded-lg py-2 text-[14px] font-medium"
                                        onClick={() =>
                                          window.open(MESSENGER_URL, "_blank")
                                        }
                                      >
                                        Upgrade Now
                                      </button>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              )}
                            </>
                          ) : isSoon || !isInitialPageShow || isLockPage ? (
                            <>
                              {isSmallScreen ? (
                                <Drawer>
                                  <DrawerTrigger asChild>
                                    <div className="z-10 flex items-center justify-between w-full p-2 py-3 hover:bg-[#172036]/70 rounded-lg">
                                      <div className="flex items-center gap-2 min-w-fit ml-2">
                                        <item.icon
                                          className={cn(
                                            "opacity-100 group-hover/collapsible:opacity-100 h-4 w-4 flex-shrink-0",
                                            isActive
                                              ? "text-primary opacity-100"
                                              : "text-[#A1A1AA]"
                                          )}
                                        />
                                        <span
                                          className={cn(
                                            "text-[#A1A1AA] text-[14px] hover:text-none",
                                            isActive ? "text-primary" : ""
                                          )}
                                        >
                                          {item.label}
                                        </span>
                                      </div>
                                      <div>
                                        <span className="text-primary text-[12px] font-medium bg-primary/20 px-2 py-1 rounded-md">
                                          Soon
                                        </span>
                                      </div>
                                    </div>
                                  </DrawerTrigger>
                                  <DrawerContent className="h-[35%] bg-[#030816] border-t border-[#20293A] p-4">
                                    <div className="space-y-4">
                                      <div className="flex items-center gap-4">
                                        <div>
                                          <h4 className="font-medium text-[16px] text-white">
                                            {item.label}
                                          </h4>
                                        </div>
                                        <div>
                                          <span className="text-primary text-[12px] font-medium bg-primary/20 px-2 py-1 rounded-md">
                                            Soon
                                          </span>
                                        </div>
                                      </div>
                                      <p className="text-[14px] text-[#A1A1AA]">
                                        Get access to premium features
                                        including:
                                      </p>
                                      <ul className="space-y-2 text-[14px] text-[#A1A1AA] pb-2">
                                        <li className="flex items-center gap-2">
                                          • {item.label}
                                        </li>
                                        <li className="flex items-center gap-2">
                                          • Advanced analytics
                                        </li>
                                        <li className="flex items-center gap-2">
                                          • Real-time market data
                                        </li>
                                      </ul>
                                      <div className="text-[12px] text-primary pt-2">
                                        We're working hard to bring you these
                                        features soon!
                                      </div>
                                    </div>
                                  </DrawerContent>
                                </Drawer>
                              ) : (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <div
                                      className={cn("w-full", "cursor-pointer")}
                                    >
                                      <SidebarMenuButton
                                        size="lg"
                                        className={cn(
                                          "w-full justify-between",
                                          isActive &&
                                            "bg-[var(--sidebar-hover)] text-white"
                                        )}
                                      >
                                        <div className="flex items-center gap-2 min-w-fit ml-2">
                                          <item.icon
                                            className={cn(
                                              "opacity-100 group-hover/collapsible:opacity-100 h-4 w-4 flex-shrink-0",
                                              isActive
                                                ? "text-primary opacity-100"
                                                : "text-[#A1A1AA]"
                                            )}
                                          />
                                          <span
                                            className={cn(
                                              "text-[#A1A1AA] hover:text-none",
                                              isActive ? "text-primary" : ""
                                            )}
                                          >
                                            {item.label}
                                          </span>
                                        </div>
                                        <div>
                                          <span className="text-primary text-[12px] font-medium bg-primary/20 px-2 py-1 rounded-md">
                                            Soon
                                          </span>
                                        </div>
                                      </SidebarMenuButton>
                                    </div>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="w-80 bg-[#0A1020] border border-[#20293A] p-4 rounded-lg"
                                    side="right"
                                    align="start"
                                    sideOffset={20}
                                  >
                                    <div className="space-y-4">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <h4 className="font-medium text-[16px] text-white">
                                            {item.label}
                                          </h4>
                                        </div>
                                        <div>
                                          <span className="text-primary text-[12px] font-medium bg-primary/20 px-2 py-1 rounded-md">
                                            Soon
                                          </span>
                                        </div>
                                      </div>
                                      <p className="text-[14px] text-[#A1A1AA]">
                                        This feature is currently under
                                        development. Stay tuned for:
                                      </p>
                                      <ul className="space-y-2 text-[14px] text-[#A1A1AA]">
                                        <li className="flex items-center gap-2">
                                          • Advanced {item.label} analytics
                                        </li>
                                        <li className="flex items-center gap-2">
                                          • Real-time market insights
                                        </li>
                                        <li className="flex items-center gap-2">
                                          • Customizable dashboards
                                        </li>
                                      </ul>
                                      <div className="text-[12px] text-primary pt-2">
                                        We're working hard to bring you these
                                        features soon!
                                      </div>
                                    </div>
                                  </PopoverContent>
                                </Popover>
                              )}
                            </>
                          ) : (
                            <Link to={item.href} className="w-full">
                              <SidebarMenuButton
                                size="lg"
                                className={cn(
                                  "w-full justify-between",
                                  isActive &&
                                    "bg-[var(--sidebar-hover)] text-white"
                                )}
                              >
                                <div className="flex items-center gap-2 min-w-fit ml-2">
                                  <item.icon
                                    className={cn(
                                      "opacity-100 group-hover/collapsible:opacity-100 h-4 w-4 flex-shrink-0",
                                      isActive
                                        ? "text-primary opacity-100"
                                        : "text-[#A1A1AA]"
                                    )}
                                  />
                                  <span
                                    className={cn(
                                      "text-[#A1A1AA] hover:text-none",
                                      isActive ? "text-primary" : ""
                                    )}
                                  >
                                    {item.label}
                                  </span>
                                </div>
                                {(isSoon || isLockPage) && (
                                  <span className="text-primary text-[12px] font-medium bg-primary/20 px-2 py-1 rounded-md">
                                    Soon
                                  </span>
                                )}
                                {item.needSubscribe && (
                                  <span className="text-[#FFC31F] text-[12px] font-medium bg-[#FFC31F]/20 px-2 py-1 rounded-md">
                                    Pro
                                  </span>
                                )}
                              </SidebarMenuButton>
                            </Link>
                          )}
                        </CollapsibleTrigger>
                      </Collapsible>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooterComponent />
            <SidebarRail />
          </Sidebar>
          <SidebarInset>
            <div className="sticky top-0 z-50 w-full border-b border-[#20293A] bg-[#030816]">
              <div className="flex h-14 items-center justify-between px-4">
                <div className="flex-1 flex justify-start lg:hidden">
                  <img
                    src="/logo-investic-light.svg"
                    alt="Logo"
                    className="h-6 w-6"
                  />
                </div>

                <div className="flex-1 flex justify-end lg:justify-start items-center">
                  <div className="hidden lg:block">
                    <TooltipProvider delayDuration={0}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarTrigger className="inline-flex items-center justify-center w-9 h-9 text-[#A1A1AA] hover:bg-[#172036] hover:text-[#FFFFFF] transition-colors duration-200" />
                        </TooltipTrigger>
                        <TooltipContent
                          side="right"
                          align="center"
                          sideOffset={4}
                          className="bg-[#172036] text-white text-xs border-none"
                        >
                          <p>Collapse menu</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  {/* Mobile trigger without tooltip */}
                  <div className="lg:hidden">
                    <SidebarTrigger className="inline-flex items-center justify-center w-9 h-9 text-[#A1A1AA] hover:bg-[#172036] hover:text-[#FFFFFF] transition-colors duration-200" />
                  </div>

                  <div className="hidden lg:flex items-center">
                    <div className="w-[1px] h-4 bg-[#20293A] ml-1 mr-4" />
                    <Breadcrumb />
                  </div>
                </div>
              </div>
            </div>
            <main className="flex-1 px-4 pt-6 pb-8 overflow-auto scrollbar-track-transparent custom-scrollbar bg-[var(--background)]">
              <Outlet />
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
      {/* {showLockModal && <LockModal isOpen={showLockModal} />} */}
    </>
  );
}
