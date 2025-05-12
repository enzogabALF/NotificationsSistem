import {
  ProfesorValidationHandler,
  CarreraValidationHandler,
  MateriaValidationHandler,
  DateValidationHandler,
  BooleanValidationHandler
} from '../service/Chain'
import { NewDiaryEntry, NewNotification, DiaryEntry, Notification } from '../interfaces/Interface'

export const toNewDaiaryEntry = (object: any): NewDiaryEntry => {
  // Configurar la cadena de validación
  const profesorHandler = new ProfesorValidationHandler()
  const carreraHandler = new CarreraValidationHandler()
  const materiaHandler = new MateriaValidationHandler()
  const dateHandler = new DateValidationHandler()
  const booleanHandler = new BooleanValidationHandler()

  profesorHandler
    .setNext(carreraHandler)
    .setNext(materiaHandler)
    .setNext(dateHandler)
    .setNext(booleanHandler)

  // Ejecutar la validación
  profesorHandler.handle(object)

  // Si pasa todas las validaciones, crear el objeto NewDiaryEntry
  const newEntry: NewDiaryEntry = {
    profesor: object.profesor,
    vocal: object.vocal,
    carrera: object.carrera,
    materia: object.materia,
    fecha: object.fecha,
    descripcion: object.descripcion,
    cargo: object.cargo,
    verification: object.verification,
    createdAt: object.createdAt
  }

  return newEntry
}

export const toNewNotification = (object: any): NewNotification => {
  // Configurar la cadena de validación
  const profesorHandler = new ProfesorValidationHandler()
  const carreraHandler = new CarreraValidationHandler()
  const materiaHandler = new MateriaValidationHandler()
  const dateHandler = new DateValidationHandler()
  const booleanHandler = new BooleanValidationHandler()
  profesorHandler
    .setNext(carreraHandler)
    .setNext(materiaHandler)
    .setNext(dateHandler)
    .setNext(booleanHandler)

  // Ejecutar la validación
  profesorHandler.handle(object)

  // Si pasa todas las validaciones, crear el objeto NewNotification
  const newNotification: NewNotification = {
    profesor: object.profesor,
    vocal: object.vocal,
    mensage: object.mensage,
    fechaMesa: object.fechaMesa,
    materia: object.materia,
    carrera: object.carrera,
    cargo: object.cargo,
    leido: object.leido,
    createAt: object.createdAt
  }

  return newNotification
}

export const diaryEntryToNotification = (diaryEntry: DiaryEntry): Notification => {
  // Ensure diaryEntry.materia has a valid type
  const notification: Notification = {
    id: diaryEntry.id, // Usa el mismo ID del DiaryEntry
    profesor: diaryEntry.profesor,
    vocal: diaryEntry.profesor,
    mensage: `Nueva notificación para la materia ${diaryEntry.materia as string}`,
    fechaMesa: diaryEntry.fecha,
    materia: diaryEntry.materia,
    carrera: diaryEntry.carrera,
    cargo: diaryEntry.cargo,
    leido: false, // Por defecto, las notificaciones no están leídas
    createAt: new Date() // Fecha de creación de la notificación
  }

  return notification
}
