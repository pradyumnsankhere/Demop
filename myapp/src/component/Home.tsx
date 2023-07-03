 
 
 
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@material-ui/core';
import {
  selectStudentDetails,
  updateStudentDetails,
  addStudent,
  deleteStudent,
} from '../Redux/studentSlice ';

const StudentDetailPage = () => {
  const dispatch = useDispatch();
  const studentDetails = useSelector(selectStudentDetails);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [sortByName, setSortByName] = useState(false);

  const handleSave = () => {
    if (editMode) {
      const updatedStudent = {
        id: selectedStudentId,
        name,
        age,
        address,
        email,
      };
      dispatch(updateStudentDetails(updatedStudent));
      setEditMode(false);
      setSelectedStudentId('');
    } else {
      const newStudent = {
        name,
        age,
        address,
        email,
      };
      dispatch(addStudent(newStudent));
    }
    setName('');
    setAge('');
    setAddress('');
    setEmail('');
  };

  const handleEdit = (studentId: string) => {
    const selectedStudent = studentDetails.find((student :any) => student.id === studentId);
    if (selectedStudent) {
      setName(selectedStudent.name);
      setAge(selectedStudent.age);
      setAddress(selectedStudent.address);
      setEmail(selectedStudent.email);
      setEditMode(true);
      setSelectedStudentId(studentId);
    }
  };

  const handleDelete = (studentId: string) => {
    dispatch(deleteStudent(studentId));
  };

  const handleSortByName = () => {
    setSortByName(!sortByName);
  };

  const filteredStudents = studentDetails.filter((student :any) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortByName) {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" style={{ marginBottom: '16px' }}>
          Student Details
        </Typography>
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="Age"
            variant="outlined"
            fullWidth
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: '16px' }}>
            {editMode ? 'Update Student' : 'Add Student'}
          </Button>
          <Button variant="contained" color="primary" onClick={handleSortByName}>
            Sort by Name {sortByName ? '▲' : '▼'}
          </Button>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginLeft: '16px' }}
          />
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(student.id)} style={{ marginRight: '8px' }}>
                      Edit
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(student.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default StudentDetailPage;



