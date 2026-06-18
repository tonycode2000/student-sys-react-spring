import studentApi from "../api/studentApi";


const studentService = {
  // ទទួល students ទាំងអស់
  getAllStudents: async () => {
    const res = await studentApi.getAll();
    return res.data;
  },

  // បន្ថែម student ថ្មី
  createStudent: async (form) => {
    if (!form.name?.trim() || !form.address?.trim()) {
      throw new Error('Name and Address are required');
    }
    const res = await studentApi.create(form);
    return res.data;
  },

  // កែ student
  updateStudent: async (id, form) => {
    if (!id) throw new Error('Student ID is required');
    if (!form.name?.trim() || !form.address?.trim()) {
      throw new Error('Name and Address are required');
    }
    const res = await studentApi.update(id, form);
    return res.data;
  },

  // លុប student
  deleteStudent: async (id) => {
    if (!id) throw new Error('Student ID is required');
    await studentApi.delete(id);
  },
};

export default studentService;