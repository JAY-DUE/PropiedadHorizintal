import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Multa extends Entity {
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
  Usuario: string;

  @property({
    type: 'number',
    required: true,
  })
  DatoMulta: number;

  @property({
    type: 'number',
    required: true,
  })
  Cantidad?: number;

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<Multa>) {
    super(data);
  }
}

export interface MultaRelations {
  // describe navigational properties here
}

export type MultaWithRelations = Multa & MultaRelations;
