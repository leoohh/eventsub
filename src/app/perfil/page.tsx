import { app } from "@services/app.service";

import UpdateDeUsuario from "@components/Formularios/UpdateDeUsuario";

export default async function Page() {
  const res = await app({ url: "api/usuario/perfil" });
  const { nome, email, telefone, endereco } = res?.data;

  return <UpdateDeUsuario perfil={{ nome, email, telefone, endereco }} />;
};
