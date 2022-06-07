import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-lista-api-info',
  templateUrl: './lista-api-info.component.html',
  styleUrls: ['./lista-api-info.component.css']
})
export class ListaApiInfoComponent implements OnInit {

ligaId!:string;
estaLiga!:any;
marcadores!:any;
  constructor(private activateRoute:ActivatedRoute, private router:Router, private api:ApiService,private http: HttpClient) { }

  ngOnInit(): void {
    this.getInfoApi();
  }
  getInfoApi(){
    this.ligaId = this.activateRoute.snapshot.paramMap.get('id')!;
    this.api.getApiInformation(this.ligaId).subscribe(data=>{
      console.log(data.data);
      this.estaLiga = data.data;
      this.marcadores = data.data.standings;
      console.log(this.marcadores);
    });
  }
  salir(){
    this.router.navigate(['listado/api']);
  }

}
