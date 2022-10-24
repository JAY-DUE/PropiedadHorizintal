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
import {ZonaSocial} from '../models';
import {ZonaSocialRepository} from '../repositories';

export class ZonasocialController {
  constructor(
    @repository(ZonaSocialRepository)
    public zonaSocialRepository : ZonaSocialRepository,
  ) {}

  @post('/zona-socials')
  @response(200, {
    description: 'ZonaSocial model instance',
    content: {'application/json': {schema: getModelSchemaRef(ZonaSocial)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ZonaSocial, {
            title: 'NewZonaSocial',
            exclude: ['id'],
          }),
        },
      },
    })
    zonaSocial: Omit<ZonaSocial, 'id'>,
  ): Promise<ZonaSocial> {
    return this.zonaSocialRepository.create(zonaSocial);
  }

  @get('/zona-socials/count')
  @response(200, {
    description: 'ZonaSocial model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ZonaSocial) where?: Where<ZonaSocial>,
  ): Promise<Count> {
    return this.zonaSocialRepository.count(where);
  }

  @get('/zona-socials')
  @response(200, {
    description: 'Array of ZonaSocial model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ZonaSocial, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ZonaSocial) filter?: Filter<ZonaSocial>,
  ): Promise<ZonaSocial[]> {
    return this.zonaSocialRepository.find(filter);
  }

  @patch('/zona-socials')
  @response(200, {
    description: 'ZonaSocial PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ZonaSocial, {partial: true}),
        },
      },
    })
    zonaSocial: ZonaSocial,
    @param.where(ZonaSocial) where?: Where<ZonaSocial>,
  ): Promise<Count> {
    return this.zonaSocialRepository.updateAll(zonaSocial, where);
  }

  @get('/zona-socials/{id}')
  @response(200, {
    description: 'ZonaSocial model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ZonaSocial, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ZonaSocial, {exclude: 'where'}) filter?: FilterExcludingWhere<ZonaSocial>
  ): Promise<ZonaSocial> {
    return this.zonaSocialRepository.findById(id, filter);
  }

  @patch('/zona-socials/{id}')
  @response(204, {
    description: 'ZonaSocial PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ZonaSocial, {partial: true}),
        },
      },
    })
    zonaSocial: ZonaSocial,
  ): Promise<void> {
    await this.zonaSocialRepository.updateById(id, zonaSocial);
  }

  @put('/zona-socials/{id}')
  @response(204, {
    description: 'ZonaSocial PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() zonaSocial: ZonaSocial,
  ): Promise<void> {
    await this.zonaSocialRepository.replaceById(id, zonaSocial);
  }

  @del('/zona-socials/{id}')
  @response(204, {
    description: 'ZonaSocial DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.zonaSocialRepository.deleteById(id);
  }
}
