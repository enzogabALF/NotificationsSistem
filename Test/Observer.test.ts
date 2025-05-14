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
    it('should attach an observer correctly', () => {
      notificationSubject.attach(mockObserver);
      expect(notificationSubject['observers']).toContain(mockObserver);
    });

    it('should detach an observer correctly', () => {
      notificationSubject.attach(mockObserver);
      notificationSubject.detach(mockObserver);
      expect(notificationSubject['observers']).not.toContain(mockObserver);
    });

    it('should notify all attached observers', () => {
      const secondObserver = { update: jest.fn() };
      
      notificationSubject.attach(mockObserver);
      notificationSubject.attach(secondObserver);
      
      const testData = { message: 'Test notification' };
      notificationSubject.notify(testData);
      
      expect(mockObserver.update).toHaveBeenCalledWith(testData);
      expect(secondObserver.update).toHaveBeenCalledWith(testData);
    });

    it('should not notify detached observers', () => {
      notificationSubject.attach(mockObserver);
      notificationSubject.detach(mockObserver);
      
      const testData = { message: 'Test notification' };
      notificationSubject.notify(testData);
      
      expect(mockObserver.update).not.toHaveBeenCalled();
    });
  });

  describe('NotificationObserver', () => {
    it('should log notification when update is called', () => {
      const observer = new NotificationObserver();
      const testData = { message: 'Test notification' };
      
      observer.update(testData);
      
      expect(consoleSpy).toHaveBeenCalledWith('Notificación enviada:', testData);
    });
  });

  describe('Singleton Behavior', () => {
    it('should export a single instance of NotificationSubject', () => {
      const anotherImport = require('../src/Observers/Observer').notificationSubject;
      expect(notificationSubject).toBe(anotherImport);
    });
  });
});