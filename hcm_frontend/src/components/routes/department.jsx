import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Department() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newDepartment, setNewDepartment] = useState({
    id: '',
    name: '',
    code: '',
    deptId: ''
  });

  const [editDepartmentId, setEditDepartmentId] = useState(null);

  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get('/api/v1/dept/select');
      setProduct(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const deleteDepartment = async (id) => {
    try {
      await axios.get(`/api/v1/dept/delete/${id}`);
      fetchDepartment();
    } catch (error) {
      console.error('Error deleting Department:', error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    setNewDepartment({
      ...newDepartment,
      [e.target.name]: e.target.value
    });
  };

  const startEditDepartment = (dept) => {
    setEditDepartmentId(dept.PK_DeptID);
    setNewDepartment({
      id: dept.PK_DeptID?.toString() || '',
      name: dept.Name || '',
      code: dept.Code || '',
      deptId: dept.DeptId || '',
    });
  };

  const addDepartment = async () => {
    if (!newDepartment.id || !newDepartment.name) {
      alert('Please fill in at least ID and Name');
      return;
    }
    try {
      await axios.post('/api/v1/dept/create', {
        id: Number(newDepartment.id),
        name: newDepartment.name,
        code: newDepartment.code,
        deptId: newDepartment.deptId,
      });
      setNewDepartment({ id: '', name: '', code: '', deptId: '' });
      fetchDepartment();
    } catch (error) {
      console.error('Error adding Department:', error.response?.data || error.message);
    }
  };

  const updateDepartment = async () => {
    if (!newDepartment.id) {
      alert('No Department selected for update!');
      return;
    }
    try {
      await axios.post('/api/v1/dept/update', {
        id: Number(newDepartment.id),
        name: newDepartment.name,
        code: newDepartment.code,
      });
      setNewDepartment({ id: '', name: '', code: '', deptId: '' });
      setEditDepartmentId(null);
      fetchDepartment();
    } catch (error) {
      console.error('Error updating Department:', error.response?.data || error.message);
    }
  };

  if (error) return <h1>Something went wrong</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div className='m-4'>
        <h3>{editDepartmentId ? 'Edit Department' : 'Add New Department'}</h3>
        <input
          type="text"
          name="id"
          placeholder="Enter Department ID"
          value={newDepartment.id}
          onChange={handleInputChange}
          disabled={!!editDepartmentId}
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />
        <input
          type="text"
          name="name"
          placeholder="Enter Department Name"
          value={newDepartment.name}
          onChange={handleInputChange}
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />
        <input
          type="text"
          name="code"
          placeholder="Enter Code"
          value={newDepartment.code}
          onChange={handleInputChange}
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />
        <input
          type="text"
          name="deptId"
          placeholder="Enter Parent DeptId"
          value={newDepartment.deptId}
          onChange={handleInputChange}
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />
        {editDepartmentId ? (
          <>
            <button onClick={updateDepartment}
              className='mr-2 bg-slate-500 hover:bg-slate-400 text-white font-semibold 
              pr-2 py-2 px-2 rounded shadow-md'>
              Update Department
            </button>
            <button
              onClick={() => {
                setEditDepartmentId(null);
                setNewDepartment({ id: '', name: '', code: '', deptId: '', description: '', isActive: true });
              }}
              className='bg-slate-500 hover:bg-slate-400 text-white font-semibold 
              pr-2 py-2 px-2 rounded shadow-md'
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={addDepartment}
            className='bg-slate-500 hover:bg-slate-400 text-white font-semibold 
            pr-2 py-2 px-2 rounded shadow-md'>Add Department</button>
        )}
      </div>

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ textAlign: 'left' }}>
          <tr>
            <th colSpan="6">Department List: {product.length}</th>
          </tr>
          <tr>
            <th>Department ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>DeptID</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {product.map((dept, index) => (
            <tr key={index}>
              <td>{dept.PK_DeptID}</td>
              <td>{dept.Name}</td>
              <td>{dept.Code}</td>
              <td>{dept.FK_HR_DeptID}</td>
              <td>
                <button onClick={() => startEditDepartment(dept)} className='bg-slate-500 hover:bg-slate-400 text-white font-semibold 
                pr-2 py-2 px-2 rounded shadow-md'>Edit</button>
              </td>
              <td>
                <button onClick={() => deleteDepartment(dept.PK_DeptID)} className='bg-slate-500 hover:bg-slate-400 text-white font-semibold 
                pr-2 py-2 px-2 rounded shadow-md'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Department;
