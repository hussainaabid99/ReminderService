# Reminder Service

Automated notifications and reminders microservice for the Airline Booking & Operations Backend.

## 🔗 Related Microservices

- [API Gateway](https://github.com/hussainaabid99/API_Gateway) - Service routing and authentication
- [Auth Service](https://github.com/hussainaabid99/Auth_Service) - Authentication and user management
- [Flights & Search Service](https://github.com/hussainaabid99/FlightsAndSearchService) - Flight catalog and search
- [Air Ticket Booking Service](https://github.com/hussainaabid99/AirTicketBookingService) - Booking orchestration

## 🎯 Overview

The Reminder Service handles automated notifications and email delivery through message queue consumption and scheduled background jobs. It processes reminder events and ensures timely delivery of important notifications.

## ✨ Features

- **Event Consumption**: RabbitMQ message queue processing
- **Email Delivery**: Automated email notifications via Nodemailer
- **Scheduled Jobs**: Cron-based background processing
- **Status Tracking**: Notification delivery status management
- **Queue Management**: Reliable message processing with acknowledgments

## 🛠️ Technology

- Node.js + Express.js
- RabbitMQ (amqplib)
- Nodemailer for email delivery
- node-cron for scheduled jobs
- Sequelize ORM with MySQL

## 🚀 Quick Start

```bash
npm install
# Create .env file with required variables
# Create src/config/config.json for database
npx sequelize db:create
npx sequelize db:migrate
npm start
```

## ⚙️ Configuration

### Environment Variables (.env)
```env
PORT=3004
EMAIL_ID=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
MESSAGE_BROKER_URL=amqp://localhost
EXCHANGE_NAME=REMINDER_EXCHANGE
REMINDER_BINDING_KEY=REMINDER_SERVICE
```

### Database Configuration
Create `src/config/config.json`:
```json
{
  "development": {
    "username": "your_db_username",
    "password": "your_db_password",
    "database": "reminder_service_dev",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### Email Configuration
- Gmail SMTP configuration
- App password required (not regular password)
- Supports custom email templates

## �� API Endpoints

### Notification Management
- `POST /api/v1/tickets` - Create notification ticket
  - Body: `{
    "subject": "Flight Reminder",
    "content": "Your flight departs in 2 hours",
    "recepientEmail": "passenger@example.com",
    "notificationTime": "2025-01-08T10:00:00"
  }`

## 🔄 Message Queue Integration

### Queue Configuration
- **Exchange**: Direct exchange (`REMINDER_EXCHANGE`)
- **Queue**: `REMINDER_QUEUE`
- **Binding Key**: `REMINDER_SERVICE`

### Event Processing
The service consumes messages and routes them based on service type:

1. **CREATE_TICKET**: Creates notification record
2. **SEND_BASIC_EMAIL**: Sends immediate email

### Message Flow

Producer → Exchange → Queue → Consumer → Email Service


## ⏰ Background Job Processing

### Cron Schedule
- **Frequency**: Every 2 minutes
- **Purpose**: Process pending notifications
- **Logic**: Find tickets ready for delivery

### Job Workflow
1. Query pending tickets (`status: PENDING`)
2. Check notification timing
3. Send emails via Nodemailer
4. Update ticket status to `SUCCESS`

## ��️ Database Models

### NotificationTicket Model
```javascript
{
  id: INTEGER (Primary Key),
  subject: STRING (Email subject),
  content: STRING (Email body),
  recepientEmail: STRING (Recipient email),
  status: ENUM ('PENDING', 'SUCCESS', 'FAILED'),
  notificationTime: DATE (Scheduled delivery time),
  createdAt: DATE,
  updatedAt: DATE
}
```

## 📧 Email Delivery

### SMTP Configuration
- **Service**: Gmail
- **Authentication**: App-specific password
- **Transport**: Nodemailer SMTP

### Email Features
- HTML and text email support
- Customizable subject and content
- Delivery status tracking
- Error handling and retry logic

## 🔄 Service Integration

### Event Subscription
- Listens to RabbitMQ messages
- Processes multiple event types
- Maintains message acknowledgment

### Cross-Service Communication
- Receives events from Booking Service
- Creates notification records
- Triggers email delivery workflows

## 🚨 Error Handling

### Queue Errors
- Connection failure handling
- Message acknowledgment failures
- Retry mechanisms

### Email Errors
- SMTP connection issues
- Invalid email addresses
- Delivery failures

## 📊 Notification Statuses

1. **PENDING**: Created, waiting for delivery time
2. **SUCCESS**: Email delivered successfully
3. **FAILED**: Delivery attempt failed

## 🚀 Future Improvements

- Email template system
- Multiple notification channels (SMS, push)
- Retry mechanisms with exponential backoff
- Notification preferences management
- Delivery analytics and reporting
- Webhook support for external services

## 📝 Development Notes

- Gmail requires app-specific passwords
- Cron jobs run every 2 minutes for development
- Queue messages are acknowledged after processing
- Email delivery is asynchronous
- Service maintains message processing state
- Database tracks all notification attempts
