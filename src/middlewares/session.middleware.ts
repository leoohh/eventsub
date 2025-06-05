import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { sessionName } from "@config/session.config";

import { decode } from "@services/auth.service";

export async function sissionMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/profile")) return;

  const token = request.cookies.get(sessionName)?.value;
  const session = await decode(token);

  if (session && session.tokenVersion === process.env.SESSION_VERSION) return;

  const url = new URL("/login", request.url);
  url.searchParams.set("sessionExpired", "1");

  const response = NextResponse.redirect(url);
  response.cookies.delete(sessionName);

  return response;
}
