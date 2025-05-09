import { Profesor, Carrera, Descripcion, Materia, NewDiaryEntry, Cargo } from './Interface'

const parseComent = (comemtFromRequest: any): Carrera => {
  if (!isString(comemtFromRequest) || !isCarrera(comemtFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }
  return comemtFromRequest
}

const parseProfesor = (comemtFromRequest: any): Profesor => {
  if (!isString(comemtFromRequest) || !isProfesor(comemtFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }
  return comemtFromRequest
}

const parseMaterias = (comemtFromRequest: any): Materia => {
  if (!isString(comemtFromRequest) || !isMaterias(comemtFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }
  return comemtFromRequest
}

const parseDescripcion = (comemtFromRequest: any): Descripcion => {
  if (!isString(comemtFromRequest) || !isDescripcion(comemtFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }
  return comemtFromRequest
}

const parsePosicion = (comemtFromRequest: any): Cargo => {
  if (!isString(comemtFromRequest) || !isPosicion(comemtFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }
  return comemtFromRequest
}

const parseVerification = (comemtFromRequest: any): boolean => {
  if (!isBoolean(comemtFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }
  return comemtFromRequest
}

const isCarrera = (params: any): boolean => {
  return Object.values(Carrera).includes(params)
}

const isMaterias = (params: any): boolean => {
  return Object.values(Materia).includes(params)
}

const isProfesor = (params: any): boolean => {
  return Object.values(Profesor).includes(params)
}

const isDescripcion = (params: any): boolean => {
  return Object.values(Descripcion).includes(params)
}

const isPosicion = (params: any): boolean => {
  return Object.values(Cargo).includes(params)
}

const isString = (string: String): boolean => {
  return typeof string === 'string'
}
const isBoolean = (boolean: boolean): boolean => {
  return typeof boolean === 'boolean'
}

export const toNewDaiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    profesor: parseProfesor(object.profesor),
    carrera: parseComent(object.carrera),
    materia: parseMaterias(object.materias),
    fecha: new Date(object.fecha),
    descripcion: parseDescripcion(object.descripcion),
    cargo: parsePosicion(object.posicion),
    verification: parseVerification(object.verification),
    createdAt: new Date()
  }
  return newEntry
}
