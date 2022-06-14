import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./vistas/login/login.component";
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { NuevoComponent } from './vistas/nuevo/nuevo.component';
import { EditarComponent } from './vistas/editar/editar.component';
import { MiPerfilComponent } from './vistas/mi-perfil/mi-perfil.component';
import { ListadoUsuariosComponent } from './vistas/listado-usuarios/listado-usuarios.component';
import { ListadoSolicitudesComponent } from './vistas/listado-solicitudes/listado-solicitudes.component';
import { ListadoEquiposComponent } from './vistas/listado-equipos/listado-equipos.component';
import { NuevoEquipoComponent } from './vistas/nuevo-equipo/nuevo-equipo.component';
import { ListadoJornadasComponent } from './vistas/listado-jornadas/listado-jornadas.component';
import { NuevoJornadaComponent } from './vistas/nuevo-jornada/nuevo-jornada.component';
import { NuevoSolicitudComponent } from './vistas/nuevo-solicitud/nuevo-solicitud.component';
import { ListadoMisEquiposComponent } from './vistas/listado-mis-equipos/listado-mis-equipos.component';
import { BuscarEquipoComponent } from './vistas/buscar-equipo/buscar-equipo.component';
import { ListaMisEntrenamientosComponent } from './vistas/lista-mis-entrenamientos/lista-mis-entrenamientos.component';
import { NuevoEntrenamientoComponent } from './vistas/nuevo-entrenamiento/nuevo-entrenamiento.component';
import { ListaApiComponent } from './vistas/lista-api/lista-api.component';
import { ListaApiInfoComponent } from './vistas/lista-api-info/lista-api-info.component';
import { ListadoMisEquiposEntrenadorComponent } from './vistas/listado-mis-equipos-entrenador/listado-mis-equipos-entrenador.component';
const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login',component:LoginComponent,},
  {path:'dashboard',component:DashboardComponent},
  {path:'nuevo',component:NuevoComponent},
  {path:'editar/:id',component:EditarComponent},
  {path:'perfil',component:MiPerfilComponent},
  {path:'listado/usuarios',component:ListadoUsuariosComponent},
  {path:'listado/solicitudes',component:ListadoSolicitudesComponent},
  {path:'listado/equipos',component:ListadoEquiposComponent},
  {path:'nuevo/equipo',component:NuevoEquipoComponent},
  {path:'listado/jornadas',component:ListadoJornadasComponent},
  {path:'nuevo/jornadas',component:NuevoJornadaComponent},
  {path:'listado/misequipos',component:ListadoMisEquiposComponent},
  {path:'listado/misequipos/entrenador',component:ListadoMisEquiposEntrenadorComponent},
  {path:'nuevo/solicitudes',component:NuevoSolicitudComponent},
  {path:'buscar/equipo',component:BuscarEquipoComponent},
  {path:'listado/entrenamientos',component:ListaMisEntrenamientosComponent},
  {path:'nuevo/entrenamientos',component:NuevoEntrenamientoComponent},
  {path:'listado/api',component:ListaApiComponent},
  {path:'listado/api/:id',component:ListaApiInfoComponent},

]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),

  ],
  exports:[RouterModule]
})
export class AppRoutingModule {}

export const routingComponent = [LoginComponent,
  DashboardComponent, EditarComponent, NuevoComponent, MiPerfilComponent,
  ListadoUsuariosComponent, ListadoSolicitudesComponent,ListadoEquiposComponent,
  NuevoEquipoComponent, ListadoJornadasComponent, NuevoJornadaComponent,ListadoMisEquiposComponent,
  NuevoSolicitudComponent,BuscarEquipoComponent,ListaMisEntrenamientosComponent,NuevoEntrenamientoComponent,
   ListaApiComponent,ListaApiInfoComponent, ListadoMisEquiposEntrenadorComponent

]
