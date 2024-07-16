const express = require('express');
const bodyParser = require('body-parser');
const webPush = require('web-push');
const cors = require('cors');

const app = express();

// Verwende CORS
app.use(cors());

app.use(bodyParser.json());

const vapidKeys  = {
  publicKey: "BCEGrrF1VSHHkJAKVVkTVrWBEr7Be670xmAOHBcsV6beobw_fuURkTc6HltO0m0QYiIXZB4gpeFqQl_ZLQ2T2og",
  privateKey: "AOmBWSMZdW-s12H3K6G34VD1g3HnXu0LZ89RFnrWQMM"
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

let subscriptions = [];

app.post('/api/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
  console.log('Received subscription:', subscription);
});

app.post('/api/sendNotification', (req, res) => {
  const notificationPayload = req.body;

  const promises = [];
  subscriptions.forEach(subscription => {
    promises.push(
        webPush.sendNotification(subscription, JSON.stringify(notificationPayload))
    );
  });

  Promise.all(promises)
      .then(() => res.status(200).json({ message: 'Notification sent successfully.' }))
      .catch(err => {
        console.error('Error sending notification:', err);
        res.sendStatus(500);
      });
});

const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
