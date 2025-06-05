import "server-only";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { sessionName } from "@config/session.config";

import { api } from "@services/api.service";
import { decode } from "@services/auth.service";

export async function POST() {
  const cookie = await cookies();
  const sessionCookie = cookie.get(sessionName);

  if (!sessionCookie) {
    return NextResponse.json({}, { status: 401 });
  }

  const session = await decode(sessionCookie.value);

  if (!session) {
    cookie.delete(sessionName);

    return NextResponse.json({ title: "Sessão Expirada", message: "Tempo limite de sessão expirado" }, { status: 401 });
  }

  const resposta = await api({ url: "api/auth", method: "GET" });

  if (resposta) {
    return NextResponse.json(resposta, { status: resposta.status });
  }

  cookie.delete(sessionName);

  return NextResponse.json(resposta, { status: resposta.status });
}
