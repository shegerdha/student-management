<script setup>import {ref, reactive} from 'vue';
import {useForm, Field, ErrorMessage, Form as VForm} from 'vee-validate';
import {boolean, object, string} from 'yup';
import {toTypedSchema} from '@vee-validate/yup';
import {useStudentsStore} from '../stores/students.ts';

const studentsStore = useStudentsStore();
const students = studentsStore.students;

const isModalOpen = ref(false);
const modalMode = ref('create');
const formData = reactive({
  id: 0,
  fullName: '',
  studentId: '',
  email: '',
  active: true,
  birthDate: '',
});

const openModal = (mode, student = null) => {
  modalMode.value = mode;
  isModalOpen.value = true;

  if (student) {
    Object.assign(formData, JSON.parse(JSON.stringify(student)));
  } else {
    Object.assign(formData, {id: 0, fullName: '', studentId: '', email: '', active: true, birthDate: ''});
  }
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleSubmit = (values) => {
  if (modalMode.value === 'create') {
    studentsStore.add({...values, id: Date.now()});
  } else if (modalMode.value === 'edit') {
    studentsStore.edit(values);
  }
  closeModal();
};

const validationSchema = toTypedSchema(
    object({
      fullName: string().required('نام و نام خانوادگی الزامی است'),
      studentId: string().required('شماره دانشجویی الزامی است'),
      email: string().email().required('ایمیل الزامی است'),
      active: boolean().required('الزامی است'),
      birthDate: string().required('تاریخ تولد الزامی است'),
    })
);

const {resetForm} = useForm({
  validationSchema,
  initialValues: formData,
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">جدول اطلاعات</h1>
    <button
        class="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        @click="openModal('create')"
    >
      افزودن دانشجو
    </button>
    <table class="w-full border-collapse border border-gray-300">
      <thead>
      <tr class="bg-gray-100">
        <th>ردیف</th>
        <th>نام و نام خانوادگی</th>
        <th>شماره دانشجویی</th>
        <th>ایمیل</th>
        <th>فعال یا غیر فعال</th>
        <th>تاریخ تولد</th>
        <th>عملیات</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(student, index) in students" :key="student.id" class="text-center">
        <td>{{ index + 1 }}</td>
        <td>{{ student.fullName }}</td>
        <td>{{ student.studentId }}</td>
        <td>{{ student.email }}</td>
        <td>{{ student.active ? 'فعال' : 'غیر فعال' }}</td>
        <td>{{ student.birthDate }}</td>
        <td>
          <button
              class="bg-yellow-500 text-white px-3 py-1 rounded mx-1"
              @click="openModal('edit', student)"
          >
            ویرایش
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded w-1/3">
        <h2 class="text-lg font-bold mb-4">{{ modalMode === 'create' ? 'افزودن دانشجو' : 'ویرایش دانشجو' }}</h2>
        <VForm @submit="handleSubmit">
          <div class="mb-4">
            <label class="block mb-1">نام و نام خانوادگی:</label>
            <Field v-model="formData.fullName" as="input" class="w-full border px-2 py-1 rounded" name="fullName"/>
            <ErrorMessage class="text-red-500 text-sm" name="fullName"/>
          </div>
          <div class="mb-4">
            <label class="block mb-1">شماره دانشجویی:</label>
            <Field v-model="formData.studentId" as="input" class="w-full border px-2 py-1 rounded" name="studentId"/>
            <ErrorMessage class="text-red-500 text-sm" name="studentId"/>
          </div>
          <div class="mb-4">
            <label class="block mb-1">ایمیل:</label>
            <Field v-model="formData.email" as="input" class="w-full border px-2 py-1 rounded" name="email"/>
            <ErrorMessage class="text-red-500 text-sm" name="email"/>
          </div>
          <div class="mb-4">
            <label class="block mb-1">فعال یا غیر فعال:</label>
            <Field v-model="formData.active" as="select" class="w-full border px-2 py-1 rounded" name="active">
              <option :value="true">فعال</option>
              <option :value="false">غیر فعال</option>
            </Field>
            <ErrorMessage class="text-red-500 text-sm" name="active"/>
          </div>
          <div class="mb-4">
            <label class="block mb-1">تاریخ تولد:</label>
            <Field v-model="formData.birthDate" as="input" class="w-full border px-2 py-1 rounded" name="birthDate"
                   type="date"/>
            <ErrorMessage class="text-red-500 text-sm" name="birthDate"/>
          </div>
          <div class="flex justify-end">
            <button class="bg-gray-400 text-white px-4 py-2 rounded mr-2" type="button" @click="closeModal">
              انصراف
            </button>
            <button class="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
              ذخیره
            </button>
          </div>
        </VForm>
      </div>
    </div>
  </div>
</template>

