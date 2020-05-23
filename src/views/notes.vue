<template lang="pug">
.notes
  h1.notes-head
    .notes-head-line
    .notes-head-text Список #[b Заметок]
  .notes-add
    button.notes-add-button
      .icon
        plus
    .notes-add-text Добавить
  notes-list(:list="notes")
</template>

<script>
import notesList from '@/components/notes-list'
import plus from '@/assets/icons/plus.svg?inline'

export default {
  name: 'notes',
  components: {
    plus,
    notesList
  },
  computed: {
    notes () {
      return [
        {
          id: 1,
          head: 'Lorem ipsum dolor sit amet',
          color: 'blue1',
          todos: [
            { check: false, text: 'Lorem ipsum dolor sit amet' },
            { check: true, text: 'Lorem ipsum dolor sit amet' },
            { check: false, text: 'Lorem ipsum dolor sit amet' }
          ]
        },
        { id: 2, head: 'Lorem ipsum dolor sit amet', color: 'red', todos: [] },
        { id: 3, head: 'Lorem ipsum dolor sit amet', color: 'red', todos: [] },
        { id: 4, head: 'Lorem ipsum dolor sit amet', color: 'red', todos: [] },
        { id: 5, head: 'Lorem ipsum dolor sit amet', color: 'red', todos: [] },
        {
          id: 6,
          head: 'Lorem ipsum dolor sit amet',
          color: 'yellow',
          todos: [
            { check: true, text: 'Lorem ipsum dolor sit amet' },
            { check: true, text: 'Lorem ipsum dolor sit amet' },
            { check: false, text: 'Lorem ipsum dolor sit amet' }
          ]
        },
        {
          id: 7,
          head: 'Lorem ipsum dolor sit amet',
          color: 'asphalt',
          todos: [
            { check: true, text: 'Lorem ipsum dolor sit amet' },
            { check: true, text: 'Lorem ipsum dolor sit amet' },
            { check: false, text: 'Lorem ipsum dolor sit amet' },
            { check: false, text: 'Lorem ipsum dolor sit amet' },
            { check: false, text: 'Lorem ipsum dolor sit amet' },
            { check: false, text: 'Lorem ipsum dolor sit amet' }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="sass">
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
