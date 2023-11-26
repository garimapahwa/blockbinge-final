import React, { useState, useEffect } from 'react';
import ChatBot from 'react-simple-chatbot';
import { Segment, Button } from 'semantic-ui-react';
import { PushAPI } from '@pushprotocol/restapi';
import { ethers } from 'ethers';
import styles from './style';
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";

const App = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const chatbotStyle = {
    chatContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginTop: '10px', // Adjust the value as needed
  };

  const containerStyle = {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column', // Stack items vertically
    alignItems: 'center', // Center items horizontally
    marginTop: '20px', // Adjust this value to move the entire container up
  };

  const steps = [
    {
      id: 'Greet',
      message: 'Hello, Welcome to our website',
      trigger: 'Ask Name'
    },
    {
      id: 'Ask Name',
      message: 'Please enter your name',
      trigger: 'waiting1'
    },
    {
      id: 'waiting1',
      user: true,
      trigger: 'Name'
    },
    {
      id: 'Name',
      message: 'Hi {previousValue}, Please select your issue',
      trigger: 'issues'
    },
    {
      id: 'issues',
      options: [
        { value: 'React', label: 'React', trigger: 'React' },
        { value: 'Angular', label: 'Angular', trigger: 'Angular' }],
    },
    {
      id: 'React',
      message: 'Thanks for telling your react issue',
      end: true
    },
    {
      id: 'Angular',
      message: 'Thanks for telling your angular issue',
      end: true
    }
  ];

  const handleButtonClick = async () => {
    setShowChatbot(true);

    // Example: Sending a message to the backend to trigger push notification
    try {
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipientAddress: '0x99A08ac6254dcf7ccc37CeC662aeba8eFA666666',
          content: "Gm gm! It's a me... Mario",
        }),
      });

      if (response.ok) {
        console.log('Message sent successfully');
      } else {
        console.error('Error sending message:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    const initializePushNotifications = async () => {
      try {
        // Using a random signer for demonstration
        const signer = ethers.Wallet.createRandom();

        // Initialize wallet user, pass 'prod' instead of 'staging' for mainnet apps
        const user = await PushAPI.initialize(signer, { env: 'staging' });

        // Now you can use 'user' for push notifications
        console.log('Push Notifications initialized:', user);
      } catch (error) {
        console.error('Push Notifications initialization failed:', error);
      }
    };

    initializePushNotifications();
  }, []);

  return (
    <div>
      <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>

        <div className={`bg-primary ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <Hero />
          </div>
        </div>

        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div style={containerStyle}>
            {/* Button to open the chatbot */}
            <Button style={buttonStyle} onClick={handleButtonClick}>
              Open Chat
            </Button>

            {/* Chatbot component */}
            {showChatbot && (
              <Segment floated="right" style={{ marginTop: '20px' }}>
                <ChatBot steps={steps} style={chatbotStyle} />
              </Segment>
            )}

            {/* Other components */}
            <Stats />
            <Business />
            <Billing />
            <CardDeal />
            <Testimonials />
            <Clients />
            <CTA />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
