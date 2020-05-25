<template lang="pug">
.notes
  .notes-description(v-if="!notes.length") Создавайте и редактируйте, сортируйте ваши заметки
  .notes-add(@click="$router.push('/notes/add')")
    button.notes-add-button
      .icon
        plus
    .notes-add-text Добавить
  .notes-block
    notes-list(
      :list.sync="notes"
      @swaped="swaped"
      @clicked="clicked"
      @remove="remove"
    )
    modal(v-if="isOpenDeleteModal")
      template(v-slot:header)
        span Удалить {{activeNote.head}}?
      template(v-slot:buttons)
        .button(@click="isOpenDeleteModal = false") Отмена
        .button(@click="deleteNote") Удалить
</template>

<script>
import notesList from '@/components/notes-list'
import plus from '@/assets/icons/plus.svg?inline'
import modal from '@/components/modal'

export default {
  name: 'notes',
  components: {
    plus,
    notesList,
    modal
  },
  data: () => ({
    activeNote: null,
    isOpenDeleteModal: false
  }),
  computed: {
    notes () { return this.$store.getters.notes }
  },
  methods: {
    clicked (index) {
      this.$router.push('/notes/' + this.notes[index].id)
    },
    swaped (arr) {
      this.$store.dispatch('setNotes', arr)
    },
    remove (el) {
      this.isOpenDeleteModal = true
      this.activeNote = el
    },
    deleteNote () {
      this.$store.dispatch('deleteNoteById', this.activeNote.id)
      this.isOpenDeleteModal = false
    }
  }
}
</script>

<style lang="sass" scoped>
.notes
  &-description
    padding-top: 50px
    text-align: center
    font-size: 18px
    color: $yellow1
    @media (max-width: $to-sm)
      padding-top: 30px
  &-add
    margin: 50px auto
    display: inline-block
    text-align: center
    &:hover, &:active
      cursor: pointer
      .notes-add-button
        border-color: $red1
        .icon
          > svg
            fill: $red1
      .notes-add-text
        color: $red1
    @media (max-width: $to-sm)
      margin: 30px 0 auto
    &-button
      border: solid 1px $grey1
      height: 40px
      width: 40px
      border-radius: 4px
      .icon
        > svg
          width: 12px
          height: 12px
          fill: $red1
    &-text
      font-weight: bold
      color: $grey1
      font-size: 12px
      margin-top: 12px
  &-block
    margin: 0 -20px
</style>
