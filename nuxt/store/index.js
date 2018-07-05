import Vuex from 'vuex'
import Checkout from './api/checkout'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      Checkout
    },
    state: {
      counter: 0
    },
    mutations: {
      increment (state) {
        state.counter++
      }
    }
  })
}

export default createStore