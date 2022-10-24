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
  Usuario,
} from '../models';
import {ConjuntRepository} from '../repositories';

export class ConjuntUsuarioController {
  constructor(
    @repository(ConjuntRepository)
    public conjuntRepository: ConjuntRepository,
  ) { }

  @get('/conjunts/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Conjunt',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Conjunt.prototype.id,
  ): Promise<Usuario> {
    return this.conjuntRepository.usuario(id);
  }
}
