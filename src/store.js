import Vue from 'vue'
import Vuex from 'vuex'
import { DateTime } from 'luxon'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layout: '',
    localStorageKey: 'trllc',
    notes: []
  },
  getters: {
    layout: state => { return state.layout || 'default' },
    localStorageKey: state => { return state.localStorageKey },
    notes: state => { return state.notes }
  },
  mutations: {
    setLayout (state, str) { state.layout = str },
    setNotes (state, arr) { state.notes = arr }
  },
  actions: {
    changeLayout ({ dispatch, commit, state }, name) { commit('setLayout', name) },
    getNoteById ({ dispatch, commit, state }, id) {
      dispatch('getNotes')
      return state.notes.find(x => x.id === Number(id))
    },
    setNotes ({ dispatch, commit, state }, notes) {
      commit('setNotes', notes)
      dispatch('syncNotes')
    },
    getNotes ({ dispatch, commit, state }) {
      const notes = JSON.parse(localStorage.getItem(state.localStorageKey))
      if (notes && Array.isArray(notes) && notes.length) commit('setNotes', notes)
    },
    addNote ({ dispatch, commit, state }, note) {
      function getRandomInt (min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min // Максимум не включается, минимум включается
      }
      const colors = ['blue1', 'blue2', 'red', 'yellow', 'asphalt']

      state.notes.push({
        id: DateTime.local().toMillis(),
        color: colors[getRandomInt(0, 5)],
        head: note.head || '',
        todos: note.todos || []
      })
      dispatch('syncNotes')
    },
    editNoteById ({ dispatch, commit, state }, note) {
      const index = state.notes.findIndex(x => x.id === Number(note.id))
      state.notes[index] = note
      dispatch('syncNotes')
    },
    deleteNoteByIndex ({ dispatch, commit, state }, index) {
      state.notes.splice(index, 1)
      dispatch('syncNotes')
    },
    deleteNoteById ({ dispatch, commit, state }, id) {
      const index = state.notes.findIndex(x => x.id === id)
      dispatch('deleteNoteByIndex', index)
    },
    syncNotes ({ dispatch, commit, state }) {
      localStorage.setItem(state.localStorageKey, JSON.stringify(state.notes))
    }
  },
  modules: {
  }
})
