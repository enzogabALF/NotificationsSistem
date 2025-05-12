import { sendPushNotification } from './notifications'

class NotificationService {
  private static instance: NotificationService

  private constructor () {}

  public static getInstance (): NotificationService {
    if (NotificationService.instance == null) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  public sendNotification (subscription: any, notification: any): void {
    console.log('Enviando notificación:', notification)
    // Aquí puedes llamar a sendPushNotification
    sendPushNotification(subscription, notification)
  }
}

// Uso del patrón Singleton
export const notificationService = NotificationService.getInstance()
