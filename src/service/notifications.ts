import { notificationSubject } from '../Observers/Observer'
import { NewNotification } from '../interfaces/Interface'
import webPush from 'web-push'

// Configura las claves VAPID
const vapidKeys = {
  publicKey: '<TU_CLAVE_PUBLICA>',
  privateKey: '<TU_CLAVE_PRIVADA>'
}

webPush.setVapidDetails(
  'mailto:tuemail@ejemplo.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

export const sendPushNotification = (subscription: any, notification: NewNotification): void => {
  const payload = {
    title: `Notificación para ${notification.profesor}`,
    body: `Mensaje: ${notification.mensaje}\nFecha: ${notification.fechaMesa}`,
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
      // Notificar a los observadores
      notificationSubject.notify(notification)
    })
    .catch((error) => console.error('Error al enviar la notificación:', error))
}
