import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Parqueadero extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  Area: number;

  @property({
    type: 'string',
    required: true,
  })
  InmuebleAsociado: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @property({
    type: 'string',
  })
  conjuntId?: string;

  constructor(data?: Partial<Parqueadero>) {
    super(data);
  }
}

export interface ParqueaderoRelations {
  // describe navigational properties here
}

export type ParqueaderoWithRelations = Parqueadero & ParqueaderoRelations;
