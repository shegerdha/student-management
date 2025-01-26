<script lang="ts" setup>
import { ref, defineProps, defineModel, defineEmits, watch } from "vue";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const isCreateEditModalOpen = defineModel("isCreateEditModalOpen");
const compProps = defineProps(["index"]);
const emit = defineEmits(["handleSubmit", "handleClose"]);

const validationSchema = yup.object({
  fullName: yup.string().required("نام و نام خانوادگی الزامی است"),
  studentId: yup.string().required("شماره دانشجویی الزامی است"),
  email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
  active: yup.boolean().required(),
  birthDate: yup.string().required("تاریخ تولد الزامی است"),
});

const { handleSubmit, resetForm, values } = useForm({
  validationSchema,
  initialValues: {
    fullName: "",
    studentId: "",
    email: "",
    active: true,
    birthDate: "",
  },
});

const fullName = useField("fullName");
const studentId = useField("studentId");
const email = useField("email");
const active = useField("active");
const birthDate = useField("birthDate");
//
// watch(
//   () => props.formData,
//   (newData) => {
//     if (newData) {
//       resetForm({ values: newData });
//     }
//   },
//   { deep: true, immediate: true },
// );

// const closeDialog = () => {
//   isCreateEditDialogOpen.value = false;
// };
</script>

<template>
  <div class="py-4">
    <v-dialog v-model="isCreateEditModalOpen" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <slot name="activator" v-bind="activatorProps"></slot>
      </template>

      <template #default>
        <v-card>
          <v-card-title>
            {{ !compProps.index ? "ویرایش دانشجو" : "ایجاد دانشجو" }}
            index:{{ compProps.index }}
          </v-card-title>
          {{ values }}

          <v-card-text>
            <form @submit="handleSubmit((val) => emit('handleSubmit', val))">
              <v-text-field
                v-model="fullName"
                label="نام و نام خانوادگی"
                required
              ></v-text-field>
              <p class="text-red-500 text-sm">{{ fullName.errorMessage }}</p>

              <v-text-field
                v-model="studentId"
                label="شماره دانشجویی"
                required
              ></v-text-field>
              <p class="text-red-500 text-sm">{{ studentId.errorMessage }}</p>

              <v-text-field
                v-model="email"
                label="ایمیل"
                required
              ></v-text-field>
              <p class="text-red-500 text-sm">{{ email.errorMessage }}</p>

              <v-checkbox v-model="active" label="فعال"></v-checkbox>
              <p class="text-red-500 text-sm">{{ active.errorMessage }}</p>

              <Vue3PersianDatetimePicker
                v-model="birthDate"
                label="تاریخ تولد"
              ></Vue3PersianDatetimePicker>
              <p class="text-red-500 text-sm">{{ birthDate.errorMessage }}</p>

              <div class="flex justify-end mt-4">
                <v-btn color="grey" @click="emit('handleClose')">انصراف</v-btn>
                <v-btn color="blue" type="submit">ذخیره</v-btn>
              </div>
            </form>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
