import "server-only";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { sessionName } from "@config/session.config";

export async function POST() {
  const cookie = await cookies();

  cookie.delete(sessionName);

  return NextResponse.json({ success: true }, { status: 200 });
}
