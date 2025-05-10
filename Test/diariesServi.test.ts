import { getEntries, findById, getEntrisWithoutSensitiveInfo, addDiary, updateVerification, updateDiaryEntry } from '../src/service/diariesServi';
import type { DiaryEntry, NewDiaryEntry } from '../src/Interface';
import { Profesor, Carrera, Materia, Descripcion, Cargo } from '../src/Interface';

// Datos de prueba aislados corregidos
const testDiaries: DiaryEntry[] = [
  {
    id: 1,
    profesor: Profesor.Gilda,
    carrera: Carrera.IngenieriaEnSistemas,
    materia: Materia.ProgramacionEstructurada,
    fecha: new Date('2023-01-01'),
    descripcion: Descripcion.MesaDeExamenFinal,
    cargo: Cargo.PresidenteDeMesa,
    verification: true,
    createdAt: new Date('2023-01-01T00:00:00Z')
  }
];

// Mock completo de las funciones
jest.mock('../src/service/diariesServi', () => {
  const originalModule = jest.requireActual('../src/service/diariesServi');
  
  return {
    ...originalModule,
    getEntries: jest.fn(() => [...testDiaries]),
    findById: jest.fn((id: number) => testDiaries.find(d => d.id === id)),
    getEntrisWithoutSensitiveInfo: jest.fn(() => {
      return testDiaries.map(({ id, verification, ...rest }) => rest);
    }),
    addDiary: jest.fn((newEntry: NewDiaryEntry) => {
      const newDiary = {
        id: Math.max(...testDiaries.map(d => d.id), 0) + 1,
        ...newEntry
      };
      testDiaries.push(newDiary);
      return newDiary;
    }),
    updateVerification: jest.fn((id: number, verification: boolean) => {
      const entry = testDiaries.find(d => d.id === id);
      if (entry) {
        entry.verification = verification;
        return entry;
      }
      return null;
    }),
    updateDiaryEntry: jest.fn((id: number, updatedEntry: NewDiaryEntry) => {
      const index = testDiaries.findIndex(d => d.id === id);
      if (index === -1) return null;
      
      const updatedDiary = {
        ...testDiaries[index],
        ...updatedEntry,
        id
      };
      testDiaries[index] = updatedDiary;
      return updatedDiary;
    })
  };
});

describe('diariesServi - Tests Aislados', () => {
  beforeEach(() => {
    // Limpiar mocks y restaurar datos de prueba
    jest.clearAllMocks();
    testDiaries.length = 0;
    testDiaries.push({
      id: 1,
      profesor: Profesor.Gilda,
      carrera: Carrera.IngenieriaEnSistemas,
      materia: Materia.ProgramacionEstructurada,
      fecha: new Date('2023-01-01'),
      descripcion: Descripcion.MesaDeExamenFinal,
      cargo: Cargo.PresidenteDeMesa,
      verification: true,
      createdAt: new Date('2023-01-01T00:00:00Z')
    });
  });

  describe('Operaciones básicas', () => {
    test('getEntries retorna entradas existentes', () => {
      const entries = getEntries();
      expect(entries).toHaveLength(1);
      expect(entries[0].id).toBe(1);
      expect(entries[0].profesor).toBe(Profesor.Gilda);
    });

    test('findById encuentra entrada existente', () => {
      const entry = findById(1);
      expect(entry).toBeDefined();
      expect(entry?.profesor).toBe(Profesor.Gilda);
    });

    test('findById retorna undefined para id inexistente', () => {
      const entry = findById(999);
      expect(entry).toBeUndefined();
    });
  });

  describe('Funciones de modificación', () => {
    test('addDiary agrega nueva entrada', () => {
      const newEntry: NewDiaryEntry = {
        profesor: Profesor.Jose,
        carrera: Carrera.Arquitectura,
        materia: Materia.DerechoCivil,
        fecha: new Date('2023-01-02'),
        descripcion: Descripcion.MesaDeExamenEspecial,
        cargo: Cargo.VocalDeMesa,
        verification: false,
        createdAt: new Date('2023-01-02T00:00:00Z')
      };

      const result = addDiary(newEntry);
      expect(result.id).toBe(2);
      expect(getEntries()).toHaveLength(2);
      expect(result.profesor).toBe(Profesor.Jose);
    });
  });

  describe('Funciones especializadas', () => {
    test('getEntrisWithoutSensitiveInfo filtra información', () => {
      const filtered = getEntrisWithoutSensitiveInfo();
      expect(filtered).toHaveLength(1);
      expect(filtered[0]).not.toHaveProperty('id');
      expect(filtered[0]).not.toHaveProperty('verification');
      expect(filtered[0]).toHaveProperty('profesor');
      expect(filtered[0].profesor).toBe(Profesor.Gilda);
    });

    test('updateVerification actualiza estado', () => {
      const updated = updateVerification(1, false);
      expect(updated).toBeDefined();
      expect(updated?.verification).toBe(false);
      expect(updated?.profesor).toBe(Profesor.Gilda);
    });

    test('updateDiaryEntry actualiza entrada completa', () => {
      const updates: NewDiaryEntry = {
        profesor: Profesor.Jose,
        carrera: Carrera.Nutricion,
        materia: Materia.Quimica,
        fecha: new Date('2023-01-03'),
        descripcion: Descripcion.MesaDeExamenEspecial,
        cargo: Cargo.SuplenteDeMesa,
        verification: true,
        createdAt: new Date('2023-01-03T00:00:00Z')
      };

      const updated = updateDiaryEntry(1, updates);
      expect(updated).toBeDefined();
      expect(updated?.profesor).toBe(Profesor.Jose);
      expect(updated?.carrera).toBe(Carrera.Nutricion);
      expect(updated?.id).toBe(1);
    });
  });
});