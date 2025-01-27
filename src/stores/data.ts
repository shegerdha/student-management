import { ref } from "vue";

export type Student = {
  id: number;
  fullName: string;
  studentId: string;
  email: string;
  active: boolean;
  birthDate: string;
  softDelete: boolean;
};

export const initStudents = ref<Student[]>([
  {
    id: 0,
    fullName: "علی رضایی",
    studentId: "123456",
    email: "ali@example.com",
    active: true,
    birthDate: "2000-01-01",
    softDelete: false,
  },
  {
    id: 1,
    fullName: "زهرا محمدی",
    studentId: "654321",
    email: "zahra@example.com",
    active: false,
    birthDate: "1999-12-31",
    softDelete: false,
  },
  {
    id: 2,
    fullName: "محمد احمدی",
    studentId: "987654",
    email: "mohammad@example.com",
    active: true,
    birthDate: "2001-05-15",
    softDelete: false,
  },
  {
    id: 3,
    fullName: "فاطمه حسینی",
    studentId: "456789",
    email: "fatemeh@example.com",
    active: true,
    birthDate: "2002-07-22",
    softDelete: false,
  },
  {
    id: 4,
    fullName: "سعید کریمی",
    studentId: "112233",
    email: "saeed@example.com",
    active: false,
    birthDate: "2000-03-10",
    softDelete: true,
  },
  {
    id: 5,
    fullName: "نرگس شریفی",
    studentId: "334455",
    email: "narges@example.com",
    active: true,
    birthDate: "1998-09-05",
    softDelete: false,
  },
  {
    id: 6,
    fullName: "رضا مرادی",
    studentId: "778899",
    email: "reza@example.com",
    active: false,
    birthDate: "1997-11-30",
    softDelete: false,
  },
  {
    id: 7,
    fullName: "مریم عباسی",
    studentId: "665544",
    email: "maryam@example.com",
    active: true,
    birthDate: "2001-06-18",
    softDelete: false,
  },
  {
    id: 8,
    fullName: "حسین جعفری",
    studentId: "223344",
    email: "hosein@example.com",
    active: false,
    birthDate: "1996-04-25",
    softDelete: true,
  },
  {
    id: 9,
    fullName: "لیلا قاسمی",
    studentId: "998877",
    email: "leila@example.com",
    active: true,
    birthDate: "2003-02-12",
    softDelete: false,
  },
]);
