import { DiaryEntry, NewDiaryEntry, NoSensitiveInfoDiaryEntry } from '../types'
import diaryData from './diaries.json'

const diaries: DiaryEntry[] = diaryData as DiaryEntry[]

export const getEntries = (): DiaryEntry[] => diaries

export const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id)
  return entry
}

export const getEntrisWithoutSensitiveInfo = (): NoSensitiveInfoDiaryEntry[] => {
  return diaries.map(({ profesor, carrera, materias, dias, mes, horas, minutos, descripcion, posicion }) => {
    return {
      profesor,
      carrera,
      materias,
      dias,
      mes,
      horas,
      minutos,
      descripcion,
      posicion
    }
  })
}

export const addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: diaries.length + 1,
    ...newDiaryEntry
  }
  diaries.push(newDiary)
  return newDiary
}
