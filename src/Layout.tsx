import {
  Collapsible,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { IconBrandDiscordFilled, IconBrandX } from "@tabler/icons-react";
import { Link, Outlet, useRouter } from "@tanstack/react-router";
import {
  ChartCandlestick,
  ChartLine,
  ChartNoAxesColumnIncreasing,
  ChartNoAxesCombined,
  ChevronRight
} from "lucide-react";
import React from "react";
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

const sidebarItems = [
  { icon: ChartLine, label: "Net Sentiment", href: "/gold" },
  { icon: ChartNoAxesColumnIncreasing, label: "Gamma OI", href: "/gold/gamma-oi" },
  { icon: ChartCandlestick, label: "Investic Weight OI", href: "/gold/investic-weight-oi" },
  { icon: ChartNoAxesCombined, label: "Trend and Momentum", href: "/gold/trend-and-momentum" },
];

// const userData = {
//   name: "App Beta",
//   email: "New Version",
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
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-[var(--sidebar-hover)] data-[state=open]:text-white pointer-events-none"
            >
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
              {/* <ChevronsUpDown className="ml-auto text-gray-400" /> */}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
);

const SidebarFooterComponent = () => (
  <>
  {/* <SidebarFooter>
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-[var(--sidebar-hover)] data-[state=open]:text-white pointer-events-none"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback className="rounded-lg bg-[#209CFF] text-white">
                  B
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-white">
                  {userData.name}
                </span>
                <span className="truncate text-xs text-gray-400">
                  {userData.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-gray-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-[#030816] text-white border border-[#20293A]"
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem className="hover:bg-[var(--sidebar-hover)]">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarFooter> */}
  <SidebarFooter className="pb-6 lg:pb-1">
  <SidebarGroupLabel className="text-[#FAFAFA] mb-1 lg:mb-0 w-full flex items-center justify-between px-2 py-8 lg:py-6 border-t border-[#20293A] ">                    
  
    <div className="text-[#FAFAFA]/70 text-[12px] font-light">Follow us</div>
    <div className="flex gap-3 lg:gap-0">
      <a
        href="https://discord.gg/jUsBJFkmDS"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#A1A1AA]/70 hover:text-[#FFFFFF] border border-[#20293A] lg:border-none transition-colors duration-200 hover:bg-[#172036] rounded-full lg:rounded-md p-2"
      >
        <IconBrandDiscordFilled className="w-5 h-5 lg:w-4 lg:h-4" />
      </a>
      <a
        href="https://x.com/INVESTIC_Crypto"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#A1A1AA]/70 hover:text-[#FFFFFF] border border-[#20293A] lg:border-none transition-colors duration-200 hover:bg-[#172036] rounded-full lg:rounded-md p-2"
      >
        <IconBrandX className="w-5 h-5 lg:w-4 lg:h-4" />
      </a>
    </div>

  </SidebarGroupLabel>
  </SidebarFooter>
  </>
);

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
  const [activePath, setActivePath] = React.useState(router.state.location.pathname);

  // Update active menu when route changes
  React.useEffect(() => {
    const handleRouteChange = () => {
      setActivePath(router.state.location.pathname);
    };

    // Subscribe to router changes
    const unsubscribe = router.subscribe('onBeforeLoad', handleRouteChange);
    return unsubscribe;
  }, [router]);

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
                <SidebarGroupLabel className="text-[#FAFAFA] mb-2">
                  Gold
                </SidebarGroupLabel>
                <SidebarMenu>
                  {sidebarItems.map((item) => {
                    const isActive = activePath === item.href || 
                                   (activePath.startsWith(item.href) && item.href !== "/gold");
                    
                    return (
                      <Collapsible
                        key={item.label}
                        asChild
                        defaultOpen={isActive}
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <Link to={item.href}>
                              <SidebarMenuButton
                                tooltip={{
                                  children: item.label,
                                  side: "right",
                                  align: "center",
                                  sideOffset: 8,
                                  className: "bg-[#172036] text-white border-[#20293A]"
                                }}
                                className={cn(
                                  "flex items-center px-3 py-4 rounded-md group h-[40px]",
                                  isActive 
                                    ? "bg-[#172036] relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-[15px] before:w-[2px] before:bg-[#209CFF]"
                                    : "text-[#A1A1AA] hover:bg-[#172036]/60 hover:text-white"
                                )}
                              >
                                <item.icon 
                                  className={cn(
                                    "opacity-100 group-hover/collapsible:opacity-100",
                                    isActive ? "text-[#209CFF] opacity-100" : "text-[#A1A1AA]"
                                  )} 
                                />
                                <span className={cn("text-[#A1A1AA] hover:text-none", isActive ? "text-[#209CFF]" : "")}>{item.label}</span>
                              </SidebarMenuButton>
                            </Link>
                          </CollapsibleTrigger>
                        </SidebarMenuItem>
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
    </>
  );
}
