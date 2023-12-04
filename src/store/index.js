import Vue from 'vue';
import Vuex from 'vuex';
import {debounce} from 'lodash'
import { nanoid } from 'nanoid'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        price: 0,
        quantity: 0,
        total: 0,
        firstChanged: null,
        localStorageState: null,
        events: []
    },
    getters: {
        localStorageReqObject (state) {
            return {
                price: state.price,
                quantity: state.quantity,
                total: state.total,
                nonce: Date.now()
            }
        },
        serverResponse: (state, getters) => getters.localStorageReqObject.total % 2 === 0
    },
    actions: {
        updatePrice: ({commit, state, dispatch }, payload) => {
            if (!payload && state.firstChanged === 'price') {
                dispatch('resetFieldsState')
                return
            }
            const total = state.quantity * payload
            if(!state.firstChanged) {
                commit('setFirstChanged', 'price')
            }
            commit('setPrice', payload)
            commit('setTotal', total)
        },
        updateQuantity: ({commit, state, dispatch}, payload) => {
            if (!payload && state.firstChanged === 'quantity') {
                dispatch('resetFieldsState')
                return
            }
            const total = state.price * payload
            if(!state.firstChanged) {
                commit('setFirstChanged', 'quantity')
            }
            commit('setQuantity', payload)
            commit('setTotal', total)
        },
        updateTotal: ({commit, state, dispatch }, payload) => {
            commit('setTotal', payload)
            if (!state.quantity && !state.price) {
                commit('setTotal', 0)
                return
            }
            if (!payload) {
                dispatch('resetFieldsState')
                return
            }
            if (state.firstChanged === 'quantity') {
                const price = payload / state.quantity
                commit('setPrice', price)
                return
            }

            const quantity = payload / state.price
            commit('setQuantity', quantity)
        },
        updateEvents: ({ commit}, payload) => {
            if (payload.type === 'setPrice') {
                commit('setEvents', `Поле Цена было изменено со значением ${payload.payload}`)
            }
            if (payload.type === 'setQuantity') {
                commit('setEvents', `Поле Количество было изменено со значением ${payload.payload}`)
            }
            if (payload.type === 'setTotal') {
                commit('setEvents', `Поле Сумма было изменено со значением ${payload.payload}`)
            }
        },
        resetFieldsState: ({ commit}) => {
            commit('setPrice', 0)
            commit('setQuantity', 0)
            commit('setTotal', 0)
        },
       async saveToLocal ({getters, commit, state})  {
           commit('setEvents', `Текущий localStorage: ${state.localStorageState}, отправили в localStorage: ${JSON.stringify(getters.localStorageReqObject)}`)
            const debouncedFunc = await debounce( () => {
               if (getters.serverResponse) {
                   localStorage.setItem('obj', JSON.stringify(getters.localStorageReqObject))
                   commit('setLocalStorageState', localStorage.getItem('obj'))
               }
                commit('setEvents', `Текущий localStorage: ${state.localStorageState}, ответ сервера: ${getters.serverResponse}`)
           }, 1000)
           debouncedFunc()
        }
    },
    mutations: {
        setPrice: (state, payload) => {
            state.price = payload
        },
        setQuantity: (state, payload) => {
            state.quantity = payload
        },
        setTotal: (state, payload) => {
            state.total = payload
        },
        setLocalStorageState: (state, payload) => {
            state.localStorageState = payload
        },
        setFirstChanged: (state, payload) => {
            state.firstChanged = payload
        },
        setEvents: (state, payload) => {
            state.events.unshift({id: nanoid(), value: payload})
        }
    }
})
