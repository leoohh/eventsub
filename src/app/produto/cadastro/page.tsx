import CadastroProduto from "@components/Formularios/CadastroDeProduto";
import { app } from "@services/app.service";

export default async function Page() {
  const res = await app({url: "api/categoria/listar", method: "GET"});

  console.log(res.data)

  return <CadastroProduto categorias={res.data.categorias} />;
}
