<script lang="ts" setup>
import { ref, watch } from "vue";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import type { Student } from "@/stores/students";

const isCreateEditModalOpen = defineModel("isCreateEditModalOpen");
const props = defineProps<{ student: Student | null }>();
const emit = defineEmits(["handleSubmit", "handleClose"]);

const validationSchema = yup.object({
  fullName: yup.string().required("نام و نام خانوادگی الزامی است"),
  studentId: yup.string().required("شماره دانشجویی الزامی است"),
  email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
  active: yup.boolean().required(),
  birthDate: yup.string().required("تاریخ تولد الزامی است"),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema,
});

const { value: fullName, errorMessage: fullNameError } = useField("fullName");
const { value: studentId, errorMessage: studentIdError } =
  useField("studentId");
const { value: email, errorMessage: emailError } = useField("email");
const { value: active, errorMessage: activeError } = useField("active");
const { value: birthDate, errorMessage: birthDateError } =
  useField("birthDate");

// Watch for changes in the `student` prop
watch(
  () => props.student,
  (newStudent) => {
    if (newStudent) {
      // If editing, populate the form with the student's data
      resetForm({ values: newStudent });
    } else {
      // If creating, reset the form to initial values
      resetForm({
        values: {
          fullName: "",
          studentId: "",
          email: "",
          active: true,
          birthDate: "",
        },
      });
    }
  },
  { immediate: true },
);

// Watch for changes in the dialog's open state
watch(
  () => isCreateEditModalOpen.value,
  (isOpen) => {
    if (isOpen && !props.student) {
      // If the dialog is opened for creating a new student, reset the form
      resetForm({
        values: {
          fullName: "",
          studentId: "",
          email: "",
          active: true,
          birthDate: "",
        },
      });
    }
  },
);

const onSubmit = handleSubmit((values) => {
  emit("handleSubmit", values);
});
</script>

<template>
  <v-dialog v-model="isCreateEditModalOpen" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <slot name="activator" v-bind="activatorProps"></slot>
    </template>

    <v-card>
      <v-card-title>
        {{ props.student ? "ویرایش دانشجو" : "ایجاد دانشجو" }}
      </v-card-title>

      <v-card-text>
        <form @submit="onSubmit">
          <v-text-field
            v-model="fullName"
            label="نام و نام خانوادگی"
            required
          ></v-text-field>
          <p class="text-red-500 text-sm">{{ fullNameError }}</p>

          <v-text-field
            v-model="studentId"
            label="شماره دانشجویی"
            required
          ></v-text-field>
          <p class="text-red-500 text-sm">{{ studentIdError }}</p>

          <v-text-field v-model="email" label="ایمیل" required></v-text-field>
          <p class="text-red-500 text-sm">{{ emailError }}</p>

          <v-checkbox v-model="active" label="فعال"></v-checkbox>
          <p class="text-red-500 text-sm">{{ activeError }}</p>

          <Vue3PersianDatetimePicker
            v-model="birthDate"
            label="تاریخ تولد"
          ></Vue3PersianDatetimePicker>
          <p class="text-red-500 text-sm">{{ birthDateError }}</p>

          <div class="flex justify-end mt-4">
            <v-btn color="grey" @click="emit('handleClose')">انصراف</v-btn>
            <v-btn color="blue" type="submit">ذخیره</v-btn>
          </div>
        </form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
