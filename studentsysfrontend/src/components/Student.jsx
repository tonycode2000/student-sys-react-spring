import { useEffect, useState } from 'react';
import { Button, Container, Paper, Typography, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

export default function Student() {
  const [form, setForm] = useState({ name: '', address: '' });
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Fetch students
  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:8080/student/getAll');
      setStudents(res.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add or update student
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        // Update student
        const studentId = students[editIndex].id; // assuming your Student model has `id`
        await axios.put(`http://localhost:8080/student/${studentId}`, form);
      } else {
        // Add new student
        await axios.post('http://localhost:8080/student/add', form);
      }
      setForm({ name: '', address: '' });
      setEditIndex(null);
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
      alert('Error saving student');
    }
  };

  // Edit student
  const handleEdit = (index) => {
    setForm({ name: students[index].name, address: students[index].address });
    setEditIndex(index);
    setOpenDialog(true);
  };

  // Delete student
  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:8080/student/${id}`);
        fetchStudents();
      } catch(error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  // Filtered students
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        {/* Form */}
        <form onSubmit={handleSave}>
          <Typography variant="h4" sx={{ color: 'blue', textAlign: 'center', mb: 3 }}>
            {editIndex !== null ? 'Edit Student' : 'Add Student'}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Student Name" name="name" value={form.name} onChange={handleChange} fullWidth />
            <TextField label="Student Address" name="address" value={form.address} onChange={handleChange} fullWidth />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button type="submit" variant="contained">{editIndex !== null ? 'Update' : 'Save'}</Button>
          </Box>
        </form>

        {/* Search */}
        <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
          />
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student, index) => (
                <TableRow key={student.id || index}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleEdit(index)}><Edit /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(student.id)}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">No students found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}