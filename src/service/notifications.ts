import { notificationSubject } from '../Observers/Observer'
import { NewNotification } from '../interfaces/Interface'
import webPush from 'web-push'

// Configura las claves VAPID
const vapidKeys = {
  publicKey: 'BJvHvXyqGfdkeG36PyrF359y2C3IIohVYjoPSueLm4jSzJDFBS10fZlbUj83tsjOtLq8dydt7d3tBPN-G4Lz63E',
  privateKey: '2dyFfdkVUFD9dl8Y8KYsEipTn1KH-g75jb7uI7nnbyo'
}

webPush.setVapidDetails(
  'mailto:tuemail@ejemplo.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

export const sendPushNotification = (subscription: any, notification: NewNotification): void => {
  const payload = {
    title: `Notificación para ${notification.profesor}`,
    // body: `Mensaje: ${notification.mensage}\nFecha: ${notification.fechaMesa}`,
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
