import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { ApiService } from 'src/app/servicios/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { ResponseI } from 'src/app/modelos/response.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { ListaUsuariosI } from 'src/app/modelos/listaUsuario.interface';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {


  constructor(private activateRoute: ActivatedRoute, private router: Router, private api: ApiService, private alertas: AlertasService) { }


  logUser!: UsuarioI;
  datosUsuario!: ListaUsuariosI;
  userHead!: number;
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

  ngOnInit(): void {
    this.checkLocalStorage();
    let usuarioId = this.activateRoute.snapshot.paramMap.get('id')!;

    this.api.getUser(usuarioId).subscribe(data => {
      console.log(data);
      this.datosUsuario = data.data[ parseInt(usuarioId)-1];
      this.editarForm.setValue({
        'id': usuarioId,
        'name': this.datosUsuario.name,
        'surname': this.datosUsuario.surname,
        'email': this.datosUsuario.email,
        'fecha_nac': this.datosUsuario.fecha_nac,
        'role_id': this.datosUsuario.role_id,
        'password': ''
      })


    });
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


  postForm(form: UsuarioI) {
    this.api.putUsuario(form).subscribe(data => {
      let respuesta: ResponseI = data;
      if (respuesta.status == 200) {
        this.alertas.showSuccess(data.message, data.statusText);
        this.router.navigate(['dashboard']);
      } else {
        this.alertas.showError("No se ha podido realizar la petición", "Error");
      }
      console.log(data);

    });
  }

  eliminar() {
    let datos: UsuarioI = this.editarForm.value;
    this.api.deleteUsuario(datos).subscribe(data => {
      let respuesta: ResponseI = data;
      if (respuesta.status == 200) {
        this.alertas.showSuccess("Usuario eliminado", data.statusText);
        this.router.navigate(['dashboard']);
      } else {
        this.alertas.showError("Asegurese que el usuario no está dependa de ninguna otra tabla", "Error");
      }
      console.log(data);
    });

  }

  salir() {
    this.router.navigate(['listado/usuarios']);
  }




}
