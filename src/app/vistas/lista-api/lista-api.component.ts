import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-lista-api',
  templateUrl: './lista-api.component.html',
  styleUrls: ['./lista-api.component.css']
})
export class ListaApiComponent implements OnInit {

  ligas!:any;
  nuevoForm = new FormGroup({
    id: new FormControl(''),
    anio: new FormControl(''),
});
  constructor(private activateRoute:ActivatedRoute, private router:Router, private api:ApiService,private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarDatos();
	}

  cargarDatos(){
    this.api.getApi().subscribe(data=>{
      console.log(data);
      this.ligas = data.data;
    })
  }

  getApiInfo(ligaId:number){

    this.router.navigate(['listado/api',ligaId]);
  }
}
