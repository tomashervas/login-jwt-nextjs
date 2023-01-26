import { NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("tokenAuth");
  //console.log(token)

  if (request.nextUrl.pathname === "/dashboard") {

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token.value, secret);
      console.log(payload);
      return NextResponse.next();
      
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}
