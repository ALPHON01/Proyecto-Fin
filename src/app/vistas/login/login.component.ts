import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/servicios/api/api.service';
import { LoginI } from 'src/app/modelos/login.interface';
import {Router} from '@angular/router';
import { ResponseI } from 'src/app/modelos/response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  constructor( private api:ApiService, private router:Router) { }

  errorStatus: boolean = false;
  errorMsg:any = "";


  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if(localStorage.getItem('token')){
      this.router.navigate(['dashboard']);
    }
  }

  nuevoUsuario(){
    this.router.navigate(['nuevo']);
  }



  onLogin(form: LoginI){
    this.api.loginByEmail(form).subscribe((data)=>{


      if (data.statusText == "OK") {
        console.log(data);
        localStorage.setItem('token',data.token)
        this.router.navigate(['dashboard']);

      }else if (data.status == 400) {
        console.log(data);
      } else {
        console.log("No ha realizado la peticion correctamente")
      }
      this.errorStatus = true;
        this.errorMsg = data.message;

    });

  }

}
