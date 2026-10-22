# SPEC-004: Escape Room Romántico

> **Tipo**: Feature  
> **Estado**: Requirements Completed  
> **Workflow**: Requirements-First  

---
# Requirements Document

## Introduction

El sistema "Escape Room Romántico" es un minijuego interactivo donde los usuarios resuelven acertijos progresivos basados en momentos personales compartidos. El código de cumpleaños actúa como primera pista, y al completar una serie de preguntas personalizadas, el usuario descubre una sorpresa final especial.

## Glossary

- **Sistema**: El minijuego completo de Escape Room Romántico
- **Acertijo**: Una pregunta individual con respuesta, imagen opcional y pista opcional
- **Usuario**: La persona que interactúa con el sistema para resolver los acertijos
- **Sesión**: Una ejecución completa del minijuego desde el inicio hasta la recompensa final
- **Progreso**: El avance del usuario medido en acertijos completados
- **Pista**: Ayuda opcional que el usuario puede solicitar para un acertijo específico
- **Recompensa_Final**: Contenido especial (mensaje, video o gif) mostrado al completar todos los acertijos
- **Validador**: Componente que verifica si una respuesta es correcta
- **Puntuación**: Valor numérico basado en tiempo y pistas utilizadas

## Requirements

### Requirement 1: Gestión de Acertijos Progresivos

**User Story:** Como usuaria, quiero resolver una secuencia de acertijos sobre momentos compartidos, para que pueda avanzar hacia la sorpresa final.

#### Acceptance Criteria

1. THE Sistema SHALL cargar entre 3 y 5 acertijos en secuencia ordenada
2. WHEN un acertijo es completado correctamente, THE Sistema SHALL desbloquear el siguiente acertijo
3. THE Sistema SHALL presentar exactamente un acertijo a la vez
4. THE Sistema SHALL mantener el orden de los acertijos durante toda la sesión
5. THE Sistema SHALL almacenar cada acertijo con identificador único, pregunta, respuesta y puntos asignados

### Requirement 2: Composición de Acertijos

**User Story:** Como usuaria, quiero que cada acertijo tenga texto claro y opcionalmente una imagen, para que pueda comprender mejor la pregunta.

#### Acceptance Criteria

1. THE Sistema SHALL mostrar el texto de la pregunta para cada acertijo
2. WHERE un acertijo incluye imagen, THE Sistema SHALL mostrar la imagen junto al texto
3. THE Sistema SHALL proporcionar un campo de entrada para la respuesta del usuario
4. THE Sistema SHALL aceptar respuestas en formato de texto
5. WHERE un acertijo tiene múltiples respuestas válidas, THE Sistema SHALL aceptar cualquiera de las respuestas configuradas

### Requirement 3: Validación de Respuestas

**User Story:** Como usuaria, quiero que el sistema valide mis respuestas con flexibilidad, para que errores de formato no impidan respuestas correctas.

#### Acceptance Criteria

1. WHEN el usuario envía una respuesta, THE Validador SHALL comparar la respuesta con la respuesta correcta
2. THE Validador SHALL normalizar las respuestas eliminando diferencias de mayúsculas y minúsculas
3. THE Validador SHALL normalizar las respuestas eliminando diferencias de acentos
4. THE Validador SHALL eliminar espacios en blanco iniciales y finales antes de validar
5. THE Validador SHALL retornar un resultado booleano indicando si la respuesta es correcta

### Requirement 4: Retroalimentación Visual Inmediata

**User Story:** Como usuaria, quiero recibir feedback visual inmediato sobre mis respuestas, para que sepa si avancé o debo intentar nuevamente.

#### Acceptance Criteria

1. WHEN una respuesta es correcta, THE Sistema SHALL mostrar un indicador visual de éxito con símbolo de verificación
2. WHEN una respuesta es incorrecta, THE Sistema SHALL mostrar un indicador visual de error con símbolo de cruz
3. THE Sistema SHALL mostrar el feedback dentro de 200 milisegundos después de la validación
4. THE Sistema SHALL mantener el feedback visible durante al menos 1 segundo
5. WHEN una respuesta es incorrecta, THE Sistema SHALL permitir al usuario intentar nuevamente

### Requirement 5: Visualización de Progreso

**User Story:** Como usuaria, quiero ver mi progreso en el juego, para que sepa cuántos acertijos he completado y cuántos faltan.

#### Acceptance Criteria

1. THE Sistema SHALL mostrar el número de acertijos completados
2. THE Sistema SHALL mostrar el número total de acertijos en la sesión
3. THE Sistema SHALL actualizar el indicador de progreso inmediatamente después de completar cada acertijo
4. THE Sistema SHALL mostrar el progreso en formato "X de N preguntas completadas"
5. THE Sistema SHALL calcular el porcentaje de progreso como (acertijos completados / total acertijos) multiplicado por 100

### Requirement 6: Sistema de Pistas Opcionales

**User Story:** Como usuaria, quiero solicitar pistas cuando me atoro, para que pueda avanzar sin frustración excesiva.

#### Acceptance Criteria

1. WHERE un acertijo incluye pista, THE Sistema SHALL mostrar un botón "¿Necesitas ayuda?"
2. WHEN el usuario solicita una pista, THE Sistema SHALL mostrar el texto de la pista para el acertijo actual
3. THE Sistema SHALL registrar cuando una pista es utilizada
4. THE Sistema SHALL permitir solicitar la pista múltiples veces para el mismo acertijo
5. WHERE un acertijo no incluye pista, THE Sistema SHALL ocultar el botón de ayuda

### Requirement 7: Recompensa Final

**User Story:** Como usuaria, quiero descubrir una sorpresa especial al completar todos los acertijos, para que el esfuerzo tenga una recompensa emocional.

#### Acceptance Criteria

1. WHEN todos los acertijos son completados correctamente, THE Sistema SHALL mostrar la Recompensa_Final
2. THE Sistema SHALL soportar recompensas en formato de mensaje de texto
3. THE Sistema SHALL soportar recompensas en formato de video
4. THE Sistema SHALL soportar recompensas en formato de imagen gif
5. THE Sistema SHALL mostrar la recompensa en pantalla completa o vista destacada
6. THE Sistema SHALL permitir al usuario cerrar o salir de la vista de recompensa

### Requirement 8: Temporizador Opcional

**User Story:** Como usuaria, quiero tener un temporizador opcional que agregue emoción al juego, para que la experiencia sea más dinámica.

#### Acceptance Criteria

1. WHERE el temporizador está habilitado, THE Sistema SHALL mostrar el tiempo transcurrido desde el inicio de la sesión
2. THE Sistema SHALL actualizar el temporizador cada segundo
3. THE Sistema SHALL continuar el temporizador durante toda la sesión
4. THE Sistema SHALL detener el temporizador cuando todos los acertijos sean completados
5. THE Sistema SHALL registrar el tiempo total utilizado para completar la sesión

### Requirement 9: Sistema de Puntuación

**User Story:** Como usuaria, quiero ver mi puntuación basada en mi desempeño, para que pueda medir qué tan bien resolví los acertijos.

#### Acceptance Criteria

1. THE Sistema SHALL asignar puntos base a cada acertijo completado correctamente
2. WHEN un usuario completa un acertijo sin usar pistas, THE Sistema SHALL otorgar los puntos completos del acertijo
3. WHEN un usuario utiliza una pista, THE Sistema SHALL reducir los puntos del acertijo en un porcentaje definido
4. WHERE el temporizador está habilitado, THE Sistema SHALL calcular bonificación por tiempo basada en la velocidad de resolución
5. THE Sistema SHALL calcular y mostrar la puntuación total al finalizar todos los acertijos
6. THE Sistema SHALL mantener la puntuación acumulada durante toda la sesión

### Requirement 10: Integración con Código de Cumpleaños

**User Story:** Como usuaria, quiero que el código de cumpleaños sea la primera pista del sistema, para que la experiencia sea coherente con el flujo de la aplicación.

#### Acceptance Criteria

1. THE Sistema SHALL recibir el código de cumpleaños como parámetro de entrada
2. THE Sistema SHALL utilizar el código de cumpleaños como contexto para el primer acertijo
3. THE Sistema SHALL verificar que el código de cumpleaños sea válido antes de iniciar la sesión
4. WHEN el código de cumpleaños es inválido, THE Sistema SHALL denegar el acceso a los acertijos
5. THE Sistema SHALL mostrar una referencia al código de cumpleaños en la introducción del juego

