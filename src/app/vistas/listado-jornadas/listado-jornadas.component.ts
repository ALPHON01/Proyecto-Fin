import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JornadaI } from 'src/app/modelos/jornada.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-listado-jornadas',
  templateUrl: './listado-jornadas.component.html',
  styleUrls: ['./listado-jornadas.component.css']
})
export class ListadoJornadasComponent implements OnInit {


  jornadas!:JornadaI[];

  logUser!:UsuarioI;
  userHead!:number;

  constructor(private router:Router, private activateRoute:ActivatedRoute, private api:ApiService) { }

  ngOnInit(): void {
    this.checkLocalStorage();
    this.getJornadas();
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

  getJornadas(){
    this.api.getJornadas().subscribe(data=>{
      this.jornadas = data;
      console.log(data);
    });
  }
  nuevaJornada(){
    this.router.navigate(['nuevo/jornadas']);
  }
  salir() {
    this.router.navigate(['dashboard']);
  }
}
