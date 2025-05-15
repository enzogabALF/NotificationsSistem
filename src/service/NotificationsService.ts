import { sendPushNotification } from './notifications'

class NotificationService {
  private static instance: NotificationService

  private constructor() {}

  public static getInstance(): NotificationService {
    if (NotificationService.instance == null) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  public async sendNotification(subscription: any, notification: any): Promise<void> {
    console.log('Enviando notificación:', notification)
    try {
      await sendPushNotification(subscription, notification)
    } catch (error) {
      console.error('Error al enviar notificación:', error)
      // No relanzamos el error para mantener el contrato de no lanzar excepciones
    }
  }
}

export const notificationService = NotificationService.getInstance()