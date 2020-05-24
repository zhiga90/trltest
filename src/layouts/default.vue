<template lang="pug">
.layout-default.flex-column
  h1.layout-default-head
    .layout-default-head-line
    .layout-default-head-text {{$route.meta.head1 || $route.meta.title}} #[b {{$route.meta.head2 || ($route.params.id ? '#' + $route.params.id : '') }}]
  slot
</template>

<script>
export default {
  name: 'layout-default'
}
</script>

<style lang="sass" scoped>
html,
body
  height: 100%
.layout-default
  max-width: 1200px
  margin: 0 auto
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
</style>
