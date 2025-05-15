// notifications.test.ts
import { sendPushNotification } from '../src/service/notifications';
import { notificationSubject } from '../src/Observers/Observer';
import { NewNotification, Profesor, Carrera, Cargo, Materia } from '../src/interfaces/Interface';
import webPush from 'web-push';

// Mock de web-push con implementación completa
jest.mock('web-push', () => ({
  setVapidDetails: jest.fn().mockImplementation(() => {
    console.log('VAPID details set');
  }),
  sendNotification: jest.fn().mockImplementation(() => {
    console.log('Notification sent');
    return Promise.resolve();
  })
}));

// Mock del notificationSubject
jest.mock('../src/Observers/Observer', () => ({
  notificationSubject: {
    notify: jest.fn().mockImplementation((notification) => {
      console.log(`Observer notified: ${notification.profesor}`);
    })
  }
}));

describe('Notifications Service', () => {
  const mockSubscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/abc123',
    keys: {
      p256dh: 'p256dhKey',
      auth: 'authKey'
    }
  };

  const mockNotification: NewNotification = {
    profesor: Profesor.Gilda,
    vocal: Profesor.Jose,
    mensage: 'Tienes un nuevo examen asignado',
    fechaMesa: new Date('2025-06-01T10:00:00.000Z'),
    materia: Materia.ProgramacionEstructurada,
    carrera: Carrera.IngenieriaEnSistemas,
    cargo: Cargo.PresidenteDeMesa,
    leido: false,
    createAt: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Configurar mock para setVapidDetails
    (webPush.setVapidDetails as jest.Mock).mockClear();
    (webPush.sendNotification as jest.Mock).mockClear();
    (notificationSubject.notify as jest.Mock).mockClear();
  });

  describe('sendPushNotification', () => {
    it('Debería llamar a setVapidDetails con los parámetros correctos', () => {
      sendPushNotification(mockSubscription, mockNotification);
      
      expect(webPush.setVapidDetails).toHaveBeenCalledTimes(1);
      expect(webPush.setVapidDetails).toHaveBeenCalledWith(
        'mailto:tuemail@ejemplo.com',
        '<TU_CLAVE_PUBLICA>',
        '<TU_CLAVE_PRIVADA>'
      );
    });

    it('Debería enviar la notificación correctamente', async () => {
      sendPushNotification(mockSubscription, mockNotification);
      await new Promise(process.nextTick);

      expect(webPush.sendNotification).toHaveBeenCalledWith(
        mockSubscription,
        JSON.stringify({
          title: `Notificación para ${mockNotification.profesor}`,
          data: {
            carrera: mockNotification.carrera,
            cargo: mockNotification.cargo,
            leido: mockNotification.leido
          }
        })
      );
      expect(notificationSubject.notify).toHaveBeenCalledWith(mockNotification);
    });

    it('Debería manejar el error cuando falla el envío de la notificación', async () => {
      const error = new Error('Error de red');
      (webPush.sendNotification as jest.Mock).mockRejectedValueOnce(error);
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      sendPushNotification(mockSubscription, mockNotification);
      await new Promise(process.nextTick);

      expect(consoleSpy).toHaveBeenCalledWith('Error al enviar la notificación:', error);
      consoleSpy.mockRestore();
    });

    it('Debería incluir la estructura de carga correcta', () => {
      sendPushNotification(mockSubscription, mockNotification);

      expect(webPush.sendNotification).toHaveBeenCalledWith(
        expect.anything(),
        expect.stringContaining(`"title":"Notificación para ${mockNotification.profesor}"`)
      );
      expect(webPush.sendNotification).toHaveBeenCalledWith(
        expect.anything(),
        expect.stringContaining(`"carrera":"${Carrera.IngenieriaEnSistemas}"`)
      );
    });
  });
});