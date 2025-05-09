import { Profesor, Carrera, Descripcion, Dia, Materia, Fecha, NewDiaryEntry, Posicion } from './types'

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

const parseDias = (comemtFromRequest: any): Dia => {
  if (!isString(comemtFromRequest) || !isDias(comemtFromRequest)) {
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

const parsePosicion = (comemtFromRequest: any): Posicion => {
  if (!isString(comemtFromRequest) || !isPosicion(comemtFromRequest)) {
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

const isDias = (params: any): boolean => {
  return Object.values(Dia).includes(params)
}

const isDescripcion = (params: any): boolean => {
  return Object.values(Descripcion).includes(params)
}

const isPosicion = (params: any): boolean => {
  return Object.values(Posicion).includes(params)
}

const isString = (string: String): boolean => {
  return typeof string === 'string'
}

export const toNewDaiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    profesor: parseProfesor(object.profesor),
    carrera: parseComent(object.carrera),
    materia: parseMaterias(object.materias),
    dia: parseDias(object.dias),
    descripcion: parseDescripcion(object.descripcion),
    posicion: parsePosicion(object.posicion)
  }
  return newEntry
}
