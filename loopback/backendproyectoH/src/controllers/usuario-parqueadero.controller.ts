import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Parqueadero,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioParqueaderoController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/parqueaderos', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Parqueadero',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parqueadero)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Parqueadero>,
  ): Promise<Parqueadero[]> {
    return this.usuarioRepository.parqueaderos(id).find(filter);
  }

  @post('/usuarios/{id}/parqueaderos', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parqueadero)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parqueadero, {
            title: 'NewParqueaderoInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) parqueadero: Omit<Parqueadero, 'id'>,
  ): Promise<Parqueadero> {
    return this.usuarioRepository.parqueaderos(id).create(parqueadero);
  }

  @patch('/usuarios/{id}/parqueaderos', {
    responses: {
      '200': {
        description: 'Usuario.Parqueadero PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parqueadero, {partial: true}),
        },
      },
    })
    parqueadero: Partial<Parqueadero>,
    @param.query.object('where', getWhereSchemaFor(Parqueadero)) where?: Where<Parqueadero>,
  ): Promise<Count> {
    return this.usuarioRepository.parqueaderos(id).patch(parqueadero, where);
  }

  @del('/usuarios/{id}/parqueaderos', {
    responses: {
      '200': {
        description: 'Usuario.Parqueadero DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Parqueadero)) where?: Where<Parqueadero>,
  ): Promise<Count> {
    return this.usuarioRepository.parqueaderos(id).delete(where);
  }
}
