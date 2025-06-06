import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { api } from "@services/api.service";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ erro: "ID não informado" }, { status: 400 });
    }

    const resposta = await api({
      url: `/produtos/${id}`,
      method: "GET"
    });

    return NextResponse.json(resposta, { status: resposta.status });
  } catch (error) {
    return NextResponse.json({ erro: "Erro ao buscar produto" }, { status: 500 });
  }
}
