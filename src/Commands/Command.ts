import { sendPushNotification } from "../service/notifications"

// Command.ts
interface Command {
  execute: () => void
}

class SendNotificationCommand implements Command {
  private readonly notification: any
  private readonly subscription: any

  constructor (notification: any, subscription: any) {
    this.notification = notification
    this.subscription = subscription
  }

  execute = (): void => {
    console.log('Enviando notificación:', this.notification)
    // Aquí puedes llamar a sendPushNotification
    sendPushNotification(this.subscription, this.notification)
    // Aquí puedes agregar la lógica para enviar la notificación
  }
}

// Uso del patrón Command
const command = new SendNotificationCommand(
  { mensaje: 'Nueva notificación' },
  { endpoint: 'https://example.com' }
)
command.execute()
