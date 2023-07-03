// studentSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    name: 'John Doe',
    age: 20,
    address: '123 Main St',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 22,
    address: '456 Elm St',
    email: 'janesmith@example.com',
  },
];

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    updateStudentDetails: (state, action) => {
      const { id, name, age, address, email } = action.payload;
      const existingStudent = state.find((student) => student.id === id);
      if (existingStudent) {
        existingStudent.name = name;
        existingStudent.age = age;
        existingStudent.address = address;
        existingStudent.email = email;
      }
    },
    addStudent: (state, action) => {
      const { id, name, age, address, email } = action.payload;
      state.push({ id, name, age, address, email });
    },
    deleteStudent: (state, action) => {
      const id = action.payload;
      return state.filter((student) => student.id !== id);
    },
  },
});

export const { updateStudentDetails, addStudent, deleteStudent } = studentSlice.actions;

export const selectStudentDetails = (state :any) => state.student;

export default studentSlice.reducer;
