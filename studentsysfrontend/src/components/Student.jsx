import {
  Box, Button, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, IconButton, Paper,
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Typography,
  Alert, CircularProgress,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import useStudent from '../hook/useStudent';

export default function Student() {
  const {
    form, search, editId, openDialog,
    loading, error, filteredStudents,
    handleChange, handleSave, handleEdit,
    handleDelete, resetForm, setSearch,
  } = useStudent();

  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>

        {/* ── Error ── */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        )}

        {/* ── Form Add ── */}
        <Typography variant="h4" sx={{ color: 'blue', textAlign: 'center', mb: 3 }}>
          Add Student
        </Typography>
        <form onSubmit={handleSave}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Student Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Student Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={20} /> : 'Save'}
            </Button>
          </Box>
        </form>

        {/* ── Search ── */}
        <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
          />
        </Box>

        {/* ── Table ── */}
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">No students found</TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.address}</TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" onClick={() => handleEdit(student)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(student.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* ── Dialog Edit ── */}
      <Dialog open={openDialog} onClose={resetForm} fullWidth maxWidth="sm">
        <DialogTitle>Edit Student</DialogTitle>
        <form onSubmit={handleSave}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Student Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Student Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={resetForm}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={20} /> : 'Update'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}