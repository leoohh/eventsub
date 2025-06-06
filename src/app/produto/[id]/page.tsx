// app/produto/[id]/ProdutoDetalhesServer.tsx
import { app } from "@services/app.service";
import "../../../styles/ProdutoDetalhes.css";
import ProductSection from "@components/ProdutoSection";

type Categoria = {
  id_categoria: number;
  nome_categoria: string;
};

type Produto = {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  categorias: Categoria[];
  imagens: string[];
};

type Props = {
  params: { id: string };
};

export default async function ProdutoDetalhesServer({ params }: Props) {
  const res = await app({
    url: `/api/produto/buscar-id`,
    method: "GET",
    params: { id: params.id },
  });

  if (!res.data) {
    return <div>Produto não encontrado.</div>;
  }

  const produto: Produto = res.data;
  return <ProductSection produto={produto} />;
}
