import express from 'express'
import * as diariesServi from '../service/diariesServi'
import { Materias, Carrera, Posicion, Dias, Horas, Minutos, Descripcion, Mes, NewDiaryEntry } from '../types'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diariesServi.getEntrisWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const diary = diariesServi.findById(+req.params.id)
  if (diary != null) {
    res.send(diary)
  }
  res.status(404).send('Diary not found')
})

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDaiaryEntry(req.body)
    const addDiaryEntry = diariesServi.addDiary(newDiaryEntry)
    res.json(addDiaryEntry)
  } catch (e) {
    res.status(400).send('malformed data')
  }
})

export default router

const parseComent = (comemtFromRequest: any): Carrera => {
  if (!isString(comemtFromRequest) || !isCarrera(comemtFromRequest)) {
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

const parseHoras = (comemtFromRequest: any): Horas => {
  if (isString(comemtFromRequest) && !isHoras(comemtFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }
  return comemtFromRequest
}

const parseMinutos = (comemtFromRequest: any): Minutos => {
  if (isString(comemtFromRequest) && !isMinutos(comemtFromRequest)) {
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
  return Object.values(Carrera).includes(params)
}

const isDias = (params: any): boolean => {
  return Object.values(Carrera).includes(params)
}

const isMes = (params: any): boolean => {
  return Object.values(Carrera).includes(params)
}

const isHoras = (params: any): boolean => {
  return Object.values(Carrera).includes(params)
}

const isMinutos = (params: any): boolean => {
  return Object.values(Carrera).includes(params)
}

const isDescripcion = (params: any): boolean => {
  return Object.values(Carrera).includes(params)
}

const isPosicion = (params: any): boolean => {
  return Object.values(Carrera).includes(params)
}

const isString = (string: String): boolean => {
  return typeof string === 'string'
}

const toNewDaiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
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
