import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http'

import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { MiPerfilComponent } from './vistas/mi-perfil/mi-perfil.component';
import { ListadoUsuariosComponent } from './vistas/listado-usuarios/listado-usuarios.component';
import { ListadoSolicitudesComponent } from './vistas/listado-solicitudes/listado-solicitudes.component';
import { ListadoEquiposComponent } from './vistas/listado-equipos/listado-equipos.component';
import { NuevoEquipoComponent } from './vistas/nuevo-equipo/nuevo-equipo.component';
import { NuevoJornadaComponent } from './vistas/nuevo-jornada/nuevo-jornada.component';
import { ListadoJornadasComponent } from './vistas/listado-jornadas/listado-jornadas.component';
import { ListadoMisEquiposComponent } from './vistas/listado-mis-equipos/listado-mis-equipos.component';
import { NuevoSolicitudComponent } from './vistas/nuevo-solicitud/nuevo-solicitud.component';
import { BuscarEquipoComponent } from './vistas/buscar-equipo/buscar-equipo.component';
import { ListaMisEntrenamientosComponent } from './vistas/lista-mis-entrenamientos/lista-mis-entrenamientos.component';
import { NuevoEntrenamientoComponent } from './vistas/nuevo-entrenamiento/nuevo-entrenamiento.component';
import { ListaApiComponent } from './vistas/lista-api/lista-api.component';
import { ListaApiInfoComponent } from './vistas/lista-api-info/lista-api-info.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponent,
    MiPerfilComponent,
    ListadoUsuariosComponent,
    ListadoSolicitudesComponent,
    ListadoEquiposComponent,
    NuevoEquipoComponent,
    NuevoJornadaComponent,
    ListadoJornadasComponent,
    ListadoMisEquiposComponent,
    NuevoSolicitudComponent,
    BuscarEquipoComponent,
    ListaMisEntrenamientosComponent,
    NuevoEntrenamientoComponent,
    ListaApiComponent,
    ListaApiInfoComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
