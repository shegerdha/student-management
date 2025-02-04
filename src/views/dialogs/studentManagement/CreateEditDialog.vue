<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { type Student } from "@/stores/data";
import { boolean } from "yup";
import moment from "moment";
import "moment/locale/fa";

const isCreateEditModalOpen = defineModel<boolean>("isCreateEditModalOpen");
const props = defineProps<{ student: Student | null }>();
const emit = defineEmits(["handleSubmit", "handleClose"]);

const validationSchema = yup.object({
  fullName: yup.string().required("نام و نام خانوادگی الزامی است"),
  studentId: yup
    .string()
    .matches(/^[0-9۰-۹]+$/, "لطفا از کاراکترهای عددی استفاده کنید")
    .required("شماره دانشجویی الزامی است"),
  email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
  active: yup.boolean().required("تعیین وضعیت فعال بودن الزامی است"),
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

// watch for changes in the `student` prop
watch(
  () => props.student,
  (newStudent) => {
    if (newStudent) {
      resetForm({ values: newStudent });
    } else {
      resetForm({
        values: {
          fullName: null,
          studentId: null,
          email: null,
          active: null,
          birthDate: null,
        },
      });
    }
  },
  { immediate: true }
);

watch(
  () => isCreateEditModalOpen.value,
  (newvalue) => {
    if (!newvalue) {
      setTimeout(
        () =>
          resetForm({
            values: {
              fullName: null,
              studentId: null,
              email: null,
              active: null,
              birthDate: null,
            },
          }),
        100
      );
    }
  },
  { immediate: true }
);
const onDateChange = (date: string) => {
  if (!date) return;
  const parsedDate = moment(date, "jYYYY/jMM/jDD", "fa");
  birthDate.value = parsedDate.locale("en").format("YYYY-MM-DD");
};

const onSubmit = handleSubmit((values) => {
  emit("handleSubmit", values);
});

const computeActiveIndeterminate = computed(() => active.value === null);
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
          ></v-text-field>
          <p class="text-red-500 text-sm">{{ fullNameError }}</p>

          <v-text-field
            v-model="studentId"
            label="شماره دانشجویی"
          ></v-text-field>
          <p class="text-red-500 text-sm">{{ studentIdError }}</p>

          <v-text-field v-model="email" label="ایمیل"></v-text-field>
          <p class="text-red-500 text-sm">{{ emailError }}</p>

          <v-checkbox
            v-model="active"
            :indeterminate="computeActiveIndeterminate"
            label="فعال"
          ></v-checkbox>
          <p class="text-red-500 text-sm">{{ activeError }}</p>

          <Vue3PersianDatetimePicker
            v-model="birthDate"
            label="تاریخ تولد"
            @change="onDateChange"
          ></Vue3PersianDatetimePicker>
          <p class="text-red-500 text-sm">{{ birthDateError }}</p>

          <div class="flex justify-end gap-2 mt-4">
            <v-btn color="grey" @click="emit('handleClose')">انصراف</v-btn>
            <v-btn color="blue" type="submit">ذخیره</v-btn>
          </div>
        </form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
