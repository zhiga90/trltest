<template lang="pug">
.note(
  :class="[color]"
)
  .note-head
    .note-head-text {{head}}
    .note-head-button.icon(@click.stop="$emit('trash')")
      delete-icon
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
import deleteIcon from '@/assets/icons/delete.svg?inline'

export default {
  name: 'note',
  components: { deleteIcon },
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

<style lang="sass" scoped>
.note
  color: white
  border-radius: 10px
  background: $black1
  min-height: 100%
  cursor: pointer
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
    position: relative
    &-text
      padding: 0 72px 0 20px
      height: 62px
      line-height: 62px
      font-size: 18px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
    &-button
      position: absolute
      right: 0
      top: 0
      width: 62px
      height: 62px
      border-radius: 10px
      &:hover
        background: rgba($white1, 8%)
      &:active
        background: rgba($white1, 15%)
      > svg
        fill: $white1
        width: 22px
        height: 16px

  &-line
    height: 1px
    background: $white1
    margin: 20px 0 20px 20px
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
