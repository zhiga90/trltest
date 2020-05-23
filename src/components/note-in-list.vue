<template lang="pug">
.note(
  :class="[color]"
)
  .note-head {{head}}
  .note-line(v-if="todos.length")
  .todos(v-if="todos.length")
    .todo(
      v-for="(todo, key) in topTodos"
      :key="'key' + key"
      :class="[todo.check ? 'checked' : '']"
    )
      .todo-check
      .todo-text {{todo.text}}
</template>

<script>
export default {
  name: 'note',
  props: {
    id: Number,
    head: String,
    text: String,
    color: String, // blue1, blue2, red, yellow, asphalt,
    todos: { type: Array, default: () => ([]) } // array element: { check: Boolean, text: String }
  },
  computed: {
    topTodos () { return this.todos.slice(0, 3) }
  }
}
</script>

<style lang="sass">
.note
  padding: 20px
  color: white
  border-radius: 10px
  background: $black1
  min-height: 100%
  &.blue1
    background: $blue1
  &.blue2
    background: $blue2
  &.red
    background: $red1
  &.yellow
    background: $yellow1
  &.asphalt
    background: $asphalt
  &-head
    width: 100%
    height: 22px
    line-height: 22px
    font-size: 18px
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
  &-line
    height: 1px
    background: $white1
    margin: 20px -20px 20px 0
    opacity: 33%
  .todos
    .todo
      position: relative
      margin-bottom: 10px
      &:last-child
        margin-bottom: 0
      &-check
        position: absolute
        top: 3px
        left: 0
        width: 10px
        height: 10px
        border: solid 1px $white1
        border-radius: 20px
      &-text
        width: 100%
        height: 16px
        line-height: 16px
        font-size: 13px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
        padding-left: 20px
      &.checked
          &.todo-check
            display: none
          &.todo-text
            text-decoration: line-through
</style>
