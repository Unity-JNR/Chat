<template>
  <div id="app">
    <p class="user-id">User ID: {{ getCurrentUserId }}</p>
    <div class="chat-container">
      <ul class="messages">
        <li v-for="(message, index) in messages" :key="index" :class="{'my-message': message.user_id === getCurrentUserId}">
          {{ message.user_id }}: {{ message.content }}
        </li>
      </ul>
      <div class="input-container">
        <input v-model="newMessage" @keyup.enter="handleSendMessage" placeholder="Type a message" class="chat-input" />
        <button @click="handleSendMessage" class="send-button">Send</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      newMessage: ''
    };
  },
  computed: {
    ...mapState({
      getCurrentUserId: state => state.currentUserId,
      messages: state => state.messages
    })
  },
  methods: {
    ...mapActions(['initSocket', 'sendMessageToServer']),
    handleSendMessage() {
      if (this.newMessage.trim()) {
        const msg = { content: this.newMessage, user_id: this.getCurrentUserId };
        this.sendMessageToServer(msg);
        this.newMessage = ''; // Reset the input field
      }
    }
  },
  mounted() {
    this.initSocket();
  }
};
</script>

<style scoped>
/* Reset some default browser styles */

body, ul, li {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  background: #D9D9D9;

}
/* General body styling */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
}
/* Container for the chat app */
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  padding: 20px;
}
/* User ID display */
.user-id {
  margin-bottom: 15px;
  padding: 10px;
  background: #dbecff;
  color: #000000;
  text-align: center;
  font-weight: bold;
  border-radius: 5px;
}
/* Chat container */
.chat-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 400px;
  max-height: 70vh;
  border: 1px solid #848484;
  border-radius: 8px;
  overflow: hidden;
}
/* Messages container */
.messages {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  background: #D9D9D9;
  /* box-shadow: inset -1px -1px 3px 1.5px gray; */
}
/* Individual message styling */
.messages li {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  max-width: 80%;
  word-wrap: break-word;
}
.my-message {
  background: #85f62f; /* Light green background for sent messages */
  align-self: flex-end;
  text-align: left;
}
.received {
  background: #fff8f8; /* Light gray background for received messages */
  align-self: flex-start;
  text-align: left;
}
/* Input container */
.input-container {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  background: #fff;
}
/* Input styling */
.chat-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  
}
/* Button styling */
.send-button {
  margin-left: 10px;
  padding: 10px 20px;
  background: #039B3D;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}
.send-button:hover {
  background: #0056B3;
}
</style>
