<template lang="pug">
.note
  input(v-model="head")
  button.button(@click="$router.push('/notes')") Отменить
  button.button(v-if="id" @click="editNote") Редактировать
  button.button(v-else @click="addNote") Добавить
</template>

<script>
export default {
  name: 'note',
  data: () => ({
    is404: false,
    head: '',
    color: ''
  }),
  computed: {
    isHeadValid () { return !!this.head },
    id () { return this.$route.params ? this.$route.params.id : null },
    isAdd () { return this.$route.path ? this.$route.path === '/notes/add' : null }
  },
  mounted () {
    if (!this.isAdd) {
      if (this.id) {
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
      }
    }
  },
  methods: {
    addNote () {
      if (this.head) {
        this.$store.dispatch('addNote', { head: this.head })
        this.$router.push('/notes')
      }
    },
    editNote () {
      if (this.head) {
        this.$store.dispatch('editNoteById', { id: Number(this.id), head: this.head, color: this.color })
        this.$router.push('/notes')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.note
  input, .button
    height: 40px
    line-height: 40px
    width: 100%
    font-size: 30px
    margin-bottom: 20px
    border-bottom: solid 1px $grey1
    color: $black1
</style>
