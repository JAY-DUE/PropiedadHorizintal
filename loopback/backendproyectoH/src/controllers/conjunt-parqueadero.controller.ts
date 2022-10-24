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
  Parqueadero,
} from '../models';
import {ConjuntRepository} from '../repositories';

export class ConjuntParqueaderoController {
  constructor(
    @repository(ConjuntRepository) protected conjuntRepository: ConjuntRepository,
  ) { }

  @get('/conjunts/{id}/parqueaderos', {
    responses: {
      '200': {
        description: 'Array of Conjunt has many Parqueadero',
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
    return this.conjuntRepository.parqueaderos(id).find(filter);
  }

  @post('/conjunts/{id}/parqueaderos', {
    responses: {
      '200': {
        description: 'Conjunt model instance',
        content: {'application/json': {schema: getModelSchemaRef(Parqueadero)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Conjunt.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parqueadero, {
            title: 'NewParqueaderoInConjunt',
            exclude: ['id'],
            optional: ['conjuntId']
          }),
        },
      },
    }) parqueadero: Omit<Parqueadero, 'id'>,
  ): Promise<Parqueadero> {
    return this.conjuntRepository.parqueaderos(id).create(parqueadero);
  }

  @patch('/conjunts/{id}/parqueaderos', {
    responses: {
      '200': {
        description: 'Conjunt.Parqueadero PATCH success count',
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
    return this.conjuntRepository.parqueaderos(id).patch(parqueadero, where);
  }

  @del('/conjunts/{id}/parqueaderos', {
    responses: {
      '200': {
        description: 'Conjunt.Parqueadero DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Parqueadero)) where?: Where<Parqueadero>,
  ): Promise<Count> {
    return this.conjuntRepository.parqueaderos(id).delete(where);
  }
}
