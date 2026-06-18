import { useEffect, useState, useCallback } from 'react';
import studentService from '../service/studentService';

const INITIAL_FORM = { name: '', address: '' };

export default function useStudent() {
  const [students, setStudents]     = useState([]);
  const [form, setForm]             = useState(INITIAL_FORM);
  const [search, setSearch]         = useState('');
  const [editId, setEditId]         = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);

  // ─── Fetch ───────────────────────────────────────────
  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await studentService.getAllStudents();
      setStudents(data);
    } catch (err) {
      setError('Failed to fetch students');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // ─── Form ─────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setEditId(null);
    setOpenDialog(false);
    setError(null);
  };

  // ─── Save (Add / Update) ──────────────────────────────
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (editId !== null) {
        await studentService.updateStudent(editId, form);
      } else {
        await studentService.createStudent(form);
      }
      resetForm();
      await fetchStudents();
    } catch (err) {
      setError(err.message || 'Error saving student');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ─── Edit ─────────────────────────────────────────────
  const handleEdit = (student) => {
    setForm({ name: student.name, address: student.address });
    setEditId(student.id);
    setOpenDialog(true);
  };

  // ─── Delete ───────────────────────────────────────────
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    setLoading(true);
    setError(null);
    try {
      await studentService.deleteStudent(id);
      await fetchStudents();
    } catch (err) {
      setError('Error deleting student');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ─── Filter ───────────────────────────────────────────
  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase())
  );

  return {
    // State
    form,
    search,
    editId,
    openDialog,
    loading,
    error,
    filteredStudents,
    // Handlers
    handleChange,
    handleSave,
    handleEdit,
    handleDelete,
    resetForm,
    setSearch,
  };
}