<script setup>
import { defineProps, defineEmits, defineModel } from "vue";

const isModalOpen = defineModel("isModalOpen");
const props = defineProps(["index"]);
const emit = defineEmits(["handleConfirm", "handleClose"]);

const handleConfirm = () => {
  emit("handleConfirm", props.index);
  isModalOpen.value = false;
};

const handleClose = () => {
  emit("handleClose");
  isModalOpen.value = false;
};
</script>

<template>
  <v-dialog v-model="isModalOpen" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <slot name="activator" v-bind="activatorProps"></slot>
    </template>

    <v-card>
      <v-card-title>حذف دانشجو</v-card-title>
      <v-card-text>index: {{ props.index }}</v-card-text>
      <v-card-text> آیا از حذف این دانشجو مطمئن هستید؟</v-card-text>
      <v-card-actions>
        <v-btn color="grey" @click="handleClose">انصراف</v-btn>
        <v-btn color="red" @click="handleConfirm">حذف</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
