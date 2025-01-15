<template>
  <div class="hover-me" @click="emit2('click')">
    {{ props.title }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ title: string | number }>()
const {title} = props

const emit2 = defineEmits(['click'])

</script>

<style scoped>
.hover-me {
  cursor: pointer;
  color: slategray;
  transition: color 0.3s;
}

.hover-me:hover {

  color: white;
}
</style>