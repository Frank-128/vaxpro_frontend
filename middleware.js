import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";
import globalUser from "./store/user";
import { useInitial, verifyToken } from "./constants/functions";

// This function can be marked `async` if using `await` inside
export async function middleware(request, event) {
  const token = request.cookies.get("USER_TOKEN");

  if (token) {
    try {
      const decrypted_token = CryptoJS.AES.decrypt(
        token.value,
        "vaxpro_tanzania"
      );
      const decrypted_token2 = decrypted_token.toString(CryptoJS.enc.Utf8);

      if (!decrypted_token2) {
        throw new Error("Something went wrong please log in again");
      }

      const res = await verifyToken(decrypted_token2);

      if (res === 200) {
        return NextResponse.next();
      } else {
      }
    } catch (err) {
      const url = new URL("/signin", request.url);
     
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.redirect(new URL("/signin", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/user_management/:path*", "/"],
};
