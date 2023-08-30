const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');

const jobs = require('./utils/job');

// const { sendBasicEmail } = require('./services/email-service');
const TicketController = require('./controllers/ticket-controller');

const setupAndStartServer = () => {
          const app = express();
          app.use(bodyParser.json());
          app.use(bodyParser.urlencoded({ extended: true }));

          app.post('/api/v1/tickets', TicketController.create);

          app.listen(PORT, () => {
                    console.log(`Server started at PORT: ${PORT}`);
                    jobs();

                    // sendBasicEmail(
                    //           'support@admin.com',
                    //           'notificationservice20@gmail.com',
                    //           'This is a testing email',
                    //           'Hey, how are you, I hope you like the support'
                    // );



          });
}

setupAndStartServer();