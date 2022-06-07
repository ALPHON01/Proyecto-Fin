import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LigaI } from 'src/app/modelos/liga.interface';
import { ListaEquipoI } from 'src/app/modelos/listaEquipo.interface';
import { SolicitudI } from 'src/app/modelos/solicitud.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { ApiService } from 'src/app/servicios/api/api.service';


@Component({
  selector: 'app-buscar-equipo',
  templateUrl: './buscar-equipo.component.html',
  styleUrls: ['./buscar-equipo.component.css']
})
export class BuscarEquipoComponent implements OnInit {

  equipos!:ListaEquipoI[];
  solicitud!:SolicitudI;
  logUser!:UsuarioI;
  userHead!:number;

  constructor(private router:Router, private activateRoute:ActivatedRoute, private api:ApiService, private alertas:AlertasService) { }

  ngOnInit(): void {
    this.checkLocalStorage();
    this.getEquipos();

  }
  checkLocalStorage() {
    let token = localStorage.getItem('token');
    if (token) {
      console.log(token);
      this.api.getUserByEmail(token).subscribe(data => {
        console.log(data);
        if (data.status == 400) {
          localStorage.clear();
          this.router.navigate(['login']);
        } else {
          this.logUser = data.usuario;
          this.userHead = this.logUser.role_id;
        }

      });
    } else {
      this.router.navigate(['login']);

    }
  }


  getEquipos(){
    this.api.getEquipos().subscribe(data=>{
      this.equipos = data;
      console.log(data);
    });
  }
  nuevoEquipo(){
    this.router.navigate(['nuevo/equipo']);
  }

  apuntarEquipo(equipoId:number){
    let form = this.solicitud || {};
    console.log(equipoId);
    console.log(this.logUser.id);

    form.equipo_id = equipoId;
    form.usuario_id = this.logUser.id;
    console.log(form);

    this.api.apuntarEquipo(form).subscribe(data=>{
      console.log(data);
      if(data.status == 200){
        this.alertas.showSuccess(data.message, "OK");
      }else{
        this.alertas.showError(data.message, "Error");
      }
    });
  }

  salir() {
    this.router.navigate(['dashboard']);
  }

}
