export type Horas = 9 | 10 | 12 | 13 | 14 | 15
export type Minutos = 0 | 30

export enum Carrera {
  IngenieriaEnSistemas = 'Ingeniería en Sistemas',
  Arquitectura = 'Arquitectura',
  Contaduria = 'Contaduría',
  Psicologia = 'Psicología',
  Abogacia = 'Abogacía'
}

export enum Materias {
  AnalisisMatematico = 'Analisis Matematico',
  ProgramacionEstructurada = 'Programacion Estructurada',
  Fisica = 'Fisica',
  DerechoCivil = 'Derecho Civil',
  Pedagogica = 'Pedagogica',
  Quimica = 'Quimica',
  ImpuestosI = 'Impuestos I'
}

export enum Dias {
  Lunes = 'Lunes',
  Martes = 'Martes',
  Miercoles = 'Miercoles',
  Jueves = 'Jueves',
  Viernes = 'Viernes'
}

export enum Mes {
  Febrero = 'Febrero',
  Abril = 'Abril',
  Junio = 'Junio',
  Diciembre = 'Diciembre'
}

export enum Descripcion {
  MesaDeExamenFinal = 'mesa de examen final',
  MesaDeExamenEspecial = 'mesa de examen especial'
}

export enum Posicion {
  PresidenteDeMesa = 'presidente de mesa',
  VocalDeMesa = 'vocal de mesa',
  SuplenteDeMesa = 'suplente de mesa'
}

export interface DiaryEntry {
  id: number
  carrera: Carrera
  materias: Materias
  dias: Dias
  mes: Mes
  horas: Horas
  minutos: Minutos
  descripcion: Descripcion
  posicion: Posicion
}

export type NoSensitiveInfoDiaryEntry = pick<DiaryEntry, 'mes' | 'dias' | 'horas' | 'minutos' | 'descripcion' | 'posicion'>

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
