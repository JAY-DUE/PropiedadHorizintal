import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { keys } from '../config/key';
import { Credenciales, Usuario } from '../models';
import { UsuarioRepository } from '../repositories';
const generador=require("generate-password");
const crypoJS=require("crypto-js");
const JWT= require("jsonwebtoken");


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(@repository (UsuarioRepository)
  public repositorioUsuario: UsuarioRepository
 
    ) {}

   GenerarPassword(): any
   {
    let password = generador.generate({
      length: 8,
      Numbers:true,
    })
    return password;
   }

   EncriptarPassword(password:string){
    let passwordE=crypoJS.MD5(password);
    return passwordE;

   }
  // de aqui abajo es el token
   IdentificarUsuario(credenciales:Credenciales){
   try{
    let p= this.repositorioUsuario.findOne({
      where:{Correo:credenciales.usuario,clave:crendeciales.password}
    });
    if (p){
      return p;
     }
     return false;

     }catch {
      return false;

     }
   }

   GeneracionToken(usuario:Usuario){
    let token = JWT.sing({
      data:{
        id:usuario.id,
        correo: usuario.Correo,
        nombre:usuario.nombre+" "+usuario.apellidos
      }

    }, keys.claveJWT
    )
     return token;
   }

   ValidarToken(token:string){
    try{
      let  datos =JWT.verify(token,Keys.claveJWT);
      return datos;

    }catch{
      return false;
    }
   }
}
