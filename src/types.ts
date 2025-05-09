export enum Profesor {
  Gilda = 'Gilda Romero',
  Jose = 'jose Fernandez'
}

export enum Carrera {
  IngenieriaEnSistemas = 'Ingeniería en Sistemas',
  Arquitectura = 'Arquitectura',
  Nutricion = 'Licenciatura de nutricion'
}

export enum Materia {
  AnalisisMatematico = 'Analisis Matematico',
  ProgramacionEstructurada = 'Programacion Estructurada',
  Fisica = 'Fisica',
  DerechoCivil = 'Derecho Civil',
  Quimica = 'Quimica',
}

export enum Dia {
  Lunes = 'Lunes',
  Martes = 'Martes',
  Miercoles = 'Miercoles',
  Jueves = 'Jueves',
  Viernes = 'Viernes'
}

export enum Descripcion {
  MesaDeExamenFinal = 'Examen FInal',
  MesaDeExamenEspecial = 'Mesa de examen especial'
}

export enum Posicion {
  PresidenteDeMesa = 'Examinador',
  VocalDeMesa = 'Vocal de mesa',
  SuplenteDeMesa = 'Examinador suplente'
}

export interface DiaryEntry {
  id: number
  profesor: Profesor
  carrera: Carrera
  materia: Materia
  dia: Dia
  fecha: Date
  descripcion: Descripcion
  cargo: Posicion
  verification: boolean
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
export type NoSensitiveInfoDiaryEntry = Omit<DiaryEntry, 'id' | 'verification'>
