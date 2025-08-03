import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, Button, TextField, Typography, 
  Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper,
  IconButton, Container, CssBaseline
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:8080/api/v1';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: '', name: '' });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/getUsers`);
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit form (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/updateuser`, formData);
        toast.success('User updated successfully');
      } else {
        await axios.post(`${API_URL}/adduser`, formData);
        toast.success('User added successfully');
      }
      resetForm();
      fetchUsers();
    } catch (error) {
      toast.error(`Failed to ${editingId ? 'update' : 'add'} user`);
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setFormData({ id: user.id, name: user.name });
    setEditingId(user.id);
    setShowForm(true);
  };

  // Delete user
  const handleDelete = async (user) => {
    try {
      await axios.delete(`${API_URL}/deleteuser`, { data: user });
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ id: '', name: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>

        {!showForm && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setShowForm(true)}
            sx={{ mb: 3 }}
          >
            Add New User
          </Button>
        )}

        {showForm && (
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            sx={{ 
              p: 3, 
              mb: 3, 
              border: '1px solid #ddd', 
              borderRadius: 1 
            }}
          >
            <TextField
              fullWidth
              margin="normal"
              label="ID"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              required
              type="number"
              disabled={!!editingId}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Box sx={{ mt: 2 }}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                sx={{ mr: 2 }}
              >
                {editingId ? 'Update' : 'Add'} User
              </Button>
              <Button 
                variant="outlined" 
                onClick={resetForm}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(user)}>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;