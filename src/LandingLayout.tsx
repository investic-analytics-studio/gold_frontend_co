import { Outlet } from "@tanstack/react-router";

export default function LandingLayout() {
  return (
    <div style={{ backgroundColor: "#040813" }} className="min-h-screen">
      <header className="shadow-sm sticky top-0 z-50 bg-[#040813]">
        <div className="max-w-12xl mx-4 py-4 sm:px-12 md:px-0 lg:px-12 flex justify-between items-center">
          <img
            src="/assets/images/logo-investic-light.svg"
            alt="logo"
            className="w-[40px] h-auto"
          />
          {/* <Button
            className="bg-transparent border-2 border-[#209CFF] rounded-[15px] w-auto h-[44px] text-[18px] text-[#209CFF]"
            asChild
            size="lg"
          >
            <Link to="/crypto">Login</Link>
          </Button> */}
        </div>
      </header>
      <main>
        <div className="max-w-12xl mx-0 sm:px-12 lg:px-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
