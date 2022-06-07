import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LigaI } from 'src/app/modelos/liga.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { ApiService } from 'src/app/servicios/api/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EquipoI } from 'src/app/modelos/equipo.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
@Component({
  selector: 'app-nuevo-equipo',
  templateUrl: './nuevo-equipo.component.html',
  styleUrls: ['./nuevo-equipo.component.css']
})
export class NuevoEquipoComponent implements OnInit {

  logUser!:UsuarioI;
  userHead!: number;
  ligas!:LigaI[];
  entrenadores!:UsuarioI[];

  nuevoForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(''),
    entrenador_id: new FormControl(''),
    liga_id: new FormControl('')
});

  constructor(private router:Router, private activatedRoute:ActivatedRoute,private api:ApiService, private alertas:AlertasService) { }

  errorStatus: boolean = false;
  errorMsg:any = "";


  ngOnInit(): void {
    this.checkLocalStorage();
    this.getLigas();
    this.getEntrenadores();
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


  postForm(form:EquipoI){
    this.api.postEquipo(form).subscribe(data=>{
      console.log(data);
      if(data.status == 200){
        this.errorStatus = false;
        this.alertas.showSuccess("Equipo Insertado",data.statusText);
        this.router.navigate(['listado/equipos']);
      }else{
        console.log(data);
        this.errorStatus = true;
        this.errorMsg = data.message;
      }
    })

  }


  salir() {
    this.router.navigate(['listado/equipos']);
  }
}
