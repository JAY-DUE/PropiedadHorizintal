import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modulos/seguridad/general/login/login.component';
import { RecuperarPassComponent } from './modulos/seguridad/general/recuperar-pass/recuperar-pass.component';
import { CrearUserComponent } from './modulos/seguridad/general/crear-user/crear-user.component';
import { EditarUserComponent } from './modulos/seguridad/general/editar-user/editar-user.component';
import { ConsultarUserComponent } from './modulos/seguridad/general/consultar-user/consultar-user.component';
import { EliminarUserComponent } from './modulos/seguridad/general/eliminar-user/eliminar-user.component';
import { HeaderComponent } from './public/header/header.component';
import { NavbarComponent } from './public/navbar/navbar.component';
import { FooterComponent } from './public/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecuperarPassComponent,
    CrearUserComponent,
    EditarUserComponent,
    ConsultarUserComponent,
    EliminarUserComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
