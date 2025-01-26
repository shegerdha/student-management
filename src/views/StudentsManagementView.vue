<script lang="ts" setup>
import { ref, reactive } from "vue";
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
  } else if (modalMode.value === "edit") {
    studentsStore.edit(values);
  }
  closeModal();
};
</script>

<template>
  <v-card flat title="مدیریت دانشجو">
    <template v-slot:text>
      <div class="flex flex-col">
        <v-text-field
          v-model="search"
          label="جستجو"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="outlined"
        ></v-text-field>
      </div>

      <CreateEditDialog mode="create" @submit="handleSubmit">
        <template v-slot:activator>
          <v-btn
            prepend-icon="mdi-plus"
            variant="text"
            @click="openModal('create')"
          >
            ایجاد دانشجو
          </v-btn>
        </template>
      </CreateEditDialog>
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
            :form-data="item"
            :mode="'edit'"
            @submit="handleSubmit"
          >
            <template v-slot:activator>
              <v-btn
                color="grey-lighten-1"
                icon="mdi-pencil"
                variant="text"
                @click="openModal('edit', item)"
              ></v-btn>
            </template>
          </CreateEditDialog>

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
        <v-checkbox v-model="item.active" disabled></v-checkbox>
      </template>
    </v-data-table>
  </v-card>
</template>
