<template lang="pug">
draggable(
  v-model="notes"
  class="notes-list"
  animation="200"
)
  .cell(
    v-for="(el, index) in notes"
    :key="el.id"
    @click="$emit('clicked', index)"
  )
    note(v-bind="el", @remove="$emit('remove', el)")
</template>

<script>
import draggable from 'vuedraggable'
import note from '@/components/note-in-list'
export default {
  name: 'notes',
  components: { draggable, note },
  props: {
    list: { type: Array, default: () => ([]) }
  },
  computed: {
    notes: {
      get () { return this.list },
      set (arr) { this.$emit('swaped', arr) }
    }
  }
}
</script>

<style lang="sass" scoped>
.notes-list
  display: flex
  flex-wrap: wrap
  padding: 10px
.cell
  width: 33%
  padding: 10px
  @media (max-width: $to-md)
    width: 50%
  @media (max-width: $to-sm)
    width: 100%
</style>
