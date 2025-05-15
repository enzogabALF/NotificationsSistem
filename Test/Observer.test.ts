import { notificationSubject } from '../src/Observers/Observer';
import NotificationObserver from '../src/Observers/Observer';
import { Observer } from '../src/Observers/Observer';

describe('Observer Pattern Implementation', () => {
  let mockObserver: Observer;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    // Configuración antes de cada prueba
    mockObserver = {
      update: jest.fn()
    };
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    notificationSubject['observers'] = []; // Resetear los observadores para cada prueba
  });

  afterEach(() => {
    // Limpieza después de cada prueba
    consoleSpy.mockRestore();
  });

  describe('NotificationSubject', () => {
    it('Debería adjuntar un observador correctamente', () => {
      notificationSubject.attach(mockObserver);
      expect(notificationSubject['observers']).toContain(mockObserver);
    });

    it('Debería desadjuntar un observador correctamente', () => {
      notificationSubject.attach(mockObserver);
      notificationSubject.detach(mockObserver);
      expect(notificationSubject['observers']).not.toContain(mockObserver);
    });

    it('Debería notificar a todos los observadores adjuntos', () => {
      const secondObserver = { update: jest.fn() };
      
      notificationSubject.attach(mockObserver);
      notificationSubject.attach(secondObserver);
      
      const testData = { message: 'Test notification' };
      notificationSubject.notify(testData);
      
      expect(mockObserver.update).toHaveBeenCalledWith(testData);
      expect(secondObserver.update).toHaveBeenCalledWith(testData);
    });

    it('No debería notificar a los observadores desadjuntos', () => {
      notificationSubject.attach(mockObserver);
      notificationSubject.detach(mockObserver);
      
      const testData = { message: 'Test notification' };
      notificationSubject.notify(testData);
      
      expect(mockObserver.update).not.toHaveBeenCalled();
    });
  });

  describe('NotificationObserver', () => {
    it('Debería registrar la notificación cuando se llama a update', () => {
      const observer = new NotificationObserver();
      const testData = { message: 'Test notification' };
      
      observer.update(testData);
      
      expect(consoleSpy).toHaveBeenCalledWith('Notificación enviada:', testData);
    });
  });

  describe('Singleton Behavior', () => {
    it('Debería exportar una única instancia de NotificationSubject', () => {
      const anotherImport = require('../src/Observers/Observer').notificationSubject;
      expect(notificationSubject).toBe(anotherImport);
    });
  });
});