<template lang="pug">
.layout-default.flex-column
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
</style>
