import { Profesor, Carrera, Descripcion, Dias, Materias, Mes, NewDiaryEntry, Posicion } from './types'

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

const parseMaterias = (comemtFromRequest: any): Materias => {
  if (!isString(comemtFromRequest) || !isMaterias(comemtFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }
  return comemtFromRequest
}

const parseDias = (comemtFromRequest: any): Dias => {
  if (!isString(comemtFromRequest) || !isDias(comemtFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }
  return comemtFromRequest
}

const parseMes = (comemtFromRequest: any): Mes => {
  if (!isString(comemtFromRequest) || !isMes(comemtFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }
  return comemtFromRequest
}

const parseHoras = (comemtFromRequest: any): number => {
  if (isString(comemtFromRequest) && isNumber(comemtFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }
  return comemtFromRequest
}

const parseMinutos = (comemtFromRequest: any): number => {
  if (isString(comemtFromRequest) && isNumber(comemtFromRequest)) {
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
  return Object.values(Materias).includes(params)
}

const isProfesor = (params: any): boolean => {
  return Object.values(Profesor).includes(params)
}

const isDias = (params: any): boolean => {
  return Object.values(Dias).includes(params)
}

const isMes = (params: any): boolean => {
  return Object.values(Mes).includes(params)
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

const isNumber = (number: number): boolean => {
  return typeof number === 'number'
}

export const toNewDaiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    profesor: parseProfesor(object.profesor),
    carrera: parseComent(object.carrera),
    materias: parseMaterias(object.materias),
    dias: parseDias(object.dias),
    mes: parseMes(object.mes),
    horas: parseHoras(object.horas),
    minutos: parseMinutos(object.minutos),
    descripcion: parseDescripcion(object.descripcion),
    posicion: parsePosicion(object.posicion)
  }
  return newEntry
}
