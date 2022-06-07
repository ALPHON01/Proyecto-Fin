import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntrenamientoI } from 'src/app/modelos/entrenamiento.interface';
import { UsuarioI } from 'src/app/modelos/usuario.interface';
import { AlertasService } from 'src/app/servicios/alertas/alertas.service';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-lista-mis-entrenamientos',
  templateUrl: './lista-mis-entrenamientos.component.html',
  styleUrls: ['./lista-mis-entrenamientos.component.css']
})
export class ListaMisEntrenamientosComponent implements OnInit {


  entrenamientos!:EntrenamientoI[];
  logUser!:UsuarioI;
  userHead!:number;
  constructor(private api: ApiService, private router: Router, private activateRoute: ActivatedRoute, private alertas:AlertasService) { }

  errorStatus: boolean = false;
  errorMsg:any = "";


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
          //Para asegurarnos que el rol aparece
          this.getEntrenos();
        }

      });
    } else {
      this.router.navigate(['login']);

    }
  }
  getEntrenos(){

    if (this.userHead == 3) {
      //cambia de peticion respecto al role_id 2 para el entrenador
      this.api.getMisEntrenamientos(this.logUser.id).subscribe(data=>{
        console.log(data);
        if(data){
          this.entrenamientos = data;
        }else{
          this.errorStatus = true;
          this.errorMsg = "No tiene entrenamientos, cree uno nuevo";
        }
      });
    }else{
      //cambia de peticion respecto al role_id 3 para el jugador
      this.api.getMisEntrenados(this.logUser.id).subscribe(data=>{
        console.log(data);
        if(data){
          this.entrenamientos = data;
        }else{
          this.errorStatus = true;
          this.errorMsg = "No tiene entrenamientos, cree uno nuevo";
        }
      });
    }
  }

  eliminar(entrenamiento:EntrenamientoI){
    this.api.deleteEntrenamiento(entrenamiento).subscribe(data=>{
      console.log(data);
      if(data.status == 200){
        this.alertas.showSuccess(data.message,data.statusText);
        window.location.reload();
      }else{
        this.alertas.showError(data.message,data.statusText);
      }
    });
  }


  nuevoEntrenamiento(){
    this.router.navigate(['nuevo/entrenamientos']);
  }

  salir() {
    this.router.navigate(['dashboard']);
  }
}
