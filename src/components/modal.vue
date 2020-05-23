<template lang="pug">
.modal-wrapper(@click="$emit('close')")
  .modal-container
    .modal-header
      slot(name="header")
    .modal-buttons
      slot(name="buttons")
</template>

<script>
export default {
  name: 'modal',
  prop: {
    isOpen: { type: Boolean, default: false }
  },
  created () {
    document.documentElement.style.overflow = 'hidden'
  },
  beforeDestroy () {
    document.documentElement.style.overflow = 'auto'
  }
}
</script>

<style lang="sass" scoped>
.modal
  &-wrapper
    position: fixed
    z-index: 9999
    width: 100%
    height: 100%
    background: rgba(black, 50%)
    display: flex
    padding: 40px 20px
    justify-content: center
    align-items: center
    top: 0
    left: 0
  &-container
    width: 100%
    min-width: 260px
    max-width: 400px
    background: $white1
    border-radius: 10px
  &-header
    color: $black1
    font-size: 18px
    line-height: 24px
    padding: 20px
    border-bottom: solid 1px $grey1
    border-radius: 10px 10px 0 0
  &-buttons
    display: flex
    > *
      flex: 1
      padding: 20px
      font-size: 13px
      text-transform: uppercase
      font-weight: bold
      border-right: solid 1px $grey1
      text-align: center
      cursor: pointer
      &:hover
        background: darken($white1, 10%)
      &:first-child
        border-radius: 0 0 0 10px
      &:last-child
        border-radius: 0 0 10px 0
</style>
