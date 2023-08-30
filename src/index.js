const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');

const jobs = require('./utils/job');

const TicketController = require('./controllers/ticket-controller');
const EmailService = require('./services/email-service');

const { subcribeMessage, createChannel } = require('./utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('./config/serverConfig');


const setupAndStartServer = async () => {
          const app = express();
          app.use(bodyParser.json());
          app.use(bodyParser.urlencoded({ extended: true }));


          app.post('/api/v1/tickets', TicketController.create);

          const channel = await createChannel();
          subcribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

          app.listen(PORT, () => {
                    console.log(`Server started at PORT: ${PORT}`);
                    // jobs();
          });
}

setupAndStartServer();