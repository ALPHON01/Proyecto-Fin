import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EquipoI } from 'src/app/modelos/equipo.interface';
import { JornadaI } from 'src/app/modelos/jornada.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-nuevo-jornada',
  templateUrl: './nuevo-jornada.component.html',
  styleUrls: ['./nuevo-jornada.component.css']
})
export class NuevoJornadaComponent implements OnInit {


  equipos!:EquipoI[];

  logUser!: UsuarioI;
  userHead!: number;

  nuevoForm = new FormGroup({

    equipo_local: new FormControl(''),
    equipo_visitante: new FormControl(''),
    fecha: new FormControl(''),
    estado: new FormControl(''),
    resultado_id: new FormControl('')
  });

  constructor(private router:Router, private activatedRoute:ActivatedRoute,private api:ApiService, private alertas:AlertasService) { }

  errorStatus: boolean = false;
  errorMsg:any = "";

  ngOnInit(): void {
    this.checkLocalStorage();
    this.getEquipos();
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

  postForm(form:JornadaI){
    this.api.postJornada(form).subscribe(data=>{
      console.log(data);
      if(data.status == 200){
        this.errorStatus = false;
        this.alertas.showSuccess("Jornada Insertada",data.statusText);
        this.router.navigate(['listado/jornadas']);
      }else{
        console.log(data);
        this.errorStatus = true;
        this.errorMsg = data.message;
      }
    })

  }

  getEquipos(){
    this.api.getEquipos().subscribe(data=>{
      this.equipos = data;
      console.log(data);
    });
  }

  salir() {
    this.router.navigate(['dashboard']);
  }

}
