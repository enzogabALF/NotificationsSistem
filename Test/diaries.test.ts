import request from 'supertest'
import express from 'express'
import diariesRouter from '../routes/diaries'
import * as diariesService from '../service/diariesService'
import { toNewDaiaryEntry } from '../adapter'

// Mock de los módulos
jest.mock('../service/diariesServi')
jest.mock('../Adapter')

const app = express()
app.use(express.json())
app.use('/api/diaries', diariesRouter)

describe('Diaries Router', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/diaries', () => {
    test('should return all diaries without sensitive info', async () => {
      const mockDiaries = [{ id: 1, comment: 'Test comment', date: '2023-01-01', weather: 'sunny' }]
      ;(diariesService.getEntrisWithoutSensitiveInfo as jest.Mock).mockReturnValue(mockDiaries)

      const response = await request(app).get('/api/diaries')
      
      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockDiaries)
      expect(diariesService.getEntrisWithoutSensitiveInfo).toHaveBeenCalledTimes(1)
    })
  })

  describe('GET /api/diaries/:id', () => {
    test('should return a diary when found', async () => {
      const mockDiary = { id: 1, comment: 'Test comment', date: '2023-01-01', weather: 'sunny' }
      ;(diariesService.findById as jest.Mock).mockReturnValue(mockDiary)

      const response = await request(app).get('/api/diaries/1')
      
      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockDiary)
      expect(diariesService.findById).toHaveBeenCalledWith(1)
    })

    test('should return 404 when diary not found', async () => {
      ;(diariesService.findById as jest.Mock).mockReturnValue(null)

      const response = await request(app).get('/api/diaries/999')
      
      expect(response.status).toBe(404)
      expect(response.text).toBe('Diary not found')
    })
  })

  describe('POST /api/diaries', () => {
    test('should add a new diary entry with valid data', async () => {
      const newEntry = { 
        comment: 'New entry', 
        date: '2023-01-01', 
        weather: 'sunny',
        visibility: 'good'
      }
      const mockAddedEntry = { id: 2, ...newEntry }
      
      ;(toNewDaiaryEntry as jest.Mock).mockReturnValue(newEntry)
      ;(diariesService.addDiary as jest.Mock).mockReturnValue(mockAddedEntry)

      const response = await request(app)
        .post('/api/diaries')
        .send(newEntry)
      
      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockAddedEntry)
      expect(toNewDaiaryEntry).toHaveBeenCalledWith(newEntry)
      expect(diariesService.addDiary).toHaveBeenCalledWith(newEntry)
    })

    test('should return 400 for invalid data', async () => {
      ;(toNewDaiaryEntry as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid data')
      })

      const response = await request(app)
        .post('/api/diaries')
        .send({ invalid: 'data' })
      
      expect(response.status).toBe(400)
      expect(response.text).toBe('malformed data')
    })
  })

  describe('PUT /api/diaries/:id', () => {
    test('should update an existing diary entry', async () => {
      const updatedEntry = { 
        comment: 'Updated entry', 
        date: '2023-01-02', 
        weather: 'rainy',
        visibility: 'poor'
      }
      const mockUpdated = { id: 1, ...updatedEntry }
      
      ;(toNewDaiaryEntry as jest.Mock).mockReturnValue(updatedEntry)
      ;(diariesService.updateDiaryEntry as jest.Mock).mockReturnValue(mockUpdated)

      const response = await request(app)
        .put('/api/diaries/1')
        .send(updatedEntry)
      
      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockUpdated)
      expect(diariesService.updateDiaryEntry).toHaveBeenCalledWith(1, updatedEntry)
    })

    test('should return 404 when entry not found', async () => {
      const updatedEntry = { 
        comment: 'Updated entry', 
        date: '2023-01-02', 
        weather: 'rainy',
        visibility: 'poor'
      }
      
      ;(toNewDaiaryEntry as jest.Mock).mockReturnValue(updatedEntry)
      ;(diariesService.updateDiaryEntry as jest.Mock).mockReturnValue(null)

      const response = await request(app)
        .put('/api/diaries/999')
        .send(updatedEntry)
      
      expect(response.status).toBe(404)
      expect(response.text).toBe('Diary entry not found')
    })

    test('should return 400 for invalid update data', async () => {
      ;(toNewDaiaryEntry as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid data')
      })

      const response = await request(app)
        .put('/api/diaries/1')
        .send({ invalid: 'data' })
      
      expect(response.status).toBe(400)
      expect(response.text).toBe('Malformed data or validation error')
    })
  })
})