import { Routes } from '@angular/router';
import { ServidorListComponent } from './servidores/servidor-list/servidor-list.component';
import { ServidorFormComponent } from './servidores/servidor-form/servidor-form.component';
import { IncidenciaListComponent } from './incidencias/incidencia-list/incidencia-list.component';
import { IncidenciaFormComponent } from './incidencias/incidencia-form/incidencia-form.component';
import { MantenimientoListComponent } from './mantenimientos/mantenimiento-list/mantenimiento-list.component';
import { MantenimientoFormComponent } from './mantenimientos/mantenimiento-form/mantenimiento-form.component';
import { ServidorDetailComponent } from './servidores/servidor-detail/servidor-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'servidores', pathMatch: 'full' },

  { path: 'servidores', component: ServidorListComponent },
  { path: 'servidores/nuevo', component: ServidorFormComponent },
  { path: 'servidores/:id', component: ServidorDetailComponent },
  { path: 'servidores/:id/editar', component: ServidorFormComponent },

  { path: 'incidencias', component: IncidenciaListComponent },
  { path: 'incidencias/nuevo', component: IncidenciaFormComponent },
  { path: 'incidencias/:id/editar', component: IncidenciaFormComponent },

  { path: 'mantenimientos', component: MantenimientoListComponent },
  { path: 'mantenimientos/nuevo', component: MantenimientoFormComponent },
  { path: 'mantenimientos/:id/editar', component: MantenimientoFormComponent },

  { path: '**', redirectTo: 'servidores' },
];
