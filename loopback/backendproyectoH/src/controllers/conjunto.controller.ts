import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Conjunt} from '../models';
import {ConjuntRepository} from '../repositories';

export class ConjuntoController {
  constructor(
    @repository(ConjuntRepository)
    public conjuntRepository : ConjuntRepository,
  ) {}

  @post('/conjunts')
  @response(200, {
    description: 'Conjunt model instance',
    content: {'application/json': {schema: getModelSchemaRef(Conjunt)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conjunt, {
            title: 'NewConjunt',
            exclude: ['id'],
          }),
        },
      },
    })
    conjunt: Omit<Conjunt, 'id'>,
  ): Promise<Conjunt> {
    return this.conjuntRepository.create(conjunt);
  }

  @get('/conjunts/count')
  @response(200, {
    description: 'Conjunt model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Conjunt) where?: Where<Conjunt>,
  ): Promise<Count> {
    return this.conjuntRepository.count(where);
  }

  @get('/conjunts')
  @response(200, {
    description: 'Array of Conjunt model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Conjunt, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Conjunt) filter?: Filter<Conjunt>,
  ): Promise<Conjunt[]> {
    return this.conjuntRepository.find(filter);
  }

  @patch('/conjunts')
  @response(200, {
    description: 'Conjunt PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conjunt, {partial: true}),
        },
      },
    })
    conjunt: Conjunt,
    @param.where(Conjunt) where?: Where<Conjunt>,
  ): Promise<Count> {
    return this.conjuntRepository.updateAll(conjunt, where);
  }

  @get('/conjunts/{id}')
  @response(200, {
    description: 'Conjunt model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Conjunt, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Conjunt, {exclude: 'where'}) filter?: FilterExcludingWhere<Conjunt>
  ): Promise<Conjunt> {
    return this.conjuntRepository.findById(id, filter);
  }

  @patch('/conjunts/{id}')
  @response(204, {
    description: 'Conjunt PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conjunt, {partial: true}),
        },
      },
    })
    conjunt: Conjunt,
  ): Promise<void> {
    await this.conjuntRepository.updateById(id, conjunt);
  }

  @put('/conjunts/{id}')
  @response(204, {
    description: 'Conjunt PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() conjunt: Conjunt,
  ): Promise<void> {
    await this.conjuntRepository.replaceById(id, conjunt);
  }

  @del('/conjunts/{id}')
  @response(204, {
    description: 'Conjunt DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.conjuntRepository.deleteById(id);
  }
}
