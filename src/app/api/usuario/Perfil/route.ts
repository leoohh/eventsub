/* eslint-disable no-unused-vars */
import "server-only";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { sessionCookieMaxAge, sessionName } from "@config/session.config";

import { Session } from "@context/AuthContext";

import { api } from "@services/api.service";
import { encode } from "@services/auth.service";

export async function GET(request: NextRequest) {
  

  try {
    const resposta = await api({
      url: `/usuarios/perfil`,
      method:"GET"
      
    });

    if (resposta.accessToken) {
      const cookie = await cookies();
      const session = await encode(resposta as Session);
      const expirationDate = new Date(Date.now() + sessionCookieMaxAge);

      cookie.set(sessionName, session, {
        secure: true,
        httpOnly: true,
        expires: expirationDate,
        path: "/",
        sameSite: "lax",
      });
    }

    return NextResponse.json(resposta, { status: resposta.status });
  } catch (error) {
    return NextResponse.json({}, { status: 401 });
  }
}
