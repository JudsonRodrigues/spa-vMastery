import Vue from 'vue'
import Vuex from 'vuex'

import EventService from '@/services/EventServices.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: []
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {



      state.events = events
    }
  },
  actions: {
    // commit é o context object 
    // event é o payload
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {

          console.log('Total events are ' + response.headers['x-total-count'])

          // commit é o context object 
          // response.data é o payload
          console.log('response', commit)

          commit('SET_EVENTS', response.data)
        })
        .catch(error => console.log('Houve um erro:' + error.response))
    }

  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
