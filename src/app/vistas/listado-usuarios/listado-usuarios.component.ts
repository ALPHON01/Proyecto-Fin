import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaApiUsuariosI } from 'src/app/modelos/listaApiUsuarios.interface';
import { ListaUsuariosI } from 'src/app/modelos/listaUsuario.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  usuarios!: ListaUsuariosI[];
  logUser!: UsuarioI;
  userHead!: number;
  user!:UsuarioI;
  respuesta!:ListaApiUsuariosI;
  buscaForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute,private alertas:AlertasService) { }

  ngOnInit(): void {
    this.checkLocalStorage();
    this.getUsuarios();
    this.buscaForm.setValue({
      'name': this.user.name,
      'surname': this.user.surname,
      'email': this.user.email,
    })

  }


  checkLocalStorage() {
    let token = localStorage.getItem('token');
    if (token) {
      console.log(token);
      this.api.getUserByEmail(token).subscribe(data => {

        if (data.status == 400) {
          localStorage.clear();
          this.router.navigate(['login']);
        } else {
          this.logUser = data.usuario;
          this.userHead = this.logUser.role_id;
        }

      });
    } else {
      console.log('no hay token');
      this.userHead = 0;
      this.router.navigate(['login']);
    }
  }


  getUsuarios(){
    this.api.getAllUsers(5, "").subscribe(data=>{
      this.usuarios = data.data;
      this.respuesta = data;
      console.log(data);
    });
  }
  getUsuariosPaginacion(url:string){
    this.api.getAllUsers(5,url).subscribe(data=>{
      this.usuarios = data.data;
      this.respuesta = data;
      console.log(data);
    })
  }

  editarUsuario(id:string){
    console.log(id);
    this.router.navigate(['editar',id]);
  }
  nuevoUsuario(){
    this.router.navigate(['nuevo']);
  }
  salir() {
    this.router.navigate(['dashboard']);
  }
  postForm(form:UsuarioI){
    console.log(form);
    this.api.postFiltrado(form).subscribe(data=>{
      console.log(data);
      if (data.status == 400) {
        this.alertas.showError("Indique información en al menos un campo","Error");
      }else{
        this.usuarios = data;
      }
    })
  }

}


