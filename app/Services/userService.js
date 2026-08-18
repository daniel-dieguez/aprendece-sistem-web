

import { get, post } from "../Services/api";

export const getUsuarios = () => get("/usuarios");

export const crearUsuario = (data) =>
  post("/usuarios", data);
