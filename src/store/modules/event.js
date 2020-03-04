import EventService from '@/services/EventServices.js'

export const state = {
    events: [],
    eventsTotal: 0,
    event: {}
}

export const mutations = {
    ADD_EVENT(state, event) {
        state.events.push(event)
    },
    SET_EVENTS(state, events) {
        state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
        state.eventsTotal = eventsTotal
    },
    SET_EVENT(state, event) {
        state.event = event
    }
}
export const actions = {
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
                commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))

                // commit é o context object 
                // response.data é o payload
                commit('SET_EVENTS', response.data)
            })
            .catch(error => console.log('Houve um erro:' + error.response))
    },
    fetchEvent({ commit, getters }, id) {

        var event = getters.getEventById(id)

        if (event) {
            commit('SET_EVENT', event)
        } else {

            EventService.getEvent(id)
                .then(response => {
                    commit('SET_EVENT', response.data)
                })
                .catch(error => {
                    console.log('houve um erro:' + error.response)
                })
        }
    }

}
export const getters = {
    getEventById: state => id => {
        return state.events.find(event => event.id === id)
    }
}
