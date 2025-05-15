import * as diariesServi from '../src/service/diariesServi'
import { NewDiaryEntry, Profesor, Carrera, Materia, Descripcion, Cargo } from '../src/interfaces/Interface'

// Mock del archivo diaries.json
jest.mock('../src/service/diaries.json', () => [
  {
    id: 1,
    profesor: "Gilda Romero",
    vocal: "Jose Fernandez",
    carrera: "Ingeniería en Sistemas",
    materia: "Programacion Estructurada",
    fecha: "2025-05-15T10:00:00.000Z",
    descripcion: "Examen Final",
    cargo: "Examinador",
    verification: true,
    createdAt: "2025-05-10T08:00:00.000Z"
  },
  {
    id: 2,
    profesor: "Jose Fernandez",
    vocal: "Gilda Romero",
    carrera: "Arquitectura",
    materia: "Fisica",
    fecha: "2025-05-20T14:00:00.000Z",
    descripcion: "Mesa de examen especial",
    cargo: "Vocal de mesa",
    verification: false,
    createdAt: "2025-05-11T09:30:00.000Z"
  }
], { virtual: true })

describe('Diaries Service', () => {
  const mockDiaries = [
    {
      id: 1,
      profesor: Profesor.Gilda,
      vocal: Profesor.Jose,
      carrera: Carrera.IngenieriaEnSistemas,
      materia: Materia.ProgramacionEstructurada,
      fecha: new Date("2025-05-15T10:00:00.000Z"),
      descripcion: Descripcion.MesaDeExamenFinal,
      cargo: Cargo.PresidenteDeMesa,
      verification: true,
      createdAt: new Date("2025-05-10T08:00:00.000Z")
    },
    {
      id: 2,
      profesor: Profesor.Jose,
      vocal: Profesor.Gilda,
      carrera: Carrera.Arquitectura,
      materia: Materia.Fisica,
      fecha: new Date("2025-05-20T14:00:00.000Z"),
      descripcion: Descripcion.MesaDeExamenEspecial,
      cargo: Cargo.VocalDeMesa,
      verification: false,
      createdAt: new Date("2025-05-11T09:30:00.000Z")
    }
  ]

  beforeEach(() => {
    diariesServi.getEntries().length = 0
    diariesServi.getEntries().push(...mockDiaries)
  })

  describe('getEntries', () => {
    it('should return all diary entries', () => {
      const entries = diariesServi.getEntries()
      expect(entries).toHaveLength(2)
      expect(entries[0].id).toBe(1)
      expect(entries[1].id).toBe(2)
    })
  })

  describe('findById', () => {
    it('should return entry when id exists', () => {
      const entry = diariesServi.findById(1)
      expect(entry?.id).toBe(1)
      expect(entry?.profesor).toBe(Profesor.Gilda)
    })

    it('should return undefined when id does not exist', () => {
      const entry = diariesServi.findById(99)
      expect(entry).toBeUndefined()
    })
  })

  describe('getEntriesWithoutSensitiveInfo', () => {
    it('should return entries without id and verification fields', () => {
      const entries = diariesServi.getEntrisWithoutSensitiveInfo()
      
      // Verificar estructura completa
      expect(entries[0]).toEqual({
        profesor: Profesor.Gilda,
        vocal: Profesor.Jose,
        carrera: Carrera.IngenieriaEnSistemas,
        materia: Materia.ProgramacionEstructurada,
        fecha: new Date("2025-05-15T10:00:00.000Z"),
        descripcion: Descripcion.MesaDeExamenFinal,
        cargo: Cargo.PresidenteDeMesa,
        createdAt: new Date("2025-05-10T08:00:00.000Z")
      })

      // Verificación explícita de campos ausentes
      expect(entries[0]).not.toHaveProperty('id')
      expect(entries[0]).not.toHaveProperty('verification')
    })
  })

  describe('addDiary', () => {
    it('should add new entry with generated id', () => {
      const newEntry: NewDiaryEntry = {
        profesor: Profesor.Gilda,
        vocal: Profesor.Jose,
        carrera: Carrera.Nutricion,
        materia: Materia.Quimica,
        fecha: new Date("2025-06-01T10:00:00.000Z"),
        descripcion: Descripcion.MesaDeExamenFinal,
        cargo: Cargo.SuplenteDeMesa,
        verification: false,
        createdAt: new Date()
      }

      const addedEntry = diariesServi.addDiary(newEntry)
      expect(addedEntry.id).toBe(3)
      expect(addedEntry.profesor).toBe(Profesor.Gilda)
      expect(diariesServi.getEntries()).toHaveLength(3)
    })
  })

  describe('updateVerification', () => {
    it('should update verification status', () => {
      const updatedEntry = diariesServi.updateVerification(1, false)
      expect(updatedEntry?.verification).toBe(false)
      expect(diariesServi.findById(1)?.verification).toBe(false)
    })

    it('should return null for non-existent id', () => {
      const result = diariesServi.updateVerification(99, true)
      expect(result).toBeNull()
    })
  })

  describe('updateDiaryEntry', () => {
    it('should update existing entry', () => {
      const updates: NewDiaryEntry = {
        profesor: Profesor.Jose,
        vocal: Profesor.Gilda,
        carrera: Carrera.Arquitectura,
        materia: Materia.DerechoCivil,
        fecha: new Date("2025-05-25T09:00:00.000Z"),
        descripcion: Descripcion.MesaDeExamenEspecial,
        cargo: Cargo.VocalDeMesa,
        verification: true,
        createdAt: new Date()
      }

      const updatedEntry = diariesServi.updateDiaryEntry(1, updates)
      expect(updatedEntry?.materia).toBe(Materia.DerechoCivil)
      expect(updatedEntry?.profesor).toBe(Profesor.Jose)
      expect(diariesServi.findById(1)?.materia).toBe(Materia.DerechoCivil)
    })

    it('should return null for non-existent id', () => {
      const result = diariesServi.updateDiaryEntry(99, {} as NewDiaryEntry)
      expect(result).toBeNull()
    })
  })
})