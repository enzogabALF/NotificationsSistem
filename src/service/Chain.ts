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

// Validación de fecha
class DateValidationHandler extends AbstractHandler {
  public handle (request: any): any {
    if (typeof request.fecha !== 'string' || isNaN(new Date(request.fecha).getTime())) {
      throw new Error('Fecha inválida')
    }
    return super.handle(request)
  }
}

// Validación de profesor
class ProfesorValidationHandler extends AbstractHandler {
  public handle (request: any): any {
    if (request.profesor == null) {
      throw new Error('Profesor es obligatorio')
    }
    return super.handle(request)
  }
}

// Uso de la cadena
export const validateDiaryEntry = (entry: any): void => {
  const dateHandler = new DateValidationHandler()
  const profesorHandler = new ProfesorValidationHandler()
  dateHandler.setNext(profesorHandler)
  dateHandler.handle(entry)
}
