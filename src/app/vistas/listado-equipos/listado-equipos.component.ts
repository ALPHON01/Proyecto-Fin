import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LigaI } from 'src/app/modelos/liga.interface';
import { ListaEquipoI } from 'src/app/modelos/listaEquipo.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { ApiService } from 'src/app/servicios/api/api.service';


@Component({
  selector: 'app-listado-equipos',
  templateUrl: './listado-equipos.component.html',
  styleUrls: ['./listado-equipos.component.css']
})
export class ListadoEquiposComponent implements OnInit {

  equipos!:ListaEquipoI[];
  ligas!:LigaI[];
  entrenadores!:UsuarioI[];
  logUser!:UsuarioI;
  userHead!:number;

  constructor(private router:Router, private activateRoute:ActivatedRoute, private api:ApiService) { }

  ngOnInit(): void {
    this.checkLocalStorage();
    this.getEquipos();
    this.getEntrenadores();
    this.getLigas();
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
  getEntrenadores(){
    this.api.getEntrenadores().subscribe(data=>{
      this.entrenadores = data;
      console.log(data);
    })
  }
  getLigas(){
    this.api.getLigas().subscribe(data=>{
      this.ligas = data;
      console.log(data);
    })
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

  salir() {
    this.router.navigate(['dashboard']);
  }
}
