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

export enum Descripcion {
  MesaDeExamenFinal = 'Examen FInal',
  MesaDeExamenEspecial = 'Mesa de examen especial'
}

export enum Cargo {
  PresidenteDeMesa = 'Examinador',
  VocalDeMesa = 'Vocal de mesa',
  SuplenteDeMesa = 'Examinador suplente'
}

export interface DiaryEntry {
  id: number
  profesor: Profesor
  vocal: Profesor
  carrera: Carrera
  materia: Materia
  fecha: Date
  descripcion: Descripcion
  cargo: Cargo
  verification: boolean
  createdAt: Date
}

export interface Notification {
  id: number
  profesor: Profesor
  vocal: Profesor
  mensage: String
  fechaMesa: Date
  materia: Materia
  carrera: Carrera
  cargo: Cargo
  leido: boolean
  createAt: Date
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
export type NoSensitiveInfoDiaryEntry = Omit<DiaryEntry, 'id' | 'verification'>
export type NewNotification = Omit<Notification, 'id'>
export type NoSensitiveInfoNotification = Omit<Notification, 'id' | 'leido'>
