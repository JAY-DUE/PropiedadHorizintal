import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Multa, MultaRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class MultaRepository extends DefaultCrudRepository<
  Multa,
  typeof Multa.prototype.id,
  MultaRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Multa.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Multa, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
