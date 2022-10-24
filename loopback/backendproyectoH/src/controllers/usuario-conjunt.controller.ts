import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  Conjunt,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioConjuntController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/conjunt', {
    responses: {
      '200': {
        description: 'Conjunt belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conjunt)},
          },
        },
      },
    },
  })
  async getConjunt(
    @param.path.string('id') id: typeof Usuario.prototype.id,
  ): Promise<Conjunt> {
    return this.usuarioRepository.conjunt(id);
  }
}
