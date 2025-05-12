import { Carrera, Materia, Profesor } from '../interfaces/Interface'

interface Handler {
  setNext: (handler: Handler) => Handler
  handle: (request: any) => any
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null

  public setNext (handler: Handler): Handler {
    this.nextHandler = handler
    return handler
  }

  public handle (request: any): any {
    if (this.nextHandler !== null) {
      return this.nextHandler.handle(request)
    }
    return null
  }
}

// Validación de profesor
class ProfesorValidationHandler extends AbstractHandler {
  public handle (request: any): any {
    if (!Object.values(Profesor).includes(request.profesor)) {
      throw new Error('Invalid or missing profesor')
    }
    return super.handle(request)
  }
}

// Validación de carrera
class CarreraValidationHandler extends AbstractHandler {
  public handle (request: any): any {
    if (!Object.values(Carrera).includes(request.carrera)) {
      throw new Error('Invalid or missing carrera')
    }
    return super.handle(request)
  }
}

// Validación de materia
class MateriaValidationHandler extends AbstractHandler {
  public handle (request: any): any {
    if (!Object.values(Materia).includes(request.materia)) {
      throw new Error('Invalid or missing materia')
    }
    return super.handle(request)
  }
}

// Validación de fecha
class DateValidationHandler extends AbstractHandler {
  public handle (request: any): any {
    if (!(request.fecha instanceof Date) || isNaN(request.fecha.getTime())) {
      throw new Error('Invalid or missing fecha')
    }
    return super.handle(request)
  }
}

// Validación de booleano
class BooleanValidationHandler extends AbstractHandler {
  public handle (request: any): any {
    if (typeof request.verification !== 'boolean') {
      throw new Error('Invalid or missing verification')
    }
    return super.handle(request)
  }
}

export {
  ProfesorValidationHandler,
  CarreraValidationHandler,
  MateriaValidationHandler,
  DateValidationHandler,
  BooleanValidationHandler
}
