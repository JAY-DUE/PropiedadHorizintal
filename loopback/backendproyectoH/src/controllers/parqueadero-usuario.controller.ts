import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Parqueadero,
  Usuario,
} from '../models';
import {ParqueaderoRepository} from '../repositories';

export class ParqueaderoUsuarioController {
  constructor(
    @repository(ParqueaderoRepository)
    public parqueaderoRepository: ParqueaderoRepository,
  ) { }

  @get('/parqueaderos/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Parqueadero',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Parqueadero.prototype.id,
  ): Promise<Usuario> {
    return this.parqueaderoRepository.usuario(id);
  }
}
