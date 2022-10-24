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
  Conjunt,
  Torre,
} from '../models';
import {ConjuntRepository} from '../repositories';

export class ConjuntTorreController {
  constructor(
    @repository(ConjuntRepository) protected conjuntRepository: ConjuntRepository,
  ) { }

  @get('/conjunts/{id}/torres', {
    responses: {
      '200': {
        description: 'Array of Conjunt has many Torre',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Torre)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Torre>,
  ): Promise<Torre[]> {
    return this.conjuntRepository.torres(id).find(filter);
  }

  @post('/conjunts/{id}/torres', {
    responses: {
      '200': {
        description: 'Conjunt model instance',
        content: {'application/json': {schema: getModelSchemaRef(Torre)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Conjunt.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torre, {
            title: 'NewTorreInConjunt',
            exclude: ['id'],
            optional: ['conjuntId']
          }),
        },
      },
    }) torre: Omit<Torre, 'id'>,
  ): Promise<Torre> {
    return this.conjuntRepository.torres(id).create(torre);
  }

  @patch('/conjunts/{id}/torres', {
    responses: {
      '200': {
        description: 'Conjunt.Torre PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torre, {partial: true}),
        },
      },
    })
    torre: Partial<Torre>,
    @param.query.object('where', getWhereSchemaFor(Torre)) where?: Where<Torre>,
  ): Promise<Count> {
    return this.conjuntRepository.torres(id).patch(torre, where);
  }

  @del('/conjunts/{id}/torres', {
    responses: {
      '200': {
        description: 'Conjunt.Torre DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Torre)) where?: Where<Torre>,
  ): Promise<Count> {
    return this.conjuntRepository.torres(id).delete(where);
  }
}
