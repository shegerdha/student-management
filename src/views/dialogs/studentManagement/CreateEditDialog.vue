<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from "vue";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const props = defineProps({
  mode: String,
  formData: Object,
});

const isCreateEditDialogOpen = defineModel();

const emit = defineEmits(["submit"]);

const validationSchema = yup.object({
  fullName: yup.string().required("نام و نام خانوادگی الزامی است"),
  studentId: yup.string().required("شماره دانشجویی الزامی است"),
  email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
  active: yup.boolean().required(),
  birthDate: yup.string().required("تاریخ تولد الزامی است"),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema,
  initialValues: props.formData || {
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

watch(
  () => props.formData,
  (newData) => {
    if (newData) {
      resetForm({ values: newData });
    }
  },
  { deep: true, immediate: true },
);

const closeDialog = () => {
  isCreateEditDialogOpen.value = false;
};
</script>

<template>
  <div class="py-4">
    <v-dialog v-model="isCreateEditDialogOpen" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <slot name="activator" v-bind="activatorProps"></slot>
      </template>

      <template #default>
        <v-card>
          <v-card-title>
            {{ mode === "edit" ? "ویرایش دانشجو" : "ایجاد دانشجو" }}
          </v-card-title>

          <v-card-text>
            <form @submit="handleSubmit((values) => emit('submit', values))">
              <v-text-field
                v-model="fullName.value"
                label="نام و نام خانوادگی"
                required
              ></v-text-field>
              <p class="text-red-500 text-sm">{{ fullName.errorMessage }}</p>

              <v-text-field
                v-model="studentId.value"
                label="شماره دانشجویی"
                required
              ></v-text-field>
              <p class="text-red-500 text-sm">{{ studentId.errorMessage }}</p>

              <v-text-field
                v-model="email.value"
                label="ایمیل"
                required
              ></v-text-field>
              <p class="text-red-500 text-sm">{{ email.errorMessage }}</p>

              <v-checkbox v-model="active.value" label="فعال"></v-checkbox>
              <p class="text-red-500 text-sm">{{ active.errorMessage }}</p>

              <Vue3PersianDatetimePicker
                v-model="birthDate.value"
                label="تاریخ تولد"
              ></Vue3PersianDatetimePicker>
              <p class="text-red-500 text-sm">{{ birthDate.errorMessage }}</p>

              <div class="flex justify-end mt-4">
                <v-btn color="grey" @click="closeDialog">انصراف</v-btn>
                <v-btn color="blue" type="submit">ذخیره</v-btn>
              </div>
            </form>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
