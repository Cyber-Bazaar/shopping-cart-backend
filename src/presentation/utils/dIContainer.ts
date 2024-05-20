//to store and retrieve metadata
//Metadata is used to store additional information about the classes and their dependencies.
//no need to assign it to a variable since it extends the global scope.
import "reflect-metadata";

//Defining a unique key that will be used to store and retrieve metadata.

//The @Injectable() decorator is used to mark a class as available to be provided and injected as a dependency
const INJECTABLE_METADATA_KEY = Symbol("Injectable");
//decorator is used to define the dependencies that should be injected into a class's constructor when the dependency injector is creating an instance of the class.
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
      existingInjectedServices.reverse(),
      target
    );
  } as ParameterDecorator;
}

// The DI Container
export class DIContainer {
  private static instance: DIContainer;
  private services = new Map<string, { clazz: any; instance: any }>();

  register<T>(identifier: string, clazz: new (...args: any[]) => T): void {
    this.services.set(identifier, { clazz, instance: null });
  }

  resolve<T>(identifier: string): T {
    const service = this.services.get(identifier);
    if (!service) {
      throw new Error(`Service ${identifier} not found`);
    }

    if (service.instance) {
      return service.instance;
    }

    const injectedServices =
      Reflect.getMetadata(INJECT_METADATA_KEY, service.clazz) || [];
    const resolvedParams = injectedServices.map(
      (service: { identifier: string }) => this.resolve(service.identifier)
    );
    service.instance = new service.clazz(...resolvedParams);
    return service.instance;
  }
  public static getInstance() {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }
}
