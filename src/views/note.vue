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
  input(v-model="head")
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
</template>

<script>
import modal from '@/components/modal'
import plus from '@/assets/icons/plus.svg?inline'
import arrow from '@/assets/icons/arrow.svg?inline'
import save from '@/assets/icons/save.svg?inline'
import remove from '@/assets/icons/remove.svg?inline'
import cancel from '@/assets/icons/cancel.svg?inline'

export default {
  name: 'note',
  components: { modal, plus, arrow, save, remove, cancel },
  data: () => ({
    is404: false,
    head: '',
    color: '',
    addButtons: [
      { label: 'Добавить', method: 'addNote', icon: 'plus' }
    ],
    editButtons: [
      { label: 'Назад', method: 'back', icon: 'arrow', iconStyle: 'transform: scale(-1, 1)' },
      { label: 'Cохранить', method: 'saveNote', icon: 'save' },
      { label: 'Отменить редактирование', method: 'openDropChangesModal', icon: 'cancel' },
      { label: 'Удалить', method: 'openDeleteModal', icon: 'remove' }
    ],
    isOpenNoteDeleteModal: false,
    isOpenNoteDropChangesModal: false
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
        this.head = note.head
        this.color = note.color
      } else {
        note.then(data => {
          this.head = data.head
          this.color = data.color
        }, () => { this.is404 = true })
      }
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
        this.$store.dispatch('addNote', { head: this.head })
        this.$router.push('/notes')
      }
    },
    saveNote () {
      if (this.head) {
        this.$store.dispatch('editNoteById', { id: Number(this.id), head: this.head, color: this.color })
        this.$router.push('/notes')
      }
    },
    openDeleteModal () {
      this.isOpenNoteDeleteModal = true
    },
    removeNote () {
      this.$store.dispatch('deleteNoteById', this.id)
      this.$router.push('/notes')
    }
  }
}
</script>

<style lang="sass" scoped>
.note
  input
    height: 40px
    line-height: 40px
    width: 100%
    font-size: 30px
    margin-bottom: 20px
    border-bottom: solid 1px $grey1
    color: $black1
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
</style>
