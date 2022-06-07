import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EntrenamientoI } from 'src/app/modelos/entrenamiento.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-nuevo-entrenamiento',
  templateUrl: './nuevo-entrenamiento.component.html',
  styleUrls: ['./nuevo-entrenamiento.component.css']
})
export class NuevoEntrenamientoComponent implements OnInit {

  entrenadores!:UsuarioI[];
  logUser!:UsuarioI;
  userHead!:number;
  jugadores!:UsuarioI[];

  nuevoForm = new FormGroup({
    id: new FormControl(''),
    jugador_id: new FormControl(''),
    entrenador_id: new FormControl(''),
    duracion: new FormControl('')
});


  constructor(private router:Router, private activatedRoute:ActivatedRoute,private api:ApiService, private alertas:AlertasService) { }

  errorStatus: boolean = false;
  errorMsg:any = "";

  ngOnInit(): void {
    this.checkLocalStorage();
    this.getEntrenadores();
    this.getJugadores();
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

  getJugadores(){
    this.api.getJugadores().subscribe(data=>{
      this.jugadores = data;
      console.log(data);
    })
  }

  getEntrenadores(){
    this.api.getEntrenadores().subscribe(data=>{
      this.entrenadores = data;
      console.log(data);
    })
  }

  postForm(form:EntrenamientoI){
    if(this.userHead == 2){
      form.entrenador_id = this.logUser.id;
    }else{
      form.jugador_id = this.logUser.id;
    }

    console.log(form);

    this.api.postEntrenamiento(form).subscribe(data=>{
      console.log(data);
      if(data.status == 200){
        this.errorStatus = false;
        this.alertas.showSuccess("Entrenamiento creado",data.statusText);
        this.router.navigate(['listado/entrenamientos']);
      }else{
        console.log(data);
        this.errorStatus = true;
        this.errorMsg = data.message;
      }
    })

  }

  salir() {
    this.router.navigate(['listado/entrenamientos']);
  }
}
