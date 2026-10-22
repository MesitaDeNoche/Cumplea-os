# SPEC-006: Botiquín de Emergencia

> **Tipo**: Feature  
> **Estado**: Requirements Completed  
> **Workflow**: Requirements-First  

---
# Requirements Document

## Introduction

El Botiquín de Emergencia es un módulo de refugio digital dentro de la aplicación web de cumpleaños que proporciona apoyo emocional inmediato. El sistema incluye un botón SOS principal que envía notificaciones reales (email, WhatsApp, SMS) al destinatario para situaciones de urgencia, acompañado de botones de apoyo secundarios que ofrecen contenido reconfortante instantáneo sin requerir notificaciones externas.

Este módulo está diseñado como un espacio seguro y accesible que combina comunicación real en emergencias con recursos de apoyo emocional inmediato.

## Glossary

- **Botiquin_System**: El sistema completo del módulo de refugio digital
- **SOS_Button**: Botón principal de alerta para situaciones de ayuda urgente
- **Support_Button**: Botones secundarios que proporcionan apoyo emocional (risa, ánimo, etc.)
- **Notification_Service**: Servicio backend que envía notificaciones reales vía email, WhatsApp o SMS
- **Emergency_Page**: Página principal del refugio digital que contiene todos los botones
- **User**: La persona que recibe el regalo de cumpleaños y accede al botiquín
- **Recipient**: La persona que recibe las notificaciones de emergencia (el desarrollador/pareja)
- **Authenticated_Session**: Sesión activa después de ingresar el código de cumpleaños
- **Notification_Channel**: Medio de comunicación (Email, WhatsApp, SMS)
- **Delivery_Confirmation**: Confirmación visual de que la notificación fue enviada exitosamente
- **Voice_Message**: Mensaje de audio pregrabado que se reproduce al presionar un botón de apoyo
- **Internal_Joke**: Contenido humorístico personalizado compartido entre la pareja
- **Mood_Support_Content**: Contenido diseñado para mejorar el estado emocional del usuario

## Requirements

### Requirement 1: SOS Emergency Notification System

**User Story:** As a user experiencing an emotional emergency, I want to send a real notification to my partner, so that they know I need urgent help and can respond immediately.

#### Acceptance Criteria

1. WHEN the User presses the SOS_Button, THE Botiquin_System SHALL send a notification request to the Notification_Service within 500 milliseconds
2. WHEN the Notification_Service receives a notification request, THE Notification_Service SHALL attempt delivery via at least one Notification_Channel (Email, WhatsApp, or SMS)
3. WHEN the Notification_Service successfully sends a notification, THE Notification_Service SHALL return a success response with delivery timestamp and channel used
4. WHEN the Notification_Service fails to send via the primary channel, THE Notification_Service SHALL attempt delivery via a fallback channel
5. WHEN all notification channels fail, THE Notification_Service SHALL return an error response with failure reason
6. THE notification message SHALL include timestamp, user identifier, and emergency alert context
7. WHEN the SOS_Button is pressed, THE Emergency_Page SHALL display a loading state until the Notification_Service responds
8. WHEN the Notification_Service returns a success response, THE Emergency_Page SHALL display a Delivery_Confirmation to the User
9. IF the Notification_Service returns an error response, THEN THE Emergency_Page SHALL display an error message with retry option

### Requirement 2: Email Notification Delivery

**User Story:** As a user pressing the SOS button, I want my partner to receive an email notification, so that they are alerted even if they're not checking their phone.

#### Acceptance Criteria

1. WHERE Email is configured as a Notification_Channel, THE Notification_Service SHALL send emails to the configured Recipient email address
2. THE email notification SHALL include subject line "🚨 SOS - Necesito tu ayuda urgente"
3. THE email notification SHALL include sender name "Botiquín de Emergencia"
4. THE email notification SHALL include message body with timestamp, personalized message, and call-to-action
5. WHEN the email delivery succeeds, THE Notification_Service SHALL log the successful delivery with message ID
6. IF the email delivery fails, THEN THE Notification_Service SHALL log the error details and attempt fallback channel

### Requirement 3: WhatsApp Notification Delivery

**User Story:** As a user pressing the SOS button, I want my partner to receive a WhatsApp message, so that they see the notification immediately on their most-used messaging app.

#### Acceptance Criteria

1. WHERE WhatsApp is configured as a Notification_Channel, THE Notification_Service SHALL send WhatsApp messages to the configured Recipient phone number
2. THE WhatsApp notification SHALL include message text "🚨 SOS del Botiquín de Emergencia: [User] necesita tu ayuda urgente ahora"
3. THE WhatsApp notification SHALL include timestamp in the message
4. WHEN the WhatsApp delivery succeeds, THE Notification_Service SHALL receive delivery confirmation from the WhatsApp API
5. IF the WhatsApp API returns an error, THEN THE Notification_Service SHALL log the error and attempt fallback channel

### Requirement 4: SMS Notification Delivery

**User Story:** As a user pressing the SOS button, I want my partner to receive an SMS text message, so that they are notified even without internet connectivity.

#### Acceptance Criteria

1. WHERE SMS is configured as a Notification_Channel, THE Notification_Service SHALL send SMS messages to the configured Recipient phone number
2. THE SMS notification SHALL include message text "SOS Botiquin: [User] necesita tu ayuda urgente. Responde cuando puedas."
3. THE SMS message SHALL not exceed 160 characters
4. WHEN the SMS delivery succeeds, THE Notification_Service SHALL receive delivery status from the SMS provider
5. IF the SMS delivery fails, THEN THE Notification_Service SHALL log the error details

### Requirement 5: Notification Channel Configuration

**User Story:** As the developer deploying the system, I want to configure notification channels via environment variables, so that I can control which notification methods are active without code changes.

#### Acceptance Criteria

1. THE Notification_Service SHALL read Email configuration from environment variables (SMTP host, port, credentials, recipient email)
2. THE Notification_Service SHALL read WhatsApp configuration from environment variables (API token, sender phone, recipient phone)
3. THE Notification_Service SHALL read SMS configuration from environment variables (API token, sender phone, recipient phone)
4. THE Notification_Service SHALL validate all configuration values at startup
5. IF required configuration is missing, THEN THE Notification_Service SHALL log a warning and disable that Notification_Channel
6. THE Notification_Service SHALL support multiple active channels simultaneously
7. THE Notification_Service SHALL define channel priority order via configuration (default: WhatsApp → Email → SMS)

### Requirement 6: "Necesito Reírme" Support Button

**User Story:** As a user feeling down, I want to press a "Necesito Reírme" button and see a funny internal joke, so that I can lighten my mood without needing external help.

#### Acceptance Criteria

1. THE Emergency_Page SHALL display a Support_Button labeled "Necesito Reírme 😄"
2. WHEN the User presses the "Necesito Reírme" Support_Button, THE Emergency_Page SHALL display an Internal_Joke within 200 milliseconds
3. THE Internal_Joke SHALL be displayed in a modal or dedicated content area with pleasant styling
4. THE Emergency_Page SHALL support multiple Internal_Jokes and rotate them on repeated button presses
5. THE Emergency_Page SHALL include a close button to dismiss the Internal_Joke display
6. THE "Necesito Reírme" interaction SHALL NOT trigger any external notifications

### Requirement 7: "Necesito Ánimo" Support Button

**User Story:** As a user needing encouragement, I want to press a "Necesito Ánimo" button and hear or read an encouraging message, so that I feel supported without waiting for a response.

#### Acceptance Criteria

1. THE Emergency_Page SHALL display a Support_Button labeled "Necesito Ánimo 💪"
2. WHEN the User presses the "Necesito Ánimo" Support_Button, THE Emergency_Page SHALL display or play Mood_Support_Content within 300 milliseconds
3. WHERE a Voice_Message is available, THE Emergency_Page SHALL play the audio file with playback controls
4. WHERE no Voice_Message is available, THE Emergency_Page SHALL display a text-based encouraging message
5. THE Emergency_Page SHALL support multiple encouraging messages and rotate them on repeated button presses
6. THE audio player SHALL include play, pause, and volume controls
7. THE "Necesito Ánimo" interaction SHALL NOT trigger any external notifications

### Requirement 8: Emergency Page Interface

**User Story:** As a user accessing the refuge, I want to see a clean, calming interface with all support options clearly visible, so that I can quickly get the help I need.

#### Acceptance Criteria

1. THE Emergency_Page SHALL display a welcoming header with text "Tu Refugio Digital 🌟"
2. THE Emergency_Page SHALL display the SOS_Button prominently with high visual priority (large size, distinct color)
3. THE Emergency_Page SHALL display all Support_Button options in a clear, organized layout
4. THE Emergency_Page SHALL use calming colors and gentle animations
5. THE Emergency_Page SHALL be fully responsive for mobile, tablet, and desktop viewports
6. THE Emergency_Page SHALL load all critical resources within 2 seconds on a standard connection
7. WHILE the Emergency_Page is loading, THE Botiquin_System SHALL display a loading indicator

### Requirement 9: Authentication and Access Control

**User Story:** As the developer, I want the Emergency Page to be accessible only to authenticated users, so that the personal content remains private and secure.

#### Acceptance Criteria

1. WHEN a non-authenticated user attempts to access the Emergency_Page, THE Botiquin_System SHALL redirect them to the authentication page
2. WHEN a user has an Authenticated_Session, THE Botiquin_System SHALL allow access to the Emergency_Page
3. THE Emergency_Page SHALL be accessible via a direct URL route (e.g., /botiquin-emergencia)
4. THE main dashboard SHALL include a navigation link to the Emergency_Page labeled "Botiquín de Emergencia"
5. THE Emergency_Page SHALL maintain the Authenticated_Session throughout user interactions

### Requirement 10: SOS Button Rate Limiting

**User Story:** As the developer, I want to prevent accidental multiple SOS notifications, so that the recipient doesn't receive spam notifications from repeated button presses.

#### Acceptance Criteria

1. WHEN the User presses the SOS_Button, THE Botiquin_System SHALL disable the button for 30 seconds
2. WHILE the SOS_Button is disabled, THE Emergency_Page SHALL display countdown timer showing seconds remaining
3. WHEN the rate limit period expires, THE Botiquin_System SHALL re-enable the SOS_Button
4. THE Emergency_Page SHALL display a message during rate limit: "Notificación enviada. Podrás enviar otra en [X] segundos"
5. IF the User presses the disabled SOS_Button, THEN THE Emergency_Page SHALL not send additional notifications

### Requirement 11: Notification Content Personalization

**User Story:** As a user sending an SOS, I want the notification to include personalized context, so that my partner understands the situation better.

#### Acceptance Criteria

1. THE notification message SHALL include the User's preferred name or nickname
2. THE notification message SHALL include the exact timestamp of the SOS trigger
3. THE notification message SHALL include a direct link to respond or call back (where applicable)
4. WHERE Email is used, THE notification SHALL include a personalized greeting and closing
5. THE notification message SHALL be written in Spanish to match the application language

### Requirement 12: Error Handling and User Feedback

**User Story:** As a user pressing the SOS button, I want clear feedback about what's happening, so that I know whether my notification was sent successfully or if I need to try again.

#### Acceptance Criteria

1. WHILE the notification is being sent, THE Emergency_Page SHALL display loading state with text "Enviando notificación..."
2. WHEN the notification succeeds, THE Emergency_Page SHALL display success message: "✓ Notificación enviada exitosamente a través de [channel]"
3. IF the notification fails, THEN THE Emergency_Page SHALL display error message: "✗ Error al enviar. Por favor intenta de nuevo"
4. WHEN an error occurs, THE Emergency_Page SHALL display a retry button
5. THE success or error message SHALL remain visible for 5 seconds before auto-dismissing
6. THE Emergency_Page SHALL log all notification attempts (success and failure) for debugging purposes

### Requirement 13: Backend API Endpoints

**User Story:** As a frontend developer, I want well-defined API endpoints for emergency notifications, so that I can integrate the SOS functionality reliably.

#### Acceptance Criteria

1. THE Notification_Service SHALL expose endpoint POST /api/emergency/sos
2. THE /api/emergency/sos endpoint SHALL accept JSON request body with fields: userId, timestamp, message (optional)
3. THE /api/emergency/sos endpoint SHALL validate all required fields and return 400 Bad Request if validation fails
4. WHEN the notification is sent successfully, THE endpoint SHALL return 200 OK with response body containing: success, channel, timestamp, deliveryId
5. IF the notification fails, THEN THE endpoint SHALL return 500 Internal Server Error with error details
6. THE endpoint SHALL implement request timeout of 10 seconds
7. THE endpoint SHALL log all requests with timestamp, userId, and result status

### Requirement 14: Content Management for Support Buttons

**User Story:** As the developer, I want to easily update jokes and encouragement messages without code changes, so that I can keep the content fresh and personalized.

#### Acceptance Criteria

1. THE Botiquin_System SHALL load Internal_Jokes from a JSON configuration file or environment variable
2. THE Botiquin_System SHALL load Mood_Support_Content from a JSON configuration file or environment variable
3. WHERE audio Voice_Messages are used, THE Botiquin_System SHALL load audio file URLs from configuration
4. THE configuration SHALL support multiple entries for each content type
5. THE Emergency_Page SHALL randomly select content from available options on each button press
6. THE configuration format SHALL be documented in a README or inline comments

### Requirement 15: Accessibility and Usability

**User Story:** As a user in emotional distress, I want the interface to be easy to use with minimal cognitive load, so that I can get help quickly without confusion.

#### Acceptance Criteria

1. THE SOS_Button SHALL have minimum touch target size of 48x48 pixels for mobile accessibility
2. THE Emergency_Page SHALL support keyboard navigation for all interactive elements
3. THE Emergency_Page SHALL include ARIA labels for screen reader compatibility
4. THE SOS_Button SHALL have high color contrast ratio (minimum 4.5:1) for visibility
5. THE button labels SHALL use clear, simple language in Spanish
6. THE Emergency_Page SHALL not include any distracting animations during SOS notification process
7. THE Emergency_Page SHALL maintain focus management for keyboard users

### Requirement 16: Performance and Reliability

**User Story:** As a user in an emergency, I want the notification to be sent as quickly and reliably as possible, so that I get help without delays.

#### Acceptance Criteria

1. THE Notification_Service SHALL process notification requests within 500 milliseconds (excluding external API latency)
2. THE Notification_Service SHALL implement retry logic with exponential backoff for failed API calls (max 3 retries)
3. THE Notification_Service SHALL have uptime target of 99.5%
4. THE Emergency_Page SHALL function correctly with network latency up to 1000 milliseconds
5. THE Botiquin_System SHALL handle concurrent SOS requests from the same user gracefully (using rate limiting)
6. THE audio files for Voice_Messages SHALL be optimized to load within 1 second

### Requirement 17: Security and Privacy

**User Story:** As a user, I want my emergency notifications to be secure and private, so that sensitive information is protected.

#### Acceptance Criteria

1. THE Notification_Service SHALL transmit all notification requests over HTTPS
2. THE Notification_Service SHALL store API credentials securely in environment variables (not in code)
3. THE Notification_Service SHALL not log sensitive information (API tokens, personal phone numbers)
4. THE Emergency_Page SHALL validate user authentication before allowing access to any functionality
5. THE Notification_Service SHALL implement rate limiting at IP level to prevent abuse (max 10 requests per IP per hour)
6. THE SOS notification content SHALL not include sensitive personal data beyond timestamp and user name

### Requirement 18: Integration with Dashboard

**User Story:** As a user navigating the birthday app, I want easy access to the Emergency Page from the main dashboard, so that I can reach it quickly when needed.

#### Acceptance Criteria

1. THE main dashboard SHALL display a clearly labeled button or card for "Botiquín de Emergencia"
2. WHEN the User clicks the dashboard button, THE Botiquin_System SHALL navigate to the Emergency_Page
3. THE dashboard button SHALL include an appropriate icon (e.g., first aid kit emoji 🩹 or ❤️‍🩹)
4. THE Emergency_Page SHALL include a back button to return to the dashboard
5. THE navigation transition SHALL be smooth and complete within 300 milliseconds

### Requirement 19: Voice Message Audio Player

**User Story:** As a user listening to an encouraging voice message, I want functional audio controls, so that I can replay or pause the message as needed.

#### Acceptance Criteria

1. WHERE a Voice_Message is played, THE Emergency_Page SHALL display a custom audio player interface
2. THE audio player SHALL include a play/pause toggle button
3. THE audio player SHALL include a progress bar showing playback position
4. THE audio player SHALL include a volume slider or mute button
5. THE audio player SHALL display total duration and current time
6. WHEN the audio finishes playing, THE audio player SHALL reset to the beginning
7. THE audio player SHALL work on all supported browsers (Chrome, Firefox, Safari, Edge)

### Requirement 20: Future Extensibility for Additional Support Buttons

**User Story:** As the developer, I want the system architecture to support adding new support buttons easily, so that the refuge can grow with more types of emotional support.

#### Acceptance Criteria

1. THE Emergency_Page component architecture SHALL support dynamic rendering of Support_Button components
2. THE content configuration SHALL support adding new button types without code changes
3. Each Support_Button configuration SHALL specify: label, icon, content type (text, audio, video), and content references
4. THE Emergency_Page SHALL render all configured Support_Buttons in the defined layout
5. THE system documentation SHALL include instructions for adding new support button types


