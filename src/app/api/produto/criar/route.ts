/* eslint-disable no-unused-vars */
import "server-only";

import { NextRequest, NextResponse } from "next/server";

import { api } from "@services/api.service";

export async function POST(request: NextRequest) {
   const { nome, descricao, preco, imagens, categorias } = await request.json();
  try {
    const resposta = await api({
      url: `/produtos`,
      data: {nome, descricao, preco, imagens, categorias}
      
    });

    return NextResponse.json(resposta, { status: resposta.status });
  } catch (error) {
    return NextResponse.json({}, { status: 401 });
  }
}
