import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Parqueadero} from './parqueadero.model';
import {Torre} from './torre.model';
import {ZonaSocial} from './zona-social.model';

@model()
export class Conjunt extends Entity {
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
  NombreConjunto: string;

  @property({
    type: 'string',
    required: true,
  })
  NombreAdministrador: string;

  @property({
    type: 'number',
    required: true,
  })
  PresupuestoActual: number;

  @property({
    type: 'string',
    required: true,
  })
  Nit: string;

  @property({
    type: 'string',
    required: true,
  })
  CuentaBanco: string;

  @property({
    type: 'number',
    required: true,
  })
  Factura: number;

  @property({
    type: 'number',
    required: true,
  })
  InteresesMora: number;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasMany(() => Parqueadero)
  parqueaderos: Parqueadero[];

  @hasMany(() => Torre)
  torres: Torre[];

  @belongsTo(() => ZonaSocial)
  zonaSocialId: string;

  constructor(data?: Partial<Conjunt>) {
    super(data);
  }
}

export interface ConjuntRelations {
  // describe navigational properties here
}

export type ConjuntWithRelations = Conjunt & ConjuntRelations;
