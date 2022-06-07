import { Injectable } from '@angular/core';
import{LoginI} from '../../modelos/login.interface';
import {ResponseI} from '../../modelos/response.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, retry } from 'rxjs';
import { ListaUsuariosI } from 'src/app/modelos/listaUsuario.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { ListaSolicitudI } from 'src/app/modelos/listaSolicitud.interface';
import { SolicitudI } from 'src/app/modelos/solicitud.interface';
import {  ListaEquipoI } from 'src/app/modelos/listaEquipo.interface';
import { LigaI } from 'src/app/modelos/liga.interface';
import { EquipoI } from 'src/app/modelos/equipo.interface';
import { JornadaI } from 'src/app/modelos/jornada.interface';
import { EntrenamientoI } from 'src/app/modelos/entrenamiento.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://localhost/LARAVEL/mi-proyecto-laravel/public/api";

  constructor(private http:HttpClient) { }

    loginByEmail(form:LoginI):Observable<ResponseI>{

      let direccion = this.url+"/auth";
      return this.http.post<ResponseI>(direccion,form);
    }

    getAllUsers(paginate:number):Observable<ListaUsuariosI[]>{
      let direccion = this.url+"/users";
      return this.http.get<ListaUsuariosI[]>(direccion);
    }

    getUser(id:string):Observable<UsuarioI>{
      let direccion = this.url+"/users/"+id;
      return this.http.get<UsuarioI>(direccion);
    }

    putUsuario(form:UsuarioI):Observable<ResponseI>{

      let direccion = this.url+'/users/'+form.id;
      return this.http.put<ResponseI>(direccion,form);
    }

    deleteUsuario(form:UsuarioI):Observable<ResponseI>{
      let direccion = this.url + "/users/"+form.id;
      let options = {
        headers: new HttpHeaders({
          'Content-type': 'application/json'
        }),
        body:form
      }
      return this.http.delete<ResponseI>(direccion,options);
    }

    postUsuario(form:UsuarioI):Observable<ResponseI>{
      let direccion = this.url + "/users/add";

      return this.http.post<ResponseI>(direccion,form);
    }

    getUserByEmail(email:string){
      let direccion = this.url + "/users/"+email;
      return this.http.post<ResponseI>(direccion,email);
    }

    getSolicitudes():Observable<ListaSolicitudI[]>{
      let direccion = this.url+"/solicitudes/all";
      return this.http.get<ListaSolicitudI[]>(direccion);
    }
    postCambiarEstado(solicitud:SolicitudI){
      let direccion = this.url+"/solicitudes/cambiar";
      return this.http.post<ResponseI>(direccion,solicitud);
    }

    getEquipos():Observable<ListaEquipoI[]>{
      let direccion = this.url+"/equipos/all";
      return this.http.get<ListaEquipoI[]>(direccion);
    }

    getLigas():Observable<LigaI[]>{
      let direccion = this.url+"/ligas/all";
      return this.http.get<LigaI[]>(direccion);
    }
    getEntrenadores():Observable<UsuarioI[]>{
      let direccion = this.url+"/entrenadores/all";
      return this.http.get<UsuarioI[]>(direccion);
    }
    getJugadores():Observable<UsuarioI[]>{
      let direccion = this.url+"/jugadores/all";
      return this.http.get<UsuarioI[]>(direccion);
    }
    postEquipo(form:EquipoI):Observable<ResponseI>{
      let direccion = this.url + "/equipo/add";

      return this.http.post<ResponseI>(direccion,form);
    }
    getJornadas():Observable<JornadaI[]>{
      let direccion = this.url+"/jornadas/all";
      return this.http.get<JornadaI[]>(direccion);
    }
    postJornada(form:JornadaI):Observable<ResponseI>{
      let direccion = this.url + "/jornadas/add";
      return this.http.post<ResponseI>(direccion,form);
    }
    deleteSolicitud(form:SolicitudI):Observable<ResponseI>{
      let direccion = this.url+"/solicitudes/borrar";
      let options = {
        headers: new HttpHeaders({
          'Content-type': 'application/json'
        }),
        body: form
      }
      return this.http.delete<ResponseI>(direccion,options);
    }

    getMisSolicitudes(id:number){
      let direccion = this.url+"/solicitudes/misequipos/"+id;
      return this.http.get<ListaSolicitudI[]>(direccion);
    }

    apuntarEquipo(form:SolicitudI):Observable<ResponseI>{
      let direccion = this.url + "/solicitudes/add";
      return this.http.post<ResponseI>(direccion,form);
    }
     getMisEntrenamientos(id:number){
      let direccion = this.url+"/entrenamientos/misentrenamientos/"+id;
      return this.http.get<EntrenamientoI[]>(direccion);
     }
     getMisEntrenados(id:number){
      let direccion = this.url+"/entrenamientos/misentrenados/"+id;
      return this.http.get<EntrenamientoI[]>(direccion);
     }
     postEntrenamiento(form:EntrenamientoI):Observable<ResponseI>{
      let direccion = this.url + "/entrenamientos/add";

      return this.http.post<ResponseI>(direccion,form);
    }

    deleteEntrenamiento(form:EntrenamientoI):Observable<ResponseI>{
      let direccion = this.url+"/entrenamientos/borrar";
      let options = {
        headers: new HttpHeaders({
          'Content-type': 'application/json'
        }),
        body: form
      }
      return this.http.delete<ResponseI>(direccion,options);
    }

    getApi(){
      return this.http.get<any>("https://api-football-standings.azharimm.site/leagues");
    }
    getApiInformation(ligaId:string){
      return this.http.get<any>("https://api-football-standings.azharimm.site/leagues/"+ligaId+"/standings?season=2020&sort=asc");
    }



}
