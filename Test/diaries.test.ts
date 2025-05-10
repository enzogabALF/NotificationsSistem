import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import diariesRouter from '../src/routes/diaries';
import * as diariesServi from '../src/service/diariesServi';
import { toNewDaiaryEntry } from '../src/Adapter';
import { Profesor, Carrera, Materia, Descripcion, Cargo, DiaryEntry, NoSensitiveInfoDiaryEntry } from '../src/Interface';

jest.mock('../src/service/diariesServi');
jest.mock('../src/Adapter');

const app = express();
app.use(express.json());
app.use('/api/diaries', diariesRouter);

describe('Diaries Router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('should return all diaries without sensitive info', async () => {
      const mockDiaries = [{
        profesor: Profesor.Gilda,
        carrera: Carrera.IngenieriaEnSistemas,
        materia: Materia.ProgramacionEstructurada,
        fecha: new Date('2023-01-01'),
        descripcion: Descripcion.MesaDeExamenFinal,
        cargo: Cargo.VocalDeMesa,
        createdAt: new Date('2023-01-01T00:00:00.000Z')
      }] as NoSensitiveInfoDiaryEntry[];

      (diariesServi.getEntrisWithoutSensitiveInfo as jest.Mock).mockReturnValue(mockDiaries);

      const response = await request(app).get('/api/diaries');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{
        profesor: 'Gilda Romero',
        carrera: 'Ingeniería en Sistemas',
        materia: 'Programacion Estructurada',
        fecha: '2023-01-01T00:00:00.000Z',
        descripcion: 'Examen FInal',
        cargo: 'Vocal de mesa',
        createdAt: '2023-01-01T00:00:00.000Z'
      }]);
      expect(diariesServi.getEntrisWithoutSensitiveInfo).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /:id', () => {
    it('should return a diary when found', async () => {
      const mockDiary = {
        id: 1,
        profesor: Profesor.Jose,
        carrera: Carrera.Arquitectura,
        materia: Materia.DerechoCivil,
        fecha: new Date('2023-02-01'),
        descripcion: Descripcion.MesaDeExamenEspecial,
        cargo: Cargo.PresidenteDeMesa,
        verification: true,
        createdAt: new Date('2023-01-15T00:00:00.000Z')
      } as DiaryEntry;

      (diariesServi.findById as jest.Mock).mockReturnValue(mockDiary);

      const response = await request(app).get('/api/diaries/1');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        profesor: 'jose Fernandez',
        carrera: 'Arquitectura',
        materia: 'Derecho Civil',
        fecha: '2023-02-01T00:00:00.000Z',
        descripcion: 'Mesa de examen especial',
        cargo: 'Examinador',
        verification: true,
        createdAt: '2023-01-15T00:00:00.000Z'
      });
      expect(diariesServi.findById).toHaveBeenCalledWith(1);
    });

    it('should return 404 when diary not found', async () => {
      (diariesServi.findById as jest.Mock).mockReturnValue(null);

      const response = await request(app).get('/api/diaries/999');
      
      expect(response.status).toBe(404);
      expect(response.text).toBe('Diary not found');
    });
  });

  describe('POST /', () => {
    it('should add a new diary entry', async () => {
      const requestData = {
        profesor: Profesor.Gilda,
        carrera: Carrera.Nutricion,
        materia: Materia.Quimica,
        fecha: '2023-03-01',
        descripcion: Descripcion.MesaDeExamenFinal,
        cargo: Cargo.SuplenteDeMesa,
        verification: false
      };

      const mockCreatedAt = new Date('2023-03-01T12:00:00.000Z');
      const expectedParsedData = {
        profesor: Profesor.Gilda,
        carrera: Carrera.Nutricion,
        materia: Materia.Quimica,
        fecha: new Date(requestData.fecha),
        descripcion: Descripcion.MesaDeExamenFinal,
        cargo: Cargo.SuplenteDeMesa,
        verification: false,
        createdAt: mockCreatedAt
      };

      const savedEntry = {
        id: 2,
        ...expectedParsedData
      };

      (toNewDaiaryEntry as jest.Mock).mockImplementation((data: any) => ({
        ...data,
        fecha: new Date((data as any).fecha),
        createdAt: mockCreatedAt
      }));
      
      (diariesServi.addDiary as jest.Mock).mockReturnValue(savedEntry);

      const response = await request(app)
        .post('/api/diaries')
        .send(requestData);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 2,
        profesor: 'Gilda Romero',
        carrera: 'Licenciatura de nutricion',
        materia: 'Quimica',
        fecha: '2023-03-01T00:00:00.000Z',
        descripcion: 'Examen FInal',
        cargo: 'Examinador suplente',
        verification: false,
        createdAt: '2023-03-01T12:00:00.000Z'
      });
      
      expect(toNewDaiaryEntry).toHaveBeenCalledWith(requestData);
      expect(diariesServi.addDiary).toHaveBeenCalledWith(expectedParsedData);
    });

    it('should return 400 for malformed data', async () => {
      (toNewDaiaryEntry as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid data');
      });

      const response = await request(app)
        .post('/api/diaries')
        .send({ invalid: 'data' });
      
      expect(response.status).toBe(400);
      expect(response.text).toBe('malformed data');
    });
  });

  describe('PUT /:id', () => {
    it('should update an existing diary entry', async () => {
      const requestData = {
        profesor: Profesor.Jose,
        carrera: Carrera.IngenieriaEnSistemas,
        materia: Materia.Fisica,
        fecha: '2023-04-01',
        descripcion: Descripcion.MesaDeExamenEspecial,
        cargo: Cargo.VocalDeMesa,
        verification: true
      };

      const expectedParsedData = {
        profesor: Profesor.Jose,
        carrera: Carrera.IngenieriaEnSistemas,
        materia: Materia.Fisica,
        fecha: new Date(requestData.fecha),
        descripcion: Descripcion.MesaDeExamenEspecial,
        cargo: Cargo.VocalDeMesa,
        verification: true
      };

      const updatedEntry = {
        id: 1,
        ...expectedParsedData,
        createdAt: new Date('2023-01-01T00:00:00.000Z')
      };

      (toNewDaiaryEntry as jest.Mock).mockImplementation((data: any) => ({
        ...data,
        fecha: new Date(data.fecha)
      }));
      
      (diariesServi.updateDiaryEntry as jest.Mock).mockReturnValue(updatedEntry);

      const response = await request(app)
        .put('/api/diaries/1')
        .send(requestData);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 1,
        profesor: 'jose Fernandez',
        carrera: 'Ingeniería en Sistemas',
        materia: 'Fisica',
        fecha: '2023-04-01T00:00:00.000Z',
        descripcion: 'Mesa de examen especial',
        cargo: 'Vocal de mesa',
        verification: true,
        createdAt: '2023-01-01T00:00:00.000Z'
      });
      
      expect(toNewDaiaryEntry).toHaveBeenCalledWith(requestData);
      expect(diariesServi.updateDiaryEntry).toHaveBeenCalledWith(1, expectedParsedData);
    });

    it('should return 404 when entry to update is not found', async () => {
      const requestData = {
        profesor: Profesor.Gilda,
        carrera: Carrera.Arquitectura,
        materia: Materia.AnalisisMatematico,
        fecha: '2023-05-01',
        descripcion: Descripcion.MesaDeExamenFinal,
        cargo: Cargo.PresidenteDeMesa,
        verification: false
      };

      const expectedParsedData = {
        ...requestData,
        fecha: new Date(requestData.fecha)
      };

      (toNewDaiaryEntry as jest.Mock).mockReturnValue(expectedParsedData);
      (diariesServi.updateDiaryEntry as jest.Mock).mockReturnValue(null);

      const response = await request(app)
        .put('/api/diaries/999')
        .send(requestData);
      
      expect(response.status).toBe(404);
      expect(response.text).toBe('Diary entry not found');
    });

    it('should return 400 for malformed update data', async () => {
      (toNewDaiaryEntry as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid data');
      });

      const response = await request(app)
        .put('/api/diaries/1')
        .send({ invalid: 'data' });
      
      expect(response.status).toBe(400);
      expect(response.text).toBe('Malformed data or validation error');
    });
  });
});