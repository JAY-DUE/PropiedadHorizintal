import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Inmueble} from './inmueble.model';
import {Multa} from './multa.model';
import {Conjunt} from './conjunt.model';
import {Parqueadero} from './parqueadero.model';
import {Rol} from './rol.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  PrimerNombre: string;

  @property({
    type: 'string',
    required: true,
  })
  SegundoNombre: string;

  @property({
    type: 'string',
    required: true,
  })
  PrimerApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  SegundoApellido: string;

  @property({
    type: 'string',
    required: true,
  })
  Correo: string;

  @property({
    type: 'string',
    required: true,
  })
  Contra: string;

  @property({
    type: 'string',
    required: true,
  })
  Celular: string;

  @hasMany(() => Inmueble)
  inmuebles: Inmueble[];

  @hasMany(() => Multa)
  y: Multa[];

  @belongsTo(() => Conjunt)
  conjuntId: string;

  @hasMany(() => Parqueadero)
  parqueaderos: Parqueadero[];

  @belongsTo(() => Rol)
  rolId: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
