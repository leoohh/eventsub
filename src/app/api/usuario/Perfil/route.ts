/* eslint-disable no-unused-vars */
import "server-only";

import { NextRequest, NextResponse } from "next/server";

import { api } from "@services/api.service";

export async function POST(request: NextRequest) {
  try {
    const resposta = await api({
      url: `/usuarios/perfil`,
    });

    return NextResponse.json(resposta, { status: resposta.status });
  } catch (error) {
    console.log(error)
    return NextResponse.json({}, { status: 401 });
  }
}
