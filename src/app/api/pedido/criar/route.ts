/* eslint-disable no-unused-vars */
import "server-only";

import { NextRequest, NextResponse } from "next/server";

import { api } from "@services/api.service";

export async function POST(request: NextRequest) {
   const { itens,endereco,usuario } = await request.json();
  try {
    const resposta = await api({
      url: `/pedidos`,
      data: {itens,endereco,usuario}
      
    });

    return NextResponse.json(resposta, { status: resposta.status });
  } catch (error) {
    return NextResponse.json({}, { status: 401 });
  }
}
