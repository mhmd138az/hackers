// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyF9fJDno6O3u50C9vmhvRW3dPtUvtN_k",
  authDomain: "hacker-fff74.firebaseapp.com",
  databaseURL: "https://hacker-fff74-default-rtdb.firebaseio.com",
  projectId: "hacker-fff74",
  storageBucket: "hacker-fff74.firebasestorage.app",
  messagingSenderId: "175099977802",
  appId: "1:175099977802:web:636a1f0a6a57d6892386b3",
  measurementId: "G-QRT0KR925R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Get references to HTML elements
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Function to write a message to Firebase
function writeMessage(message) {
  const messageRef = ref(db, 'messages/' + Date.now());
  set(messageRef, {
    message: message,
    timestamp: Date.now()
  });
}

// Function to display messages
function displayMessages(messages) {
  messagesDiv.innerHTML = '';
  messages.forEach(message => {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message.message;
    messagesDiv.appendChild(messageDiv);
  });
}

// Function to get messages from Firebase
function getMessages() {
  const messagesRef = ref(db, 'messages/');
  get(messagesRef).then((snapshot) => {
    if (snapshot.exists()) {
      const messages = Object.values(snapshot.val());
      displayMessages(messages);
    } else {
      console.log("No messages found");
    }
  }).catch((error) => {
    console.error("Error getting messages: ", error);
  });
}

// Event listener for the send button
sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    writeMessage(message);
    messageInput.value = ''; // Clear input field
    getMessages(); // Refresh message list
  }
});

// Initially load messages
getMessages();