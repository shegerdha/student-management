<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";
import { useForm } from "vee-validate";

const mode = defineProps();

const formValidation = yup.object({
  fullName: yup.string().required("نام و نام خانوادگی الزامی است"),
  studentId: yup.string().required("شماره دانشجویی الزامی است"),
  email: yup.string().email().required("ایمیل الزامی است"),
  active: yup.boolean().required("الزامی است"),
  birthDate: yup.string().required("تاریخ تولد الزامی است"),
});

const { defineField } = useForm({ validationSchema: formValidation });
const { fullName, fullNameAttributes } = defineField("fullName");
</script>

<template>
  <div class="py-4">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <div v-if="mode === 'edit'">
          <v-btn
            color="grey-lighten-1"
            icon="mdi-pencil"
            v-bind="activatorProps"
            variant="text"
          ></v-btn>
        </div>
        <div v-else>
          <v-btn prepend-icon="mdi-plus" variant="text">ایجاد دانشجو</v-btn>
        </div>
      </template>

      <v-card>
        <v-card-title> ویرایش دانشجو</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              v-model="formData.fullName"
              label="نام و نام خانوادگی"
              required
            ></v-text-field>
            <v-text-field
              v-model="formData.studentId"
              label="شماره دانشجویی"
              required
            ></v-text-field>
            <v-text-field
              v-model="formData.email"
              label="ایمیل"
              required
            ></v-text-field>
            <v-checkbox v-model="formData.active" label="فعال"></v-checkbox>
            <Vue3PersianDatetimePicker
              v-model="formData.birthDate"
              label="تاریخ تولد"
            ></Vue3PersianDatetimePicker>
            <div class="flex justify-end mt-4">
              <v-btn color="grey" text @click="closeDialog">انصراف</v-btn>
              <v-btn color="blue" type="submit">ذخیره</v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped></style>
