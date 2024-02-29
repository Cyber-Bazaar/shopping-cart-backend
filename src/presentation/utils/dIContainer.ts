// no need to assign it to a variable since it extends the global scope.
import "reflect-metadata";

//Defining a unique key that will be used to store and retrieve metadata.
const INJECTABLE_METADATA_KEY = Symbol("Injectable");
const INJECT_METADATA_KEY = Symbol("Inject");

// The Injectable decorator function
export function Injectable() {
  return function (constructor: Function) {
    Reflect.defineMetadata(INJECTABLE_METADATA_KEY, true, constructor);
  };
}

// The Inject decorator function
export function Inject(serviceIdentifier: string): ParameterDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) {
    let existingInjectedServices: Array<{ index: number; identifier: string }> =
      Reflect.getMetadata(INJECT_METADATA_KEY, target) || [];
    existingInjectedServices.push({
      index: parameterIndex,
      identifier: serviceIdentifier,
    });
    Reflect.defineMetadata(
      INJECT_METADATA_KEY,
      existingInjectedServices,
      target
    );
  } as ParameterDecorator;
}

// The DI Container
export class DIContainer {
  private services = new Map();

  register(identifier: string, clazz: any) {
    this.services.set(identifier, clazz);
  }

  resolve<T>(identifier: string): T {
    const clazz = this.services.get(identifier);
    if (!clazz) {
      throw new Error(`Service ${identifier} not found`);
    }

    const injectedServices =
      Reflect.getMetadata(INJECT_METADATA_KEY, clazz) || [];
    const resolvedParams = injectedServices.map(
      (service: { identifier: string }) => this.resolve(service.identifier)
    );

    return new clazz(...resolvedParams); // new Controller(new Service(new Repository())
  }
}
