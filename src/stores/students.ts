import { ref } from "vue";
import { defineStore } from "pinia";

export type Student = {
  id: number;
  fullName: string;
  studentId: string;
  email: string;
  active: boolean;
  birthDate: string;
};

export const useStudentsStore = defineStore(
  "studentsStore",
  () => {
    const students = ref<Student[]>([
      {
        id: 1,
        fullName: "علی رضایی",
        studentId: "123456",
        email: "ali@example.com",
        active: true,
        birthDate: "2000-01-01",
      },
      {
        id: 2,
        fullName: "زهرا محمدی",
        studentId: "654321",
        email: "zahra@example.com",
        active: false,
        birthDate: "1999-12-31",
      },
    ]);

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

    function remove(id: number) {
      console.log("Removing student with id:", id);
      students.value = students.value.filter((student) => student.id !== id); // This is reactive
    }

    return { students, edit, add, remove };
  },
  {
    persist: {
      storage: localStorage,
      key: "students",
    },
  },
);
