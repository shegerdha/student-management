<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import { boolean } from "yup";

const isModalOpen = defineModel("isModalOpen");
const compProps = defineProps(["index"]);
const emit = defineEmits(["handleConfirm", "handleClose"]);
</script>

<template>
  <div class="py-4">
    <v-dialog v-model="isModalOpen" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <slot name="activator" v-bind="activatorProps"></slot>
      </template>

      <v-card>
        <v-card-title>حذف دانشجو</v-card-title>
        <v-card-text> آیا از حذف این دانشجو مطمئن هستید؟</v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="emit('handleClose')">انصراف</v-btn>
          <v-btn color="red" @click="emit('handleConfirm', compProps.index)"
            >حذف
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
