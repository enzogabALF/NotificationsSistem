import { DiaryEntry, NewDiaryEntry, NoSensitiveInfoDiaryEntry } from '../interfaces/Interface'
import diaryData from './diaries.json'

const toNewDiaryEntry = (entry: any): DiaryEntry => {
  return {
    id: entry.id,
    profesor: entry.profesor,
    vocal: entry.vocal,
    carrera: entry.carrera,
    materia: entry.materia,
    fecha: entry.fecha,
    descripcion: entry.descripcion,
    cargo: entry.cargo,
    verification: entry.verification,
    createdAt: entry.createdAt
  }
}

const diaries: DiaryEntry[] = diaryData.map((entry: any) => toNewDiaryEntry(entry))

export const getEntries = (): DiaryEntry[] => diaries

export const findById = (id: number): DiaryEntry | undefined => {
  return diaries.find(d => d.id === id)
}

export const getEntrisWithoutSensitiveInfo = (): NoSensitiveInfoDiaryEntry[] => {
  return diaries.map(({ id, verification, ...rest }) => rest)
}

export const addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...newDiaryEntry
  }
  diaries.push(newDiary)
  return newDiary
}

export const updateVerification = (id: number, verification: boolean): DiaryEntry | null => {
  const diary = diaries.find(d => d.id === id)
  if (!diary) return null
  diary.verification = verification
  return diary
}

export const updateDiaryEntry = (id: number, updatedEntry: NewDiaryEntry): DiaryEntry | null => {
  const index = diaries.findIndex(d => d.id === id)
  if (index === -1) return null
  
  const updatedDiary = {
    ...diaries[index],
    ...updatedEntry,
    id // Mantener el mismo ID
  }
  diaries[index] = updatedDiary
  return updatedDiary
}