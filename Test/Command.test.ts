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

  it('should create a SendNotificationCommand instance', () => {
    const command = new SendNotificationCommand(mockNotification, mockSubscription);
    
    expect(command).toBeInstanceOf(SendNotificationCommand);
    expect(command).toHaveProperty('execute');
  });

  it('should call sendPushNotification when execute is called', () => {
    const command = new SendNotificationCommand(mockNotification, mockSubscription);
    
    command.execute();
    
    expect(sendPushNotification).toHaveBeenCalledTimes(1);
    expect(sendPushNotification).toHaveBeenCalledWith(
      mockSubscription,
      mockNotification
    );
  });

  it('should log the notification when execute is called', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const command = new SendNotificationCommand(mockNotification, mockSubscription);
    
    command.execute();
    
    expect(consoleSpy).toHaveBeenCalledWith(
      'Enviando notificación:',
      mockNotification
    );
    
    consoleSpy.mockRestore();
  });

  it('should handle different notification types', () => {
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