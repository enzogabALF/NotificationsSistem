// tests/diaries.test.ts
import request from 'supertest';
import express from 'express';
import diariesRouter from '../src/routes/diaries';
import * as diariesServi from '../src/service/diariesServi';
import { toNewDaiaryEntry } from '../src/Adapter';
import { Carrera, Descripcion, Materia, NoSensitiveInfoDiaryEntry, Profesor } from '../src/Interface';

// Mockear el módulo completo con la ruta correcta
jest.mock('../src/service/diariesServi');

const app = express();
app.use(express.json());
app.use('/api/diaries', diariesRouter);

describe('Diaries Router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /', () => {
    it('should return all diaries without sensitive info', async () => {
      // Mock completo con todas las propiedades requeridas
      const mockDiaries: NoSensitiveInfoDiaryEntry[] = [{
        profesor: Profesor.PROFESOR1, 
        carrera: Carrera.INGENIERIA_INFORMATICA,
        materia: Materia.PROGRAMACION,
        fecha: new Date('2023-01-01'),
        descripcion: Descripcion.MESA_DE_EXAMEN,
        cargo: 'Asistente',
        verification: true,
        createdAt: new Date('2023-01-01T00:00:00.000Z')
      }];

      // Mock más simple con TypeScript
      (diariesServi.getEntrisWithoutSensitiveInfo as jest.Mock).mockReturnValue(mockDiaries);

      const response = await request(app).get('/api/diaries');
      
      // Verificaciones
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockDiaries);
      expect(diariesServi.getEntrisWithoutSensitiveInfo).toHaveBeenCalledTimes(1);
    });
  });
  describe('GET /:id', () => {
    it('should return a diary when found', async () => {
      const mockDiary = { id: 1, title: 'Found Diary' };
      (diariesServi.findById as jest.Mock).mockReturnValue(mockDiary);

      const response = await request(app).get('/api/diaries/1');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockDiary);
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
      const mockEntry = { title: 'New Entry', content: 'Test content' };
      const mockSavedEntry = { id: 2, ...mockEntry };
      
      (toNewDaiaryEntry as jest.Mock).mockReturnValue(mockEntry);
      (diariesServi.addDiary as jest.Mock).mockReturnValue(mockSavedEntry);

      const response = await request(app)
        .post('/api/diaries')
        .send(mockEntry);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSavedEntry);
      expect(toNewDaiaryEntry).toHaveBeenCalledWith(mockEntry);
      expect(diariesServi.addDiary).toHaveBeenCalledWith(mockEntry);
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
      const mockUpdate = { title: 'Updated Entry' };
      const mockUpdatedEntry = { id: 1, ...mockUpdate };
      
      (toNewDaiaryEntry as jest.Mock).mockReturnValue(mockUpdate);
      (diariesServi.updateDiaryEntry as jest.Mock).mockReturnValue(mockUpdatedEntry);

      const response = await request(app)
        .put('/api/diaries/1')
        .send(mockUpdate);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedEntry);
      expect(toNewDaiaryEntry).toHaveBeenCalledWith(mockUpdate);
      expect(diariesServi.updateDiaryEntry).toHaveBeenCalledWith(1, mockUpdate);
    });

    it('should return 404 when entry to update is not found', async () => {
      const mockUpdate = { title: 'Non-existent Entry' };
      
      (toNewDaiaryEntry as jest.Mock).mockReturnValue(mockUpdate);
      (diariesServi.updateDiaryEntry as jest.Mock).mockReturnValue(null);

      const response = await request(app)
        .put('/api/diaries/999')
        .send(mockUpdate);
      
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