import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LigaI } from 'src/app/modelos/liga.interface';
import { ListaEquipoI } from 'src/app/modelos/listaEquipo.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-listado-mis-equipos-entrenador',
  templateUrl: './listado-mis-equipos-entrenador.component.html',
  styleUrls: ['./listado-mis-equipos-entrenador.component.css']
})
export class ListadoMisEquiposEntrenadorComponent implements OnInit {

  equipos!:ListaEquipoI[];


  logUser!:UsuarioI;
  userHead!:number;

  constructor(private router:Router, private activateRoute:ActivatedRoute, private api:ApiService) { }

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
          this.getEquipos();
        }

      });
    } else {
      this.router.navigate(['login']);

    }
  }

  getEquipos(){
    this.api.getEquiposEntrenador(this.logUser.id).subscribe(data=>{
      this.equipos = data;
      console.log(data);
    });
  }


  salir() {
    this.router.navigate(['dashboard']);
  }
}
