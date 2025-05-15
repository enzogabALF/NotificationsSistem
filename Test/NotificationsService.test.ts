import { notificationService } from '../src/service/NotificationsService'
import { sendPushNotification } from '../src/service/notifications'
import { NewNotification, Profesor, Materia, Carrera, Cargo } from '../src/interfaces/Interface'

jest.mock('../src/service/notifications', () => ({
  sendPushNotification: jest.fn()
}))

describe('NotificationService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Singleton Pattern', () => {
    it('siempre debe devolver la misma instancia', () => {
      const instance1 = notificationService
      const instance2 = notificationService
      expect(instance1).toBe(instance2)
    })
  })

  describe('sendNotification', () => {
    it('Debería llamar a sendPushNotification con los parámetros correctos', async () => {
      const mockSubscription = { endpoint: 'test-endpoint', keys: { auth: 'auth', p256dh: 'p256dh' } }
      const mockNotification: NewNotification = {
        profesor: Profesor.Gilda,
        vocal: Profesor.Jose,
        mensage: 'Mensaje de prueba',
        fechaMesa: new Date(),
        materia: Materia.ProgramacionEstructurada,
        carrera: Carrera.IngenieriaEnSistemas,
        cargo: Cargo.PresidenteDeMesa,
        leido: false,
        createAt: new Date()
      }

      await notificationService.sendNotification(mockSubscription, mockNotification)

      expect(sendPushNotification).toHaveBeenCalledTimes(1)
      expect(sendPushNotification).toHaveBeenCalledWith(mockSubscription, mockNotification)
    })

    it('Debe manejar errores de sendPushNotification', async () => {
      const mockError = new Error('Error de prueba')
      ;(sendPushNotification as jest.Mock).mockRejectedValue(mockError)
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      const mockSubscription = { endpoint: 'test-endpoint' }
      const mockNotification: NewNotification = {
        profesor: Profesor.Gilda,
        vocal: Profesor.Jose,
        mensage: 'Mensaje de prueba',
        fechaMesa: new Date(),
        materia: Materia.ProgramacionEstructurada,
        carrera: Carrera.IngenieriaEnSistemas,
        cargo: Cargo.PresidenteDeMesa,
        leido: false,
        createAt: new Date()
      }

      // Ahora usamos await y no esperamos que lance error
      await notificationService.sendNotification(mockSubscription, mockNotification)

      // Verificamos que se llamó al console.error
      expect(consoleSpy).toHaveBeenCalledWith('Error al enviar notificación:', mockError)
      
      // Limpiamos el mock
      consoleSpy.mockRestore()
    })
  })
})