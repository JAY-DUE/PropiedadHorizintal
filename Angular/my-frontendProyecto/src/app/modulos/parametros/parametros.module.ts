import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { CrearClientesComponent } from './Clientes/crear-clientes/crear-clientes.component';


@NgModule({
  declarations: [
    CrearClientesComponent
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule
  ]
})
export class ParametrosModule { }
