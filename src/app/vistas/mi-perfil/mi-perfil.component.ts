import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaUsuariosI } from 'src/app/modelos/listaUsuario.interface';
import { ResponseI } from 'src/app/modelos/response.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  logUser!: UsuarioI;
  datosUsuario!: UsuarioI;
  editarForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    fecha_nac: new FormControl(''),
    password: new FormControl(''),
    role_id: new FormControl('')
  });

  errorStatus: boolean = false;
  errorMsg: any = "";

  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute, private alertas: AlertasService) { }


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
          this.datosUsuario = data.usuario;
          this.editarForm.setValue({
            'id': this.datosUsuario.id,
            'name': this.datosUsuario.name,
            'surname': this.datosUsuario.surname,
            'email': this.datosUsuario.email,
            'fecha_nac': this.datosUsuario.fecha_nac,
            'role_id':this.datosUsuario.role_id,
            'password': ''
          })

        }

      });
    } else {
      this.router.navigate(['login']);
      console.log('no hay token');

    }
  }

  postForm(form: UsuarioI) {
    this.api.putUsuario(form).subscribe(data => {
      let respuesta: ResponseI = data;
      if (respuesta.status == 200) {
        this.alertas.showSuccess(data.message, data.statusText);
        this.router.navigate(['dashboard']);
      } else {
        this.alertas.showError(data.message, "Error");
      }
      console.log(data);

    });
  }


  salir() {
    this.router.navigate(['dashboard']);
  }
  eliminar() {
    let datos: UsuarioI = this.editarForm.value;
    this.api.deleteUsuario(datos).subscribe(data => {
      let respuesta: ResponseI = data;
      if (respuesta.status == 200) {
        this.alertas.showSuccess("Usuario eliminado", data.statusText);
        this.router.navigate(['login']);
        localStorage.clear();
      } else {
        this.alertas.showError("Asegurese que el usuario no está dependa de ninguna otra tabla", "Error");
      }
      console.log(data);
    });

  }


}
