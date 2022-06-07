import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaUsuariosI } from 'src/app/modelos/listaUsuario.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuarios!: ListaUsuariosI[];
  logUser!: UsuarioI;
  userHead!: number;

  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute) {

  }

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
        }

      });
    } else {
      this.router.navigate(['login']);

    }
  }


  editarUsuario() {
    this.router.navigate(['perfil']);
  }







}
