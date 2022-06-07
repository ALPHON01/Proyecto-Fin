import { EntrenamientoI } from "./entrenamiento.interface";
import { UsuarioI } from "./usuario.interface";

export interface ResponseI{
  statusText:any;
  message:any;
  status:any;
  token:any;
  usuario:UsuarioI;

}
