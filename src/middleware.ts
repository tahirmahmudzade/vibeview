import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

const protectedRoutes = ["/dashboard"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(path);

  if (isProtected) {
    const session = await auth();

    if (!session) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    const expiresAt = new Date(session.expires).getTime();
    const now = Date.now();

    if (now >= expiresAt) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next();
}
