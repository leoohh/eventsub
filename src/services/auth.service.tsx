/* eslint-disable no-console */
"server only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

import { sessionName, sessionTokenMaxAge } from "@config/session.config";

import { Session } from "@context/AuthContext";

const secretKey = new TextEncoder().encode(process.env.SESSION_JWT_SECRET);

export async function getServerSession() {
  const cookie = await cookies();
  const session = cookie.get(sessionName);

  if (!session) {
    return undefined;
  }

  return await decode(session.value);
}

export async function encode(user: Session) {
  if (!process.env.SESSION_JWT_SECRET || !process.env.SESSION_VERSION) {
    throw new Error("Variáveis de ambiente necessárias não estão definidas");
  }

  const tokenPayload = {
    ...user,
    tokenVersion: process.env.SESSION_VERSION,
  };

  return await new SignJWT(tokenPayload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(sessionTokenMaxAge).sign(secretKey);
}

export async function decode(token?: string) {
  if (!token) {
    return undefined;
  }

  try {
    const { payload } = await jwtVerify(token, secretKey);

    return payload as Session;
  } catch (error) {
    return undefined;
  }
}
