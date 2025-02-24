import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  linkWithCredential,
  UserCredential,
  deleteUser,
  User,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../config/firebase";
import { FirebaseError } from "firebase/app";
import { autoValidate } from "@/api/auth";
import { getAccessToken, setAccessToken } from "@/utils/localStorage";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface SignInRes {
  userCredential: UserCredential | null;
  accessToken: string;
  error: string;
}

interface SignInWithGoogleRes {
  userCredential: UserCredential | null;
  accessToken: string;
}

interface LinkAccountRes {
  error: string;
}

export async function signInWithGoogle(): Promise<SignInWithGoogleRes> {
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);

    return { userCredential: res, accessToken: await res.user.getIdToken() };
  } catch (error) {
    console.error("Error signing in with Google", error);
    return { userCredential: null, accessToken: "" };
  }
}

export async function signOut(): Promise<void> {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out with Google", error);
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<SignInRes> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    await autoValidate({ uid: userCredential.user.uid });

    return {
      userCredential: userCredential,
      accessToken: await userCredential.user.getIdToken(),
      error: "",
    };
  } catch (e) {
    console.error(e);
    return {
      userCredential: null,
      accessToken: "",
      error: "credential invalid 5",
    };
  }
}

export async function GoogleLinkAccount(
  idToken: string,
  accessToken: string
): Promise<LinkAccountRes> {
  const credential = GoogleAuthProvider.credential(idToken, accessToken);
  try {
    const user = auth.currentUser;
    if (user) {
      await linkWithCredential(user, credential);
      return { error: "" };
    } else {
      return { error: "credential invalid 3" };
    }
  } catch (error) {
    if (
      !(
        error instanceof FirebaseError &&
        error.code === "auth/credential-already-in-use"
      )
    ) {
      return { error: "" };
    } else {
      return { error: "credential invalid 4" };
    }
  }
}

export async function deleteAccount(user: User): Promise<void> {
  try {
    if (user) {
      await deleteUser(user);
    }
  } catch (error) {
    console.error("Error deleting account", error);
  }
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const expiryTime = decodedToken.exp * 1000;
    const currentTime = Date.now();

    return currentTime >= expiryTime;
  } catch (error) {
    console.error("❌ Error checking token expiry:", error);
    return true;
  }
};

const refreshUserToken = async (user: User): Promise<boolean> => {
  try {
    const before = await user.getIdToken();
    await user.getIdToken(true);
    const after = await user.getIdToken();
    if (after) {
      setAccessToken(after);
    }
    const tokenChanged = before !== after;

    if (tokenChanged) {
      console.log("✅ Token refreshed successfully");
    }

    return tokenChanged;
  } catch (error) {
    console.error("❌ Failed to refresh token:", error);
    toast({
      title: "Token Refresh Failed",
      description: "Failed to refresh authentication token",
      variant: "destructive",
      className:
        "bg-[#091423] border-0 border-l-[4px] text-[#A1A1AA] font-normal rounded-none",
    });
    return false;
  }
};

const waitForUser = async (maxAttempts = 5): Promise<User | null> => {
  let attempts = 0;
  while (attempts < maxAttempts) {
    const user = auth.currentUser;
    if (user) {
      return user;
    }
    attempts++;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return null;
};

export function useTokenRefresh() {
  useEffect(() => {
    let mounted = true;
    let refreshTimer: number | null = null;
    const REFRESH_INTERVAL = 30 * 60 * 1000;

    const handleTokenRefresh = async () => {
      if (!mounted) return;

      const accessToken = getAccessToken();
      if (!accessToken) {
        toast({
          title: "Authentication Error",
          description: "No access token found",
          variant: "destructive",
          className:
            "bg-[#091423] border-0 border-l-[4px] text-[#A1A1AA] font-normal rounded-none",
        });
        return;
      }

      if (isTokenExpired(accessToken)) {
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please log in again",
          variant: "destructive",
          className:
            "bg-[#091423] border-0 border-l-[4px] text-[#A1A1AA] font-normal rounded-none",
        });
        if (refreshTimer) {
          clearInterval(refreshTimer);
          refreshTimer = null;
        }
        return;
      }

      let user = auth.currentUser;
      if (!user) {
        user = await waitForUser();
      }

      if (!user) {
        toast({
          title: "Authentication Error",
          description: "Failed to initialize user session",
          variant: "destructive",
          className:
            "bg-[#091423] border-0 border-l-[4px] text-[#A1A1AA] font-normal rounded-none",
        });
        return;
      }

      await refreshUserToken(user);
    };

    const clearRefreshTimer = () => {
      if (refreshTimer) {
        clearInterval(refreshTimer);
        refreshTimer = null;
      }
    };

    const startRefreshTimer = () => {
      if (!mounted) return;

      clearRefreshTimer();
      refreshTimer = window.setInterval(() => {
        if (mounted) {
          handleTokenRefresh().catch((error) => {
            console.error("Token refresh error:", error);
            toast({
              title: "Token Refresh Error",
              description: "Failed to refresh session",
              variant: "destructive",
              className:
                "bg-[#091423] border-0 border-l-[4px] text-[#A1A1AA] font-normal rounded-none",
            });
          });
        }
      }, REFRESH_INTERVAL);
    };

    const initialize = async () => {
      if (!mounted) return;

      const accessToken = getAccessToken();
      if (!accessToken || isTokenExpired(accessToken)) {
        toast({
          title: "Session Error",
          description: "Invalid or expired session",
          variant: "destructive",
          className:
            "bg-[#091423] border-0 border-l-[4px] text-[#A1A1AA] font-normal rounded-none",
        });
        return;
      }

      try {
        await handleTokenRefresh();
        if (mounted) {
          startRefreshTimer();
        }
      } catch (error) {
        console.error("Error in initialization:", error);
        toast({
          title: "Initialization Error",
          description: "Failed to initialize session refresh",
          variant: "destructive",
          className:
            "bg-[#091423] border-0 border-l-[4px] text-[#A1A1AA] font-normal rounded-none",
        });
      }
    };

    // Initial token refresh
    initialize().catch((error) => {
      console.error("Initial refresh error:", error);
      toast({
        title: "Startup Error",
        description: "Failed to start session refresh",
        variant: "destructive",
        className:
          "bg-[#091423] border-0 border-l-[4px] text-[#A1A1AA] font-normal rounded-none",
      });
    });

    // Auth state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!mounted) return;

      if (user) {
        const accessToken = getAccessToken();
        if (accessToken && !isTokenExpired(accessToken)) {
          initialize().catch((error) => {
            console.error("Auth state refresh error:", error);
            toast({
              title: "Authentication Error",
              description: "Failed to refresh session after login",
              variant: "destructive",
              className:
                "bg-[#091423] border-0 border-l-[4px] text-[#A1A1AA] font-normal rounded-none",
            });
          });
        }
      } else {
        clearRefreshTimer();
      }
    });

    // Cleanup
    return () => {
      mounted = false;
      clearRefreshTimer();
      unsubscribe();
    };
  }, []);
}
