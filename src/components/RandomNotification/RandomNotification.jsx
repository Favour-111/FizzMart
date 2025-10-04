import React, { useState, useEffect } from "react";
import "./RandomNotification.css";

const RandomNotification = () => {
  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const users = [
    "Peter",
    "Olumide",
    "Chinonso",
    "Ngozi",
    "Uche",
    "Abiola",
    "Adebayo",
    "Toluwani",
    "Emeka",
    "Aminat",
    "Ayodele",
    "Kemi",
    "Titi",
    "Segun",
    "Olamide",
    "Adeola",
    "Chukwuemeka",
    "Micheal",
    "Temidayo",
    "Yemi",
    "Blessing",
    "Kofi",
    "Chika",
    "Folake",
    "Nkechi",
    "Funmi",
    "David",
    "Jibola",
    "Rita",
    "Ifeoma",
    "Seyi",
    "Sade",
    "Adebimpe",
    "Bukunmi",
    "Nnamdi",
    "Tayo",
    "Ademola",
    "Chizzy",
    "Nnena",
    "Kehinde",
    "Toluwalase",
    "Chinwe",
    "Tope",
    "Sunkanmi",
    "Durojaiye",
    "Ife",
    "Aina",
    "Zainab",
    "Aminu",
    "Yusuf",
    "Durojaiye",
    "Ireti",
    "Tolu",
    "Chuka",
    "Olamiposi",
    "Zainab",
    "John",
    "Ahmed",
    "Nifemi",
    "Titi",
    "Oluwafemi",
    "Folake",
    "Akin",
    "Nkechi",
    "Tomiwa",
    "Benita",
    "Joshua",
    "Omotola",
    "Shola",
    "Bola",
    "Adewale",
    "Ifeanyi",
    "Cynthia",
    "Tosin",
    "Emmanuel",
    "Precious",
    "Gbemisola",
    "Chibuzo",
    "Somtochukwu",
    "Adeyemi",
    "Folarin",
    "Lanre",
    "Stephanie",
    "Ayo",
    "Sandra",
    "Oluwadamilola",
    "Jide",
    "Adunni",
    "Kola",
    "Gideon",
    "Olufemi",
    "Deborah",
    "Adenike",
    "Kamilah",
    "Damola",
    "Oluwadamilola",
    "Adebisi",
    "Temiloluwa",
    "Olubukola",
    "Tomi",
    "Salewa",
    "Chris",
    "Oluwatobiloba",
    "Ayodeji",
    "Gbenga",
    "Eunice",
    "Samuel",
    "Oluwaseun",
    "Tunmise",
    "Ayotunde",
    "Olamide",
    "Folasade",
    "Abayomi",
    "Chijioke",
    "Kemi",
    "Ayotunde",
    "Chika",
    "Adeleke",
    "Oluwaseun",
    "Funmilayo",
    "Taiwo",
    "Oluwatimilehin",
    "Yetunde",
    "Ayomide",
    "Oluwatobiloba",
  ];

  // Remove duplicates using a Set
  const names = [...new Set(users)];

  // Function to get a random name
  const getRandomName = () => {
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
  };

  // Function to generate a random time (between 1 and 60 minutes)
  const getRandomTime = () => {
    const randomMinutes = Math.floor(Math.random() * 60) + 1; // Random minutes between 1 and 60
    return `${randomMinutes} min Ago`;
  };

  // Function to generate a notification
  const generateNotification = () => {
    const name = getRandomName();
    const time = getRandomTime();
    setNotification({ message: `${name} just bought an item!`, time });
    setIsVisible(true);

    // Auto close the notification after 3 seconds
    setTimeout(() => {
      setIsVisible(false); // Close the notification after 3 seconds
    }, 5000);
  };

  // Effect to handle random notifications every 12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isVisible) {
        // Only generate a new notification if the previous one is not visible
        generateNotification();
      }
    }, 12000); // 12 seconds minimum wait between notifications

    return () => clearInterval(interval); // Cleanup on unmount
  }, [isVisible]); // Re-run effect when the visibility changes

  return (
    <div>
      {isVisible && notification && (
        <div className="notification shadow-sm">
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
              alt="Notification Icon"
            />
          </div>
          <div>
            <div>{notification.message}!!</div>
            <div className="time">{notification.time}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomNotification;
