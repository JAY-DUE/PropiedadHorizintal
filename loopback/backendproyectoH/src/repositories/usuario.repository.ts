import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Inmueble, Multa, Conjunt, Parqueadero, Rol} from '../models';
import {InmuebleRepository} from './inmueble.repository';
import {MultaRepository} from './multa.repository';
import {ConjuntRepository} from './conjunt.repository';
import {ParqueaderoRepository} from './parqueadero.repository';
import {RolRepository} from './rol.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Usuario.prototype.id>;

  public readonly y: HasManyRepositoryFactory<Multa, typeof Usuario.prototype.id>;

  public readonly conjunt: BelongsToAccessor<Conjunt, typeof Usuario.prototype.id>;

  public readonly parqueaderos: HasManyRepositoryFactory<Parqueadero, typeof Usuario.prototype.id>;

  public readonly rol: BelongsToAccessor<Rol, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('MultaRepository') protected multaRepositoryGetter: Getter<MultaRepository>, @repository.getter('ConjuntRepository') protected conjuntRepositoryGetter: Getter<ConjuntRepository>, @repository.getter('ParqueaderoRepository') protected parqueaderoRepositoryGetter: Getter<ParqueaderoRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Usuario, dataSource);
    this.rol = this.createBelongsToAccessorFor('rol', rolRepositoryGetter,);
    this.registerInclusionResolver('rol', this.rol.inclusionResolver);
    this.parqueaderos = this.createHasManyRepositoryFactoryFor('parqueaderos', parqueaderoRepositoryGetter,);
    this.registerInclusionResolver('parqueaderos', this.parqueaderos.inclusionResolver);
    this.conjunt = this.createBelongsToAccessorFor('conjunt', conjuntRepositoryGetter,);
    this.registerInclusionResolver('conjunt', this.conjunt.inclusionResolver);
    this.y = this.createHasManyRepositoryFactoryFor('y', multaRepositoryGetter,);
    this.registerInclusionResolver('y', this.y.inclusionResolver);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
