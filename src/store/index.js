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
    CLEAR_MESSAGES(state) {
      state.messages.splice(0, state.messages.length);
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
    fetchMessagesFromServer({ state }) {
      if (state.socket) {
        state.socket.on('chat message', (message) => {
          state.commit('ADD_MESSAGE', message);
        });
      }
    },
  },
});
