// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const { pathname } = req.nextUrl;

  const isOnHome = pathname === "/";
  const isOnProtectedPath = ["/dashboard", "/tracks", "/artists"].some((path) =>
    pathname.startsWith(path)
  );

  const tokenIsValid = token?.expiresAt && token.expiresAt > Date.now();

  if (!tokenIsValid) {
    if (isOnProtectedPath) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } else {
    if (isOnHome) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
