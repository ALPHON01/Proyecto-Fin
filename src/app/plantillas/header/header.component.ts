import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { ApiService } from 'src/app/servicios/api/api.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userRole!: number;
  logUser!:UsuarioI;
  constructor(private activateRoute:ActivatedRoute, private router:Router, private api:ApiService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token) {
      console.log(token);
      this.api.getUserByEmail(token).subscribe(data=>{
        this.logUser = data.usuario;
        this.userRole = this.logUser.role_id;
      });
    }else{

      this.userRole =0;
    }
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
  //Para Admin
  listarUsuarios(){
    this.router.navigate(['listado/usuarios']);
  }
  listarSolicitudes(){
    this.router.navigate(['listado/solicitudes']);
  }
  listarEquipos(){
    this.router.navigate(['listado/equipos']);
  }
  listarJornadas(){
    this.router.navigate(['listado/jornadas']);
  }
  misEquipos(){
    this.router.navigate(['listado/misequipos']);
  }
  buscarEquipos(){
    this.router.navigate(['buscar/equipo']);
  }
  misEntrenamientos(){
    this.router.navigate(['listado/entrenamientos']);
  }
  listadoApi(){
    this.router.navigate(['listado/api']);
  }



}
