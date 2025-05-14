// Adapter.test.ts
import { toNewDaiaryEntry, toNewNotification, diaryEntryToNotification } from '../src/Adapters/Adapter';
import { Profesor, Carrera, Materia, Descripcion, Cargo, DiaryEntry } from '../src/interfaces/Interface';

describe('Adapter functions', () => {
  describe('toNewDaiaryEntry', () => {
    test('should correctly parse a valid diary entry', () => {
      const validEntry = {
        profesor: Profesor.Gilda,
        vocal: Profesor.Jose,
        carrera: Carrera.IngenieriaEnSistemas,
        materias: Materia.ProgramacionEstructurada,
        fechaMesa: new Date(),
        descripcion: Descripcion.MesaDeExamenFinal,
        posicion: Cargo.PresidenteDeMesa,
        verification: true,
        createdAt: new Date()
      };

      const result = toNewDaiaryEntry(validEntry);
      
      expect(result).toEqual({
        profesor: Profesor.Gilda,
        vocal: Profesor.Jose,
        carrera: Carrera.IngenieriaEnSistemas,
        materia: Materia.ProgramacionEstructurada,
        fecha: validEntry.fechaMesa,
        descripcion: Descripcion.MesaDeExamenFinal,
        cargo: Cargo.PresidenteDeMesa,
        verification: true,
        createdAt: validEntry.createdAt
      });
    });

    test('should throw error for invalid carrera', () => {
      const invalidEntry = {
        profesor: Profesor.Gilda,
        vocal: Profesor.Jose,
        carrera: 'Invalid carrera',
        materias: Materia.ProgramacionEstructurada,
        fechaMesa: new Date(),
        descripcion: Descripcion.MesaDeExamenFinal,
        posicion: Cargo.PresidenteDeMesa,
        verification: true,
        createdAt: new Date()
      };

      expect(() => toNewDaiaryEntry(invalidEntry)).toThrow('Incorrect or missing comment');
    });

    test('should throw error for invalid profesor', () => {
      const invalidEntry = {
        profesor: 'Invalid profesor',
        vocal: Profesor.Jose,
        carrera: Carrera.IngenieriaEnSistemas,
        materias: Materia.ProgramacionEstructurada,
        fechaMesa: new Date(),
        descripcion: Descripcion.MesaDeExamenFinal,
        posicion: Cargo.PresidenteDeMesa,
        verification: true,
        createdAt: new Date()
      };

      expect(() => toNewDaiaryEntry(invalidEntry)).toThrow('Incorrect or missing comment');
    });

    test('should throw error for invalid descripcion', () => {
      const invalidEntry = {
        profesor: Profesor.Gilda,
        vocal: Profesor.Jose,
        carrera: Carrera.IngenieriaEnSistemas,
        materias: Materia.ProgramacionEstructurada,
        fechaMesa: new Date(),
        descripcion: 'Invalid descripcion',
        posicion: Cargo.PresidenteDeMesa,
        verification: true,
        createdAt: new Date()
      };

      expect(() => toNewDaiaryEntry(invalidEntry)).toThrow('Incorrect or missing comment');
    });

    test('should throw error for invalid cargo', () => {
      const invalidEntry = {
        profesor: Profesor.Gilda,
        vocal: Profesor.Jose,
        carrera: Carrera.IngenieriaEnSistemas,
        materias: Materia.ProgramacionEstructurada,
        fechaMesa: new Date(),
        descripcion: Descripcion.MesaDeExamenFinal,
        posicion: 'Invalid cargo',
        verification: true,
        createdAt: new Date()
      };

      expect(() => toNewDaiaryEntry(invalidEntry)).toThrow('Incorrect or missing comment');
    });

    test('should throw error for invalid verification (not boolean)', () => {
      const invalidEntry = {
        profesor: Profesor.Gilda,
        vocal: Profesor.Jose,
        carrera: Carrera.IngenieriaEnSistemas,
        materias: Materia.ProgramacionEstructurada,
        fechaMesa: new Date(),
        descripcion: Descripcion.MesaDeExamenFinal,
        posicion: Cargo.PresidenteDeMesa,
        verification: 'not a boolean',
        createdAt: new Date()
      };

      expect(() => toNewDaiaryEntry(invalidEntry)).toThrow('Incorrect or missing comment');
    });

    test('should throw error for invalid date', () => {
      const invalidEntry = {
        profesor: Profesor.Gilda,
        vocal: Profesor.Jose,
        carrera: Carrera.IngenieriaEnSistemas,
        materias: Materia.ProgramacionEstructurada,
        fechaMesa: 'not a date',
        descripcion: Descripcion.MesaDeExamenFinal,
        posicion: Cargo.PresidenteDeMesa,
        verification: true,
        createdAt: new Date()
      };

      expect(() => toNewDaiaryEntry(invalidEntry)).toThrow('Incorrect or missing comment');
    });
  });

  describe('toNewNotification', () => {
    test('should correctly parse a valid notification', () => {
      const validNotification = {
        profesor: Profesor.Jose,
        vocal: Profesor.Gilda,
        mensage: 'Test message',
        fechaMesa: new Date(),
        materia: Materia.Fisica,
        carrera: Carrera.Arquitectura,
        cargo: Cargo.VocalDeMesa,
        leido: false,
        createdAt: new Date()
      };

      const result = toNewNotification(validNotification);
      
      expect(result).toEqual({
        profesor: Profesor.Jose,
        vocal: Profesor.Gilda,
        mensage: 'Test message',
        fechaMesa: validNotification.fechaMesa,
        materia: Materia.Fisica,
        carrera: Carrera.Arquitectura,
        cargo: Cargo.VocalDeMesa,
        leido: false,
        createAt: validNotification.createdAt
      });
    });

    test('should throw error for invalid materia', () => {
      const invalidNotification = {
        profesor: Profesor.Jose,
        vocal: Profesor.Gilda,
        mensage: 'Test message',
        fechaMesa: new Date(),
        materia: 'Invalid materia',
        carrera: Carrera.Arquitectura,
        cargo: Cargo.VocalDeMesa,
        leido: false,
        createdAt: new Date()
      };

      expect(() => toNewNotification(invalidNotification)).toThrow('Incorrect or missing comment');
    });

    test('should throw error for invalid profesor', () => {
      const invalidNotification = {
        profesor: 'Invalid profesor',
        vocal: Profesor.Gilda,
        mensage: 'Test message',
        fechaMesa: new Date(),
        materia: Materia.Fisica,
        carrera: Carrera.Arquitectura,
        cargo: Cargo.VocalDeMesa,
        leido: false,
        createdAt: new Date()
      };

      expect(() => toNewNotification(invalidNotification)).toThrow('Incorrect or missing comment');
    });

    test('should throw error for invalid cargo', () => {
      const invalidNotification = {
        profesor: Profesor.Jose,
        vocal: Profesor.Gilda,
        mensage: 'Test message',
        fechaMesa: new Date(),
        materia: Materia.Fisica,
        carrera: Carrera.Arquitectura,
        cargo: 'Invalid cargo',
        leido: false,
        createdAt: new Date()
      };

      expect(() => toNewNotification(invalidNotification)).toThrow('Incorrect or missing comment');
    });

    test('should throw error for invalid leido (not boolean)', () => {
      const invalidNotification = {
        profesor: Profesor.Jose,
        vocal: Profesor.Gilda,
        mensage: 'Test message',
        fechaMesa: new Date(),
        materia: Materia.Fisica,
        carrera: Carrera.Arquitectura,
        cargo: Cargo.VocalDeMesa,
        leido: 'not a boolean',
        createdAt: new Date()
      };

      expect(() => toNewNotification(invalidNotification)).toThrow('Incorrect or missing comment');
    });
  });

  describe('diaryEntryToNotification', () => {
    test('should correctly convert a diary entry to a notification', () => {
      const diaryEntry: DiaryEntry = {
        id: 1,
        profesor: Profesor.Gilda,
        vocal: Profesor.Jose,
        carrera: Carrera.Nutricion,
        materia: Materia.Quimica,
        fecha: new Date(),
        descripcion: Descripcion.MesaDeExamenEspecial,
        cargo: Cargo.SuplenteDeMesa,
        verification: true,
        createdAt: new Date()
      };

      const result = diaryEntryToNotification(diaryEntry);
      
      expect(result).toEqual({
        id: 1,
        profesor: Profesor.Gilda,
        vocal: Profesor.Gilda,
        mensage: `Nueva notificación para la materia ${Materia.Quimica}`,
        fechaMesa: diaryEntry.fecha,
        materia: Materia.Quimica,
        carrera: Carrera.Nutricion,
        cargo: Cargo.SuplenteDeMesa,
        leido: false,
        createAt: expect.any(Date)
      });
    });

    test('should use the same id from diary entry', () => {
      const diaryEntry: DiaryEntry = {
        id: 42,
        profesor: Profesor.Jose,
        vocal: Profesor.Gilda,
        carrera: Carrera.IngenieriaEnSistemas,
        materia: Materia.AnalisisMatematico,
        fecha: new Date(),
        descripcion: Descripcion.MesaDeExamenFinal,
        cargo: Cargo.PresidenteDeMesa,
        verification: false,
        createdAt: new Date()
      };

      const result = diaryEntryToNotification(diaryEntry);
      expect(result.id).toBe(42);
    });
  });
});