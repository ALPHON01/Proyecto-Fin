import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaSolicitudI } from 'src/app/modelos/listaSolicitud.interface';
import { SolicitudI } from 'src/app/modelos/solicitud.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-listado-mis-equipos',
  templateUrl: './listado-mis-equipos.component.html',
  styleUrls: ['./listado-mis-equipos.component.css']
})
export class ListadoMisEquiposComponent implements OnInit {

  solicitudes!:ListaSolicitudI[];
  logUser!: UsuarioI;
  userHead!: number;

  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute, private alertas:AlertasService) { }
  ngOnInit(): void {
    this.checkLocalStorage();

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

          /**
           * Uso la funcion aqui para que se pueda ejecutar pues no me
           * permite desde fuera
           */
          this.getSolicitudes(this.logUser.id);
        }

      });
    } else {
      this.router.navigate(['login']);

    }
  }


  getSolicitudes(id:number){
    console.log(id);

    this.api.getMisSolicitudes(this.logUser.id).subscribe(data=>{
      this.solicitudes = data;
      console.log(data);
    });
  }
  salir() {
    this.router.navigate(['dashboard']);
  }
  eliminar(form:SolicitudI){
    console.log(form);
    this.api.deleteSolicitud(form).subscribe(data=>{
      console.log(data)
      if (data.status == 200) {
        this.alertas.showSuccess(data.message, "OK");
        window.location.reload();
      }else{
        this.alertas.showError(data.message, "Error");
      }
    })
  }
}
