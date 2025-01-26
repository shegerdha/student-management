<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  modelValue: Boolean, // v-model binding
});
const emit = defineEmits(["confirm", "close"]);
const isRemoveDialogOpen = defineModel();

const dialog = ref(false);

// Sync dialog with v-model
watch(
  () => props.modelValue,
  (newValue) => {
    dialog.value = newValue;
  },
);
</script>

<template>
  <div class="py-4">
    <v-dialog v-model="isRemoveDialogOpen" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <slot name="activator" v-bind="activatorProps"></slot>
      </template>

      <v-card>
        <v-card-title>حذف دانشجو</v-card-title>
        <v-card-text> آیا از حذف این دانشجو مطمئن هستید؟</v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="emit('close')">انصراف</v-btn>
          <v-btn color="red" @click="emit('confirm')">حذف</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
