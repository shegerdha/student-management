<script lang="ts" setup>
import {inject} from "vue";

const theme = inject('theme')
console.log('theme:', theme)
</script>

<template>
  <slot count="count" name="content">
  </slot>
</template>


<style lang="scss" scoped>

</style>