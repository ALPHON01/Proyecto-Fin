import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { ResponseI } from 'src/app/modelos/response.interface';
import { ApiService } from 'src/app/servicios/api/api.service';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';


@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent implements OnInit {

  nuevoForm = new FormGroup({
    id: new FormControl(''),
    role_id: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    fecha_nac: new FormControl(''),
    password: new FormControl(''),
});

  constructor(private activateRoute:ActivatedRoute, private router:Router, private api:ApiService, private alertas:AlertasService) { }

  errorStatus: boolean = false;
  errorMsg:any = "";

  ngOnInit(): void {
  }


  postForm(form:UsuarioI){
    this.api.postUsuario(form).subscribe(data=>{
      console.log(data);
      if(data.status == 200){
        this.errorStatus = false;
        this.alertas.showSuccess("Usuario Insertado",data.statusText);
        this.router.navigate(['login']);
      }else{
        console.log(data);
        this.errorStatus = true;
        this.errorMsg = data.message;
      }
    })

  }

  salir(){
    this.router.navigate(['dashboard']);
  }
}
