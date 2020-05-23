<template lang="pug">
.notes-list
  .cell(v-for="el in list" :key="list.id")
    note(v-bind="el")
</template>

<script>
import note from '@/components/note-in-list'
export default {
  name: 'notes',
  components: { note },
  props: {
    list: { type: Array, default: () => ([]) }
  }
}
</script>

<style lang="sass">
.notes-list
  display: flex
  flex-wrap: wrap
  padding: 10px
.cell
  width: 33%
  padding: 10px
</style>
