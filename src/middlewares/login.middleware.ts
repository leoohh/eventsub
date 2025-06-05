import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getServerSession } from "../services/auth.service";

export async function loginMiddleware(request: NextRequest) {
  const session = await getServerSession();
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/login")) return;

  if (!session) return;

  return NextResponse.redirect(new URL("/", request.url));
}
