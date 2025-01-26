<script lang="ts" setup>
import { ref, reactive } from "vue";
import { useForm, Field, ErrorMessage, Form as VForm } from "vee-validate";
import { boolean, object, string } from "yup";
import { toTypedSchema } from "@vee-validate/yup";
import { useStudentsStore } from "@/stores/students";
import CreateEditDialog from "@/views/dialogs/studentManagement/CreateEditDialog.vue";
import RemoveDialog from "@/views/dialogs/studentManagement/RemoveDialog.vue";

const studentsStore = useStudentsStore();
const students = studentsStore.students;

const isModalOpen = ref(false);
const modalMode = ref("create");
const search = ref("");
const selected = ref([]);
const headers = ref([
  { key: "id", title: "ردیف" },
  { key: "fullName", title: "نام و نام خانوادگی" },
  { key: "studentId", title: "شماره دانشجویی" },
  { key: "email", title: "ایمیل" },
  { key: "active", title: "فعال" },
  { key: "birthDate", title: "تاریخ تولد" },
  { key: "operations", title: "عملیات" },
]);
const formData = reactive({
  id: 0,
  fullName: "",
  studentId: "",
  email: "",
  active: true,
  birthDate: "",
});

const openModal = (mode, student = null) => {
  modalMode.value = mode;
  isModalOpen.value = true;

  if (student) {
    Object.assign(formData, JSON.parse(JSON.stringify(student)));
  } else {
    Object.assign(formData, {
      id: 0,
      fullName: "",
      studentId: "",
      email: "",
      active: true,
      birthDate: "",
    });
  }
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleSubmit = (values) => {
  if (modalMode.value === "create") {
    studentsStore.add({ ...values, id: Date.now() });
  } else if (modalMode.value === "CreateEditDialog") {
    studentsStore.edit(values);
  }
  closeModal();
};

const validationSchema = toTypedSchema(
  object({
    fullName: string().required("نام و نام خانوادگی الزامی است"),
    studentId: string().required("شماره دانشجویی الزامی است"),
    email: string().email().required("ایمیل الزامی است"),
    active: boolean().required("الزامی است"),
    birthDate: string().required("تاریخ تولد الزامی است"),
  }),
);

const { resetForm } = useForm({
  validationSchema,
  initialValues: formData,
});
</script>

<template>
  <v-card flat title="مدیریت دانش جو">
    <template v-slot:text>
      <div class="flex flex-col">
        <v-text-field
          v-model="search"
          label="جستوجو"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="outlined"
        ></v-text-field>
        <div v-show="selected.length !== 0" class="flex flex-row gap-2">
          <div v-for="i in selected">{{ i }}</div>
        </div>
      </div>
      <CreateEditDialog mode="create"> </CreateEditDialog>
    </template>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="students"
      :search="search"
      show-select
    >
      <template v-slot:item.operations="{ item }">
        <div class="flex flex-row">
          <CreateEditDialog
            :mode="edit"
            @click="openModal('edit', item)"
          ></CreateEditDialog>
          <RemoveDialog v-model="isModalOpen">
            <v-btn
              color="red-lighten-2"
              icon="mdi-close-thick"
              variant="text"
              @click="openModal('remove', item)"
            ></v-btn>
          </RemoveDialog>
        </div>
      </template>
      <template v-slot:item.active="{ item }">
        <v-checkbox v-model="item.active" disabled>
          <!--          {{ item.active ? "فعال" : "غیر فعال" }}-->
        </v-checkbox>
      </template>
    </v-data-table>
  </v-card>
</template>
