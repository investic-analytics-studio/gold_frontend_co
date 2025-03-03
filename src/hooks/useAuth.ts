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
      error: "credential invalid",
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
      return { error: "credential invalid" };
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
      return { error: "credential invalid" };
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
