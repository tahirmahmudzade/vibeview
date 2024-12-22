// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  console.log("Token:", token);
  const { pathname } = req.nextUrl;

  if (pathname === "/dashboard") {
    if (!token) {
      console.log("No token found");

      throw Error("No token found");
    }
  }

  const isOnHome = pathname === "/";
  const isOnProtectedPath = ["/dashboard", "/tracks", "/artists"].some((path) =>
    pathname.startsWith(path)
  );

  // Check token validity
  const tokenIsValid = token && token.expiresAt && token.expiresAt > Date.now();

  if (!tokenIsValid) {
    // console.log("token is invalid");

    if (isOnProtectedPath) {
      // console.log("we are on dashboard, redirecting to home");

      return NextResponse.redirect(new URL("/", req.url));
    }

    // console.log("we are not on dashboard, let them pass");

    return NextResponse.next();
  } else {
    // console.log("token is valid");

    if (isOnHome) {
      // console.log("we are on home, redirecting to dashboard");

      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // console.log("we are not on home, let them pass");

    // On dashboard or other pages, let them pass
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
