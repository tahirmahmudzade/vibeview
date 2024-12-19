"use server";

import { signIn, signOut } from "@/lib/auth";

export async function login() {
  await signIn("spotify", { redirectTo: "/dashboard" });
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
