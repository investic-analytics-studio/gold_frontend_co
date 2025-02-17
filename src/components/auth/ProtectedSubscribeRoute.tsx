import React, { useEffect } from "react";
import { useAuthContext } from "@/context/authContext";
import { useNavigate } from "@tanstack/react-router";

const ProtectedSubscribeRoute = ({
  component: Component,
}: {
  component: React.ComponentType;
}) => {
  const { authUserData, authLoading, setAuthMode, setIsLoginModalOpen } =
    useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUserData.uid && !authLoading) {
      setAuthMode("login");
      setIsLoginModalOpen(true);
      navigate({ to: "/" });
    } else if (!authUserData.gold_status) {
      navigate({ to: "/gold" });
    }
  }, [authUserData, authLoading]);

  if (!authUserData.uid && !authLoading && !authUserData.gold_status) {
    return null;
  } else {
    return <Component />;
  }
};

export default ProtectedSubscribeRoute;
