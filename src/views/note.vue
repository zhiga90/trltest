<template lang="pug">
.note
  .note-buttons
    .note-btn(
      v-for="(btn, index) in buttons"
      :key="'btn' + index"
      @click="runMethod(btn.method)"
    )
      .icon(:style="btn.iconStyle")
          component(:is="btn.icon")
      .note-btn-label {{btn.label}}

  .note-head
    .note-label Заголовок
    input.note-head-input(v-if="isAdd", v-model="head", placeholder="Добавить заголовок")
    .note-head-edit(v-else-if="headEdit")
      .note-head-btn(@click="saveHead")
        save
      .note-head-btn(@click="cancelHead")
        cancel
      input.note-head-input(v-model="headVersion")
    .note-head-info(v-else)
      .note-head-btn(@click="editHead")
        edit
      .note-head-info-text {{head}}

  .note-todos
    .note-label Задачи
    .note-todo(
      v-for="(todo, index) in todos"
      :key="'todo' + index"
      :class="[todo.check ? 'checked' : '']"
    )

      .note-todo-check(@click="todo.check = !todo.check ")
        .circle
          .check
            check
          .cancel
            cancel

      form.note-todo-form(v-if="todo.editMode" @submit.prevent="submitTodo(index)")
        input.note-todo-edit(v-model="todo.text" @blur="editTodo(index)" :id="'focus-that-' + index")
      .note-todo-info(v-else @click="todo.editMode = true") {{todo.text}}

    form.note-todo-add(@submit.prevent="addTodo")
      .note-todo-plus(@click="addTodo")
        plus
      input.note-todo-edit(v-model="newTodo" placeholder="Добавить задачу")

  modal(v-if="isOpenNoteDeleteModal")
    template(v-slot:header)
      .text-center Подтвердить удаление
      div(style="margin-top: 10px") {{'#' + id}} | {{head}}
    template(v-slot:buttons)
      .button(@click="isOpenNoteDeleteModal = false") Отмена
      .button(@click="removeNote") Удалить
  modal(v-if="isOpenNoteDropChangesModal")
    template(v-slot:header)
      .text-center Подтвердить сброс изменений
    template(v-slot:buttons)
      .button(@click="isOpenNoteDropChangesModal = false") Отмена
      .button(@click="dropNoteChanges") Сбросить
  modal(v-if="isOpenMessageModal")
    template(v-slot:header)
      .text-center {{message}}
    template(v-slot:buttons)
      .button(@click="isOpenMessageModal = false") OK
</template>

<script>
import modal from '@/components/modal'
import plus from '@/assets/icons/plus.svg?inline'
import arrow from '@/assets/icons/arrow.svg?inline'
import save from '@/assets/icons/save.svg?inline'
import remove from '@/assets/icons/remove.svg?inline'
import cancel from '@/assets/icons/cancel.svg?inline'
import edit from '@/assets/icons/edit.svg?inline'
import check from '@/assets/icons/check.svg?inline'

export default {
  name: 'note',
  components: { modal, plus, arrow, save, remove, cancel, edit, check },
  data: () => ({
    is404: false,
    head: '',
    headEdit: false,
    headVersion: '',
    color: '',
    todos: [],
    newTodo: '',
    addButtons: [
      { label: 'Назад', method: 'back', icon: 'arrow', iconStyle: 'transform: scale(-1, 1)' },
      { label: 'Добавить', method: 'addNote', icon: 'plus' }
    ],
    editButtons: [
      { label: 'Назад', method: 'back', icon: 'arrow', iconStyle: 'transform: scale(-1, 1)' },
      { label: 'Cохранить', method: 'saveNote', icon: 'save' },
      { label: 'Отменить редактирование', method: 'openDropChangesModal', icon: 'cancel' },
      { label: 'Удалить', method: 'openDeleteModal', icon: 'remove' }
    ],
    isOpenNoteDeleteModal: false,
    isOpenNoteDropChangesModal: false,
    isOpenMessageModal: '',
    message: '',
    doubleSaveTrigger: false
  }),
  computed: {
    isHeadValid () { return !!this.head },
    id () { return this.$route.params ? this.$route.params.id : null },
    isAdd () { return this.$route.path ? this.$route.path === '/notes/add' : null },
    buttons () { return this.id ? this.editButtons : this.addButtons }
  },
  mounted () {
    if (!this.isAdd && this.id) this.getNoteData()
  },
  methods: {
    runMethod (method) { this[method]() },
    getNoteData () {
      const note = this.$store.dispatch('getNoteById', this.id)
      if (note && note.head) {
        this.formatNote(note)
      } else {
        note.then(
          data => { this.formatNote(data) },
          () => { this.is404 = true }
        )
      }
    },
    formatNote (note) {
      this.head = note.head
      this.color = note.color
      for (const todo of note.todos) {
        todo.editMode = false
      }
      this.todos = note.todos
    },
    editHead () {
      this.headVersion = this.head
      this.headEdit = true
    },
    cancelHead () {
      this.headEdit = false
    },
    saveHead () {
      if (this.headVersion) this.head = this.headVersion
      this.headEdit = false
    },
    back () {
      this.$router.push('/notes')
    },
    openDropChangesModal () {
      this.isOpenNoteDropChangesModal = true
    },
    dropNoteChanges () {
      this.getNoteData()
      this.isOpenNoteDropChangesModal = false
    },
    addNote () {
      if (this.head) {
        this.$store.dispatch('addNote', { head: this.head, todos: this.todos })
        this.$router.push('/notes')
      } else {
        this.message = 'Введите заголовок'
        this.isOpenMessageModal = true
      }
    },
    saveNote () {
      if (this.head) {
        this.$store.dispatch('editNoteById', { id: Number(this.id), head: this.head, color: this.color, todos: this.todos })
        this.$router.push('/notes')
      } else {
        this.message = 'Введите заголовок'
        this.isOpenMessageModal = true
      }
    },
    openDeleteModal () {
      this.isOpenNoteDeleteModal = true
    },
    removeNote () {
      this.$store.dispatch('deleteNoteById', this.id)
      this.$router.push('/notes')
    },
    addTodo () {
      if (this.newTodo) {
        this.todos.push({ check: false, editMode: false, text: this.newTodo })
        this.newTodo = ''
      }
    },
    submitTodo (index) {
      const el = document.getElementById('focus-that-' + index)
      el.focus()
      el.blur()
    },
    editTodo (index) {
      console.log(index)
      const todo = this.todos[index]
      if (todo.text) {
        todo.editMode = false
      } else {
        this.todos.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.note
  &-buttons
    margin: 50px 0
    display: flex
    justify-content: space-around
  &-btn
    .icon
      border: solid 1px $asphalt
      height: 40px
      width: 40px
      border-radius: 4px
      margin: 0 auto
      cursor: pointer
      > svg
        width: 12px
        height: 12px
        fill: $asphalt
    &:hover
      .icon
        border: solid 1px $blue1
        > svg
          fill: $blue1
      .note-btn-label
        color: $blue1
  &-btn-label
    font-weight: bold
    color: $asphalt
    font-size: 12px
    margin-top: 12px
  &-head
    padding-bottom: 40px
    &-input
      width: 100%
      color: $black1
      font-size: 26px
      line-height: 48px
      border-bottom: solid 2px $grey1
      &:hover
        border-color: lighten($blue2, 15%)
      &:focus
        border-color: $blue2
    &-btn
      width: 38px
      height: 38px
      margin-right: 15px
      flex-shrink: 0
      display: flex
      align-items: center
      justify-content: center
      border-radius: 50px
      cursor: pointer
      &:hover
        background: $grey2
      svg
        width: 18px
        height: 18px
        fill: $black1
    &-edit
      display: flex
      align-items: center
    &-info
      display: flex
      align-items: center
      &-text
        color: $black1
        font-size: 26px
        line-height: 48px
  &-label
    font-size: 16px
    font-weight: 200
    padding-bottom: 20px
  &-todos
    padding-bottom: 60px
  &-todo
    display: flex
    align-items: center
    padding-bottom: 20px
    &-check
      flex-grow: 0
      flex-shrink: 0
      width: 40px
      height: 40px
      margin-right: 12px
      display: flex
      align-items: center
      justify-content: center
      cursor: pointer
      .circle
        border: solid 2px $grey1
        border-radius: 30px
        width: 18px
        height: 18px
        > div
          display: none
          width: 16px
          height: 16px
        .check
          transform: scale(1.2, 1.2) translate(2px, -3px)
          svg
            fill: $blue2
        .cancel
          width: 14px
          height: 14px
          svg
            fill: $black1
      &:hover
        border-width: 1px
        .check
          display: block
    &-info
      font-size: 18px
      line-height: 40px
      flex-grow: 1
      flex-shrink: 1
      word-break: break-word
    &-form
      flex-grow: 1
      flex-shrink: 1
    &-edit
      width: 100%
      font-size: 18px
      height: 40px
      border-bottom: solid 1px $grey1
      &:hover
        border-color: lighten($blue2, 15%)
      &:focus
        border-color: $blue2
    &-add
      display: flex
      align-items: center
      justify-content: center
    &-plus
      margin-right: 12px
      width: 40px
      height: 40px
      display: flex
      align-items: center
      justify-content: center
      svg
        width: 16px
        height: 16px
        fill: $black1
    &.checked
      .note-todo
        &-info
          text-decoration: line-through
        &-check
          .circle
            opacity: 50%
          &:hover
            .check
              display: none
            .cancel
              display: block
</style>
