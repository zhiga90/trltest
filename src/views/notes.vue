<template lang="pug">
.notes
  h1.notes-head
    .notes-head-line
    .notes-head-text Список #[b Заметок]
  .notes-add(@click="$router.push('/notes/add')")
    button.notes-add-button
      .icon
        plus
    .notes-add-text Добавить
  notes-list(
    :list.sync="notes"
    @swaped="swaped"
    @clicked="clicked"
    @trash="trash"
  )
  modal(v-if="isOpenEditModal")
    template(v-slot:header)
      span Удалить {{activeNote.head}}?
    template(v-slot:buttons)
      .button(@click="isOpenEditModal = false") Отмена
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
    isOpenEditModal: false
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
    trash (el) {
      this.isOpenEditModal = true
      this.activeNote = el
    },
    deleteNote () {
      this.$store.dispatch('deleteNoteById', this.activeNote.id)
      this.isOpenEditModal = false
    }
  }
}
</script>

<style lang="sass" scoped>
.notes
  padding-top: 60px
  padding-bottom: 60px
  &-head
    position: relative
    font-size: 32px
    line-height: 44px
    font-weight: normal
    text-align: center
    &-text
      background: $white1
      font-weight: 200
      position: relative
      display: inline-block
      padding: 0 40px
      b
        font-weight: bold

    &-line
      position: absolute
      bottom: 50%
      height: 2px
      width: 100%
      background: $grey2
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
    &-button
      border: solid 1px $grey1
      height: 40px
      width: 40px
      border-radius: 4px
      .icon
        > svg
          width: 12px
          height: 12px
          fill: $black1
    &-text
      font-weight: bold
      color: $grey1
      font-size: 12px
      margin-top: 12px
</style>
