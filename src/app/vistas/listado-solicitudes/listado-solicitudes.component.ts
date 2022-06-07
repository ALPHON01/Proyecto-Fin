import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaSolicitudI } from 'src/app/modelos/listaSolicitud.interface';
import { SolicitudI } from 'src/app/modelos/solicitud.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { ApiService } from 'src/app/servicios/api/api.service';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';

@Component({
  selector: 'app-listado-solicitudes',
  templateUrl: './listado-solicitudes.component.html',
  styleUrls: ['./listado-solicitudes.component.css']
})
export class ListadoSolicitudesComponent implements OnInit {


  solicitudes!:ListaSolicitudI[];

  logUser!: UsuarioI;
  userHead!: number;
  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute, private alertas:AlertasService) { }

  ngOnInit(): void {
    this.checkLocalStorage();
    this.getSolicitudes();
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
  getSolicitudes(){
    this.api.getSolicitudes().subscribe(data=>{
      this.solicitudes = data;
    });
  }

  cambiarEstado(solicitud:SolicitudI){
    this.api.postCambiarEstado(solicitud).subscribe(data=>{
      this.alertas.showSuccess(data.message,'OK');
      window.location.reload();
    });

  }



  salir() {
    this.router.navigate(['dashboard']);
  }
}
