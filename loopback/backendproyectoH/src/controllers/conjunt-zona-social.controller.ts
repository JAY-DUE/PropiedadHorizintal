import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Conjunt,
  ZonaSocial,
} from '../models';
import {ConjuntRepository} from '../repositories';

export class ConjuntZonaSocialController {
  constructor(
    @repository(ConjuntRepository)
    public conjuntRepository: ConjuntRepository,
  ) { }

  @get('/conjunts/{id}/zona-social', {
    responses: {
      '200': {
        description: 'ZonaSocial belonging to Conjunt',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ZonaSocial)},
          },
        },
      },
    },
  })
  async getZonaSocial(
    @param.path.string('id') id: typeof Conjunt.prototype.id,
  ): Promise<ZonaSocial> {
    return this.conjuntRepository.zonaSocial(id);
  }
}
