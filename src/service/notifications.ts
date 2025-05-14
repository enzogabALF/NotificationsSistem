// notifications.ts
import { notificationSubject } from '../Observers/Observer'
import { NewNotification } from '../interfaces/Interface'
import webPush from 'web-push'

// Mover la configuración VAPID dentro de la función
export const sendPushNotification = (subscription: any, notification: NewNotification): void => {
  // Configura las claves VAPID (ahora dentro de la función)
  const vapidKeys = {
    publicKey: '<TU_CLAVE_PUBLICA>',
    privateKey: '<TU_CLAVE_PRIVADA>'
  }

  webPush.setVapidDetails(
    'mailto:tuemail@ejemplo.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
  )

  const payload = {
    title: `Notificación para ${notification.profesor}`,
    data: {
      carrera: notification.carrera,
      cargo: notification.cargo,
      leido: notification.leido
    }
  }

  webPush
    .sendNotification(subscription, JSON.stringify(payload))
    .then(() => {
      console.log('Notificación enviada con éxito')
      notificationSubject.notify(notification)
    })
    .catch((error) => console.error('Error al enviar la notificación:', error))
}