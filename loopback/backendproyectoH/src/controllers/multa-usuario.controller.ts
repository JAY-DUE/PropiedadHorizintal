import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Multa,
  Usuario,
} from '../models';
import {MultaRepository} from '../repositories';

export class MultaUsuarioController {
  constructor(
    @repository(MultaRepository)
    public multaRepository: MultaRepository,
  ) { }

  @get('/multas/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Multa',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Multa.prototype.id,
  ): Promise<Usuario> {
    return this.multaRepository.usuario(id);
  }
}
