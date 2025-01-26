<script lang="ts" setup>
import { ref, reactive } from "vue";
import { type Student, useStudentsStore } from "@/stores/students";
import CreateEditDialog from "@/views/dialogs/studentManagement/CreateEditDialog.vue";
import RemoveDialog from "@/views/dialogs/studentManagement/RemoveDialog.vue";

const studentsStore = useStudentsStore();
const students = studentsStore.students;

const search = ref("");
const selected = ref([]);
const isDialogOpen = ref<Boolean>(false);

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

const handleConfirm = (index: number) => {
  studentsStore.remove(index);
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

      <CreateEditDialog>
        <template v-slot:activator>
          <v-btn prepend-icon="mdi-plus" variant="text">ایجاد دانشجو</v-btn>
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
      <!-- customizing columns using key names for example operations key in the header's column-->
      <template v-slot:item.operations="allProps">
        <div class="flex flex-row">
          <CreateEditDialog>
            <template v-slot:activator>
              <v-btn
                color="grey-lighten-1"
                icon="mdi-pencil"
                variant="text"
              ></v-btn>
            </template>
          </CreateEditDialog>

          <RemoveDialog
            v-model:isModalOpen="isDialogOpen"
            :index="allProps.index"
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
