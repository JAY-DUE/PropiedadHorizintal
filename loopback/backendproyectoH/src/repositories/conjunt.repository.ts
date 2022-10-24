import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Conjunt, ConjuntRelations, Usuario, Parqueadero, Torre, ZonaSocial} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {ParqueaderoRepository} from './parqueadero.repository';
import {TorreRepository} from './torre.repository';
import {ZonaSocialRepository} from './zona-social.repository';

export class ConjuntRepository extends DefaultCrudRepository<
  Conjunt,
  typeof Conjunt.prototype.id,
  ConjuntRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Conjunt.prototype.id>;

  public readonly parqueaderos: HasManyRepositoryFactory<Parqueadero, typeof Conjunt.prototype.id>;

  public readonly torres: HasManyRepositoryFactory<Torre, typeof Conjunt.prototype.id>;

  public readonly zonaSocial: BelongsToAccessor<ZonaSocial, typeof Conjunt.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('ParqueaderoRepository') protected parqueaderoRepositoryGetter: Getter<ParqueaderoRepository>, @repository.getter('TorreRepository') protected torreRepositoryGetter: Getter<TorreRepository>, @repository.getter('ZonaSocialRepository') protected zonaSocialRepositoryGetter: Getter<ZonaSocialRepository>,
  ) {
    super(Conjunt, dataSource);
    this.zonaSocial = this.createBelongsToAccessorFor('zonaSocial', zonaSocialRepositoryGetter,);
    this.registerInclusionResolver('zonaSocial', this.zonaSocial.inclusionResolver);
    this.torres = this.createHasManyRepositoryFactoryFor('torres', torreRepositoryGetter,);
    this.registerInclusionResolver('torres', this.torres.inclusionResolver);
    this.parqueaderos = this.createHasManyRepositoryFactoryFor('parqueaderos', parqueaderoRepositoryGetter,);
    this.registerInclusionResolver('parqueaderos', this.parqueaderos.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
