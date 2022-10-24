import {Entity, model, property} from '@loopback/repository';

@model()
export class ZonaSocial extends Entity {
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
  Nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  Imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  Descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  HorarioUso: string;

  @property({
    type: 'number',
    required: true,
  })
  Costo: number;


  constructor(data?: Partial<ZonaSocial>) {
    super(data);
  }
}

export interface ZonaSocialRelations {
  // describe navigational properties here
}

export type ZonaSocialWithRelations = ZonaSocial & ZonaSocialRelations;
