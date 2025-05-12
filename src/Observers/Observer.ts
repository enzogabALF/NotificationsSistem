interface Observer {
  update: (data: any) => void
}

class NotificationObserver implements Observer {
  update (data: any): void {
    console.log('Notificación enviada:', data)
  }
}

class NotificationSubject {
  private observers: Observer[] = []

  public attach (observer: Observer): void {
    this.observers.push(observer)
  }

  public detach (observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer)
  }

  public notify (data: any): void {
    this.observers.forEach((observer) => observer.update(data))
  }
}

// Uso del patrón Observer
export const notificationSubject = new NotificationSubject()
