# 📚 Aplicación Web de Notificación de Mesas de Exámenes
![Tests](https://github.com/enzogabALF/NotificationsSistem/actions/workflows/test.yml/badge.svg)

Este proyecto es una Aplicación Web Progresiva (PWA) desarrollada para la Universidad de la Cuenca del Plata, orientada a modernizar la gestión docente vinculada a las mesas de examen finales. Permite notificar, consultar y gestionar de forma eficiente las mesas asignadas a los docentes.

## 🚀 Objetivo

Automatizar y simplificar el proceso de asignación y seguimiento de mesas de examen finales, mejorando la comunicación entre el departamento académico y los docentes mediante notificaciones automáticas y herramientas de gestión integradas.

## ✅ Requerimientos Funcionales

1. **API Web**: Accesible desde computadoras y dispositivos móviles.
2. **Notificaciones Push**: Envío automático al asignar una mesa, y recordatorio especial al menos 30 minutos antes del inicio.
3. **Gestión de Mesas**: Posibilidad de aceptar o rechazar participación en mesas asignadas.
4. **Consulta de Mesas**: Visualización completa de las mesas asignadas (fecha, hora y lugar).
5. **Identificación Segura**: Validación de identidad del docente para asegurar trazabilidad de acciones.

## 🧩 Patrones de Diseño Aplicados

Para garantizar escalabilidad, mantenibilidad y claridad, se aplicaron los siguientes patrones de diseño:

### 🔗 Chain of Responsibility (Cadena de Responsabilidad)
Permite desacoplar el emisor de una petición de sus receptores, facilitando el manejo flexible de flujos de validación o notificación.

### 🧠 Singleton
Asegura que ciertas clases (como servicios globales o controladores centrales) tengan una única instancia compartida en toda la aplicación.

### 👁️ Observer (Observador)
Permite que los componentes se suscriban y reaccionen ante cambios, ideal para actualizaciones en tiempo real como las notificaciones push.

### 🕹️ Command
Encapsula acciones como objetos, útil para la ejecución, registro y posible deshacer de operaciones como aceptar o rechazar mesas.

### 🔌 Adapter (Adaptador)
Facilita la integración con APIs o estructuras de datos externas, permitiendo la interoperabilidad sin modificar el código fuente original.

## 🛠️ Tecnologías Sugeridas

- **Frontend**: Remix + TypeScript (PWA)
- **Backend**: Node.js + Express
- **Base de datos**: PostgreSQL + Prisma ORM
- **Notificaciones Push**: Service Workers + Web Push API


## 📦 Instalación y uso

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/nombre_repositorio.git
   cd nombre_repositorio
