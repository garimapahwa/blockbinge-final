const express = require('express');
const { PushAPI } = require('@pushprotocol/restapi');
const ethers = require('ethers');

const app = express();
const port = 3001;

app.use(express.json());

// Initialize push notifications
const initializePushNotifications = async () => {
  try {
    const signer = ethers.Wallet.createRandom();
    const user = await PushAPI.initialize(signer, { env: 'staging' });

    console.log('Push Notifications initialized:', user);
    return user;
  } catch (error) {
    console.error('Push Notifications initialization failed:', error);
    throw error;
  }
};

// Endpoint to send a message
app.post('/api/send-message', async (req, res) => {
  try {
    const { recipientAddress, content } = req.body;

    // Initialize push notifications
    const user = await initializePushNotifications();

    // Send a message
    const result = await user.chat.send(recipientAddress, { content });

    console.log('Message sent:', result);
    res.status(200).json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ success: false, message: 'Error sending message' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
