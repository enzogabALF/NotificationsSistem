// Test/Command.test.ts
import { SendNotificationCommand } from '../src/Commands/Command';
import { sendPushNotification } from '../src/service/notifications';
import { Profesor, Carrera, Materia, Cargo } from '../src/interfaces/Interface';

// Mock del servicio de notificaciones
jest.mock('../src/service/notifications', () => ({
  sendPushNotification: jest.fn()
}));

describe('SendNotificationCommand', () => {
  const mockSubscription = {
    endpoint: 'http://localhost:3000/api/notifications',
    expirationTime: null,
    keys: {
      p256dh: 'BFAKEp256dhKey',
      auth: 'FAKEauthKey'
    }
  };

  const mockNotification = {
    id: 1,
    profesor: Profesor.Gilda,
    vocal: Profesor.Jose,
    mensage: 'Examen final de Programacion Estructurada',
    fechaMesa: new Date('2023-10-01'),
    materia: Materia.ProgramacionEstructurada,
    carrera: Carrera.IngenieriaEnSistemas,
    cargo: Cargo.PresidenteDeMesa,
    leido: false,
    createAt: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe crear una instancia de comando de envío de notificación', () => {
    const command = new SendNotificationCommand(mockNotification, mockSubscription);
    
    expect(command).toBeInstanceOf(SendNotificationCommand);
    expect(command).toHaveProperty('execute');
  });

  it('Debería llamar para enviar una notificación push cuando se llama a ejecutar', () => {
    const command = new SendNotificationCommand(mockNotification, mockSubscription);
    
    command.execute();
    
    expect(sendPushNotification).toHaveBeenCalledTimes(1);
    expect(sendPushNotification).toHaveBeenCalledWith(
      mockSubscription,
      mockNotification
    );
  });

  it('Debería registrar la notificación cuando se llama a ejecutar', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const command = new SendNotificationCommand(mockNotification, mockSubscription);
    
    command.execute();
    
    expect(consoleSpy).toHaveBeenCalledWith(
      'Enviando notificación:',
      mockNotification
    );
    
    consoleSpy.mockRestore();
  });

  it('Debería manejar diferentes tipos de notificaciones', () => {
    const differentNotification = {
      ...mockNotification,
      materia: Materia.Fisica,
      carrera: Carrera.Arquitectura
    };
    
    const command = new SendNotificationCommand(differentNotification, mockSubscription);
    
    command.execute();
    
    expect(sendPushNotification).toHaveBeenCalledWith(
      mockSubscription,
      expect.objectContaining({
        materia: Materia.Fisica,
        carrera: Carrera.Arquitectura
      })
    );
  });
});