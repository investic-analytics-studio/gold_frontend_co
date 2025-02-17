import React, { useEffect } from "react";
import { useAuthContext } from "@/context/authContext";
import { useNavigate } from "@tanstack/react-router";

const ProtectedRoute = ({
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
    }
  }, [authUserData, authLoading]);

  if (!authUserData.uid && !authLoading) {
    return null;
  } else {
    return <Component />;
  }
};

export default ProtectedRoute;
