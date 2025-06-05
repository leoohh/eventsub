/* eslint-disable no-unused-vars */
import "server-only";

import { NextRequest, NextResponse } from "next/server";

import { api } from "@services/api.service";

export async function DELETE(request: NextRequest) {
  try {
    const resposta = await api({
      url: `/favoritos/:id_produto`,
      method: "DELETE"
    });

    return NextResponse.json(resposta, { status: resposta.status });
  } catch (error) {
    return NextResponse.json({}, { status: 401 });
  }
}
