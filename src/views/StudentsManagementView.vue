<script lang="ts" setup>
import { ref } from "vue";
import { type Student, useStudentsStore } from "@/stores/students";
import CreateEditDialog from "@/views/dialogs/studentManagement/CreateEditDialog.vue";
import RemoveDialog from "@/views/dialogs/studentManagement/RemoveDialog.vue";

const studentsStore = useStudentsStore();
const students = studentsStore.students;

const search = ref("");
const selected = ref([]);
const isDialogOpen = ref(false);
const isCreateEditDialogOpen = ref(false);
const editingStudentIndex = ref<number | null>(null);

const headers = ref([
  { key: "id", title: "ردیف" },
  { key: "fullName", title: "نام و نام خانوادگی" },
  { key: "studentId", title: "شماره دانشجویی" },
  { key: "email", title: "ایمیل" },
  { key: "activeStatus", title: "فعال" },
  { key: "birthDate", title: "تاریخ تولد" },
  { key: "operations", title: "عملیات" },
]);

const handleCloseDialog = () => {
  isDialogOpen.value = false;
};

const handleCloseCreateEditDialog = () => {
  isCreateEditDialogOpen.value = false;
  editingStudentIndex.value = null;
};

const handleConfirm = (index: number) => {
  studentsStore.remove(index);
};

const handleFormSubmit = (val: Student) => {
  if (editingStudentIndex.value !== null) {
    studentsStore.edit(val);
  } else {
    debugger;
    studentsStore.add({ ...val, id: students.value.length + 1 });
  }
  handleCloseCreateEditDialog();
};

const openEditDialog = (index: number) => {
  editingStudentIndex.value = index;
  isCreateEditDialogOpen.value = true;
};
</script>

<template>
  <v-card flat title="مدیریت دانشجو">
    <template v-slot:text>
      <div class="flex flex-col">
        <v-text-field
          v-model="search"
          label="جستجو"
          placeholder="در هر فیلدی جست و جو کنید"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="outlined"
        ></v-text-field>
      </div>

      <CreateEditDialog
        v-model:isCreateEditModalOpen="isCreateEditDialogOpen"
        :student="
          editingStudentIndex !== null ? students[editingStudentIndex] : null
        "
        @handleClose="handleCloseCreateEditDialog"
        @handleSubmit="handleFormSubmit"
      >
        <template v-slot:activator="props">
          <v-btn
            prepend-icon="mdi-plus"
            v-bind="props.activatorProps"
            variant="text"
            @click="isCreateEditDialogOpen = true"
            >ایجاد دانشجو
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
      <template v-slot:item.operations="{ index }">
        <div class="flex flex-row">
          <v-btn
            color="grey-lighten-1"
            icon="mdi-pencil"
            variant="text"
            @click="openEditDialog(index)"
          ></v-btn>

          <RemoveDialog
            v-model:isModalOpen="isDialogOpen"
            :index="students[index].id"
            @handleClose="handleCloseDialog"
            @handleConfirm="handleConfirm"
          >
            <template v-slot:activator="props">
              <v-btn
                color="red-lighten-2"
                icon="mdi-close-thick"
                v-bind="props.activatorProps"
                variant="text"
                @click="isDialogOpen = true"
              ></v-btn>
            </template>
          </RemoveDialog>
        </div>
      </template>

      <template v-slot:item.activeStatus="{ item }">
        <v-checkbox v-model="item.active" disabled></v-checkbox>
      </template>
    </v-data-table>
  </v-card>
</template>
