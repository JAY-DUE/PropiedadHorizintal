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
  Multa,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioMultaController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/multas', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Multa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Multa)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Multa>,
  ): Promise<Multa[]> {
    return this.usuarioRepository.y(id).find(filter);
  }

  @post('/usuarios/{id}/multas', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Multa)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Multa, {
            title: 'NewMultaInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) multa: Omit<Multa, 'id'>,
  ): Promise<Multa> {
    return this.usuarioRepository.y(id).create(multa);
  }

  @patch('/usuarios/{id}/multas', {
    responses: {
      '200': {
        description: 'Usuario.Multa PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Multa, {partial: true}),
        },
      },
    })
    multa: Partial<Multa>,
    @param.query.object('where', getWhereSchemaFor(Multa)) where?: Where<Multa>,
  ): Promise<Count> {
    return this.usuarioRepository.y(id).patch(multa, where);
  }

  @del('/usuarios/{id}/multas', {
    responses: {
      '200': {
        description: 'Usuario.Multa DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Multa)) where?: Where<Multa>,
  ): Promise<Count> {
    return this.usuarioRepository.y(id).delete(where);
  }
}
