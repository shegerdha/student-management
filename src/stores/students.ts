import { ref } from "vue";
import { defineStore } from "pinia";
import { initStudents, type Student } from "./data";

export const useStudentsStore = defineStore(
  "studentsStore",
  () => {
    const students = ref<Student[]>(initStudents);

    function edit(updatedStudent: Student) {
      const studentIndex = students.value.findIndex(
        (stu) => stu.id === updatedStudent.id,
      );
      if (studentIndex !== -1) {
        Object.assign(students.value[studentIndex], updatedStudent);
      }
    }

    function add(newStudent: Student) {
      debugger;
      students.value.push(newStudent);
    }

    function remove(id: string) {
      debugger;
      students.value = students.value.filter(
        (student) => student.studentId !== id,
      );
    }

    function reset() {
      students.value = initStudents;
    }

    return { students, edit, add, remove, reset };
  },
  {
    persist: {
      storage: localStorage,
      key: "students",
    },
  },
);
