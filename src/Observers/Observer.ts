// Interfaz para los observadores
interface Observer {
  update: (data: any) => void
}

// Clase concreta de un observador que maneja notificaciones
class NotificationObserver implements Observer {
  update (data: any): void {
    console.log('Notificación enviada:', data)
  }
}

// Clase que actúa como el sujeto (Subject) que notifica a los observadores
class NotificationSubject {
  private observers: Observer[] = []

  // Método para agregar un observador
  public attach (observer: Observer): void {
    this.observers.push(observer)
  }

  // Método para eliminar un observador
  public detach (observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer)
  }

  // Método para notificar a todos los observadores
  public notify (data: any): void {
    this.observers.forEach((observer) => observer.update(data))
  }
}

// Exportamos una instancia del sujeto para que sea reutilizable
export const notificationSubject = new NotificationSubject()
export default NotificationObserver
