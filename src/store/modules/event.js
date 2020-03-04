import EventService from '@/services/EventServices.js'

export const namespaced = true;

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
    createEvent({ commit, dispatch }, event) {

        return EventService.postEvent(event).then(() => {
            commit('ADD_EVENT', event)

            const notification = { type: 'success', message: 'Seu evento foi criado!' }
            dispatch('notification/add', notification, { root: true }) // notification/add = 'Module/action' e notification é o payload

        }).catch(error => {

            const notification = { type: 'error', message: 'Houve um problema ao criar o evento: ' + error.message }
            dispatch('notification/add', notification, { root: true }) // notification/add = 'Module/action' e notification é o payload
            throw error
        })
    },
    fetchEvents({ commit, dispatch }, { perPage, page }) {
        EventService.getEvents(perPage, page)
            .then(response => {
                commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))

                // commit é o context object 
                // response.data é o payload
                commit('SET_EVENTS', response.data)
            })
            .catch(error => {

                const notification = { type: 'error', message: 'Houve um problema ao buscar os eventos: ' + error.message }
                dispatch('notification/add', notification, { root: true }) // notification/add = 'Module/action' e notification é o payload

            })
    },
    fetchEvent({ commit, getters, dispatch }, id) {

        var event = getters.getEventById(id)

        if (event) {
            commit('SET_EVENT', event)
        } else {

            EventService.getEvent(id)
                .then(response => {
                    commit('SET_EVENT', response.data)
                })
                .catch(error => {
                    const notification = { type: 'error', message: 'Houve um problema ao buscar o evento: ' + error.message }
                    dispatch('notification/add', notification, { root: true }) // notification/add = 'Module/action' e notification é o payload
                })
        }
    }

}
export const getters = {
    getEventById: state => id => {
        return state.events.find(event => event.id === id)
    }
}
