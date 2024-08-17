import { createStore } from 'vuex';
import io from 'socket.io-client';

export default createStore({
  state: {
    socket: null,
    messages: [],
    currentUserId: null,
  },
  mutations: {
    SET_SOCKET(state, socket) {
      state.socket = socket;
    },
    ADD_MESSAGE(state, message) {
      state.messages.push(message);
    },
    SET_MESSAGES(state, messages) {
      state.messages = messages;
    },
    SET_CURRENT_USER_ID(state, id) {
      state.currentUserId = id;
    },
  },
  actions: {
    initSocket({ commit, state }) {
      if (!state.socket) {
        const socket = io('https://backend-server-iqvp.onrender.com/', {
          transports: ['websocket'],
          path: '/chat',
          withCredentials: true,
        });
        commit('SET_SOCKET', socket);

        socket.on('userId', (id) => {
          commit('SET_CURRENT_USER_ID', id);
        });

        socket.on('previous messages', (messages) => {
          commit('SET_MESSAGES', messages);
        });

        socket.on('chat message', (message) => {
          commit('ADD_MESSAGE', message);
        });
      }
    },
    sendMessageToServer({ state }, message) {
      if (state.socket) {
        state.socket.emit('chat message', message);
      }
    },
    fetchMessagesFromServer({ commit, state }) {
      if (state.socket) {
        state.socket.on('chat message', (message) => {
          commit('ADD_MESSAGE', message);
        });
      }
    },
  },
});
