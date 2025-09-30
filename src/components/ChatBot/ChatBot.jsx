import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v0/inject.js";
    script.id = "bp-webchat";
    script.setAttribute("data-bot-id", "your-bot-id"); // Replace with your bot ID
    script.setAttribute("data-host", "http://localhost:3000"); // Replace with your BotPress server URL
    script.setAttribute("data-chat-title", "Chat with us!");
    script.setAttribute("data-autoshow", "true");
    script.setAttribute("data-embed", "true");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div>{/* The bot chat window will be injected into this div */}</div>;
};

export default Chatbot;
