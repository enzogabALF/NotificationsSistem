import { toNewDaiaryEntry } from '../src/Adapter';
import { Profesor, Carrera, Materia, Descripcion, Cargo } from '../src/Interface';

// Mock de las funciones internas
jest.mock('../src/Adapter', () => {
  const originalModule = jest.requireActual('../src/Adapter');
  
  return {
    ...originalModule,
    __esModule: true,
    // Exportamos funciones internas para testing
    isString: jest.fn(originalModule.isString),
    isBoolean: jest.fn(originalModule.isBoolean),
    isCarrera: jest.fn(originalModule.isCarrera),
    isMaterias: jest.fn(originalModule.isMaterias),
    isProfesor: jest.fn(originalModule.isProfesor),
    isDescripcion: jest.fn(originalModule.isDescripcion),
    isPosicion: jest.fn(originalModule.isPosicion),
    parseComent: jest.fn(originalModule.parseComent),
    parseProfesor: jest.fn(originalModule.parseProfesor),
    parseMaterias: jest.fn(originalModule.parseMaterias),
    parseDescripcion: jest.fn(originalModule.parseDescripcion),
    parsePosicion: jest.fn(originalModule.parsePosicion),
    parseVerification: jest.fn(originalModule.parseVerification)
  };
});

const {
  isString,
  isBoolean,
  isCarrera,
  isMaterias,
  isProfesor,
  isDescripcion,
  isPosicion,
  parseComent,
  parseProfesor,
  parseMaterias,
  parseDescripcion,
  parsePosicion,
  parseVerification
} = require('../src/Adapter');

describe('Adapter', () => {
  // Tests para funciones de validación básica
  describe('Funciones de validación', () => {
    test('isString valida correctamente strings', () => {
      expect(isString('texto')).toBe(true);
      expect(isString(123)).toBe(false);
      expect(isString(true)).toBe(false);
    });

    test('isBoolean valida correctamente booleanos', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
      expect(isBoolean('true')).toBe(false);
    });
  });

  // Tests para funciones de validación de enums
  describe('Validación de enums', () => {
    test('isCarrera valida correctamente', () => {
      expect(isCarrera(Carrera.IngenieriaEnSistemas)).toBe(true);
      expect(isCarrera('Carrera inválida')).toBe(false);
    });

    test('isMaterias valida correctamente', () => {
      expect(isMaterias(Materia.AnalisisMatematico)).toBe(true);
      expect(isMaterias('Materia inválida')).toBe(false);
    });

    test('isProfesor valida correctamente', () => {
      expect(isProfesor(Profesor.Gilda)).toBe(true);
      expect(isProfesor('Profesor inválido')).toBe(false);
    });

    test('isDescripcion valida correctamente', () => {
      expect(isDescripcion(Descripcion.MesaDeExamenFinal)).toBe(true);
      expect(isDescripcion('Descripción inválida')).toBe(false);
    });

    test('isPosicion valida correctamente', () => {
      expect(isPosicion(Cargo.PresidenteDeMesa)).toBe(true);
      expect(isPosicion('Posición inválida')).toBe(false);
    });
  });

  // Tests para funciones de parseo
  describe('Funciones de parseo', () => {
    test('parseComent parsea carrera correctamente', () => {
      expect(parseComent(Carrera.IngenieriaEnSistemas)).toBe(Carrera.IngenieriaEnSistemas);
      expect(() => parseComent('Carrera inválida')).toThrow('Incorrect or missing comment');
    });

    test('parseProfesor parsea profesor correctamente', () => {
      expect(parseProfesor(Profesor.Gilda)).toBe(Profesor.Gilda);
      expect(() => parseProfesor('Profesor inválido')).toThrow('Incorrect or missing comment');
    });

    test('parseMaterias parsea materia correctamente', () => {
      expect(parseMaterias(Materia.AnalisisMatematico)).toBe(Materia.AnalisisMatematico);
      expect(() => parseMaterias('Materia inválida')).toThrow('Incorrect or missing comment');
    });

    test('parseDescripcion parsea descripción correctamente', () => {
      expect(parseDescripcion(Descripcion.MesaDeExamenFinal)).toBe(Descripcion.MesaDeExamenFinal);
      expect(() => parseDescripcion('Descripción inválida')).toThrow('Incorrect or missing comment');
    });

    test('parsePosicion parsea cargo correctamente', () => {
      expect(parsePosicion(Cargo.PresidenteDeMesa)).toBe(Cargo.PresidenteDeMesa);
      expect(() => parsePosicion('Cargo inválido')).toThrow('Incorrect or missing comment');
    });

    test('parseVerification parsea booleano correctamente', () => {
      expect(parseVerification(true)).toBe(true);
      expect(() => parseVerification('true')).toThrow('Incorrect or missing comment');
    });
  });

  // Tests para la función principal
  describe('toNewDaiaryEntry', () => {
    test('crea entrada válida con datos correctos', () => {
      const validInput = {
        profesor: Profesor.Gilda,
        carrera: Carrera.IngenieriaEnSistemas,
        materias: Materia.AnalisisMatematico,
        fecha: '2023-01-01',
        descripcion: Descripcion.MesaDeExamenFinal,
        posicion: Cargo.PresidenteDeMesa,
        verification: true
      };

      const result = toNewDaiaryEntry(validInput);
      
      expect(result).toEqual({
        profesor: Profesor.Gilda,
        carrera: Carrera.IngenieriaEnSistemas,
        materia: Materia.AnalisisMatematico,
        fecha: new Date('2023-01-01'),
        descripcion: Descripcion.MesaDeExamenFinal,
        cargo: Cargo.PresidenteDeMesa,
        verification: true,
        createdAt: expect.any(Date)
      });
    });

    test('lanza error con campo profesor inválido', () => {
      const invalidInput = {
        profesor: 'Profesor inválido',
        carrera: Carrera.IngenieriaEnSistemas,
        materias: Materia.AnalisisMatematico,
        fecha: '2023-01-01',
        descripcion: Descripcion.MesaDeExamenFinal,
        posicion: Cargo.PresidenteDeMesa,
        verification: true
      };

      expect(() => toNewDaiaryEntry(invalidInput)).toThrow('Incorrect or missing comment');
    });

    test('lanza error con campo fecha inválido', () => {
      const invalidInput = {
        profesor: Profesor.Gilda,
        carrera: Carrera.IngenieriaEnSistemas,
        materias: Materia.AnalisisMatematico,
        fecha: 'fecha-inválida',
        descripcion: Descripcion.MesaDeExamenFinal,
        posicion: Cargo.PresidenteDeMesa,
        verification: true
      };

      expect(() => toNewDaiaryEntry(invalidInput)).toThrow();
    });

    test('lanza error con campos faltantes', () => {
      const incompleteInput = {
        carrera: Carrera.IngenieriaEnSistemas,
        materias: Materia.AnalisisMatematico,
        fecha: '2023-01-01',
        descripcion: Descripcion.MesaDeExamenFinal,
        posicion: Cargo.PresidenteDeMesa,
        verification: true
      };

      expect(() => toNewDaiaryEntry(incompleteInput as any)).toThrow();
    });
  });
});