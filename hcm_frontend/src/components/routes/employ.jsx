import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Employ() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newEmploy, setNewEmploy] = useState({
    id: '',
    name: '',
    code: '',
  });

  const [editEmployId, setEditEmployId] = useState(null);

  useEffect(() => {
    fetchEmploy();
  }, []);

  const fetchEmploy = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get('/api/v1/empCat/select');
      setProduct(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const deleteEmploy = async (id) => {
    try {
      await axios.get(`/api/v1/empCat/delete/${id}`);
      fetchEmploy();
    } catch (error) {
      console.error('Error deleting Employ :', error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    setNewEmploy({
      ...newEmploy,
      [e.target.name]: e.target.value
    });
  };

  const startEditEmploy = (Employ) => {
    setEditEmployId(Employ.PK_CatID);
    setNewEmploy({
      id: Employ.PK_CatID?.toString() || '',
      name: Employ.Name || '',
      code: Employ.Code || '',
    });
  };

  const addEmploy = async () => {
    if (!newEmploy.id || !newEmploy.name) {
      alert('Please fill in at least ID and Name');
      return;
    }
    try {
      await axios.post('/api/v1/empCat/create', {
        id: Number(newEmploy.id),
        name: newEmploy.name,
        code: newEmploy.code,
      });
      setNewEmploy({ id: '', name: '', code: '' });
      fetchEmploy();
    } catch (error) {
      console.error('Error adding Employ:', error.response?.data || error.message);
    }
  };

  const updateEmploy = async () => {
    if (!newEmploy.id) {
      alert('No Employ selected for update!');
      return;
    }
    try {
      await axios.post('/api/v1/empCat/update', {
        id: Number(newEmploy.id),
        name: newEmploy.name,
        code: newEmploy.code,
      });
      setNewEmploy({ id: '', name: '', code: '' });
      setEditEmployId(null);
      fetchEmploy();
    } catch (error) {
      console.error('Error updating Employ:', error.response?.data || error.message);
    }
  };

  if (error) return <h1>Something went wrong</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div style={{ margin: '20px' }}>
        <h3>{editEmployId ? 'Edit Employ' : 'Add New Employ'}</h3>
        <input
          type="text"
          name="id"
          placeholder="Enter Employ ID"
          value={newEmploy.id}
          onChange={handleInputChange}
          disabled={!!editEmployId}
          // className="mr-10 pl-2 bg-transparent  rounded-lg  border-0 focus:outline-none focus:border-0 border-r-4"
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />
        <input
          type="text"
          name="name"
          placeholder="Enter Employ Name"
          value={newEmploy.name}
          onChange={handleInputChange}
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />
        <input
          type="text"
          name="code"
          placeholder="Enter Code"
          value={newEmploy.code}
          onChange={handleInputChange}
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />
        {editEmployId ? (
          <>
            <button onClick={updateEmploy} style={{ marginRight: '10px' }}
              className='bg-slate-500 hover:bg-slate-400 text-white font-semibold 
              pr-2 py-2 px-2 rounded shadow-md'>
              Update Employ
            </button>
            <button
              onClick={() => {
                setEditEmployId(null);
                setNewEmploy({ id: '', name: '', code: '' });
              }}
              className='bg-slate-500 hover:bg-slate-400 text-white font-semibold 
              pr-2 py-2 px-2 rounded shadow-md'
            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={addEmploy}
            className='bg-slate-500 hover:bg-slate-400 text-white font-semibold 
            pr-2 py-2 px-2 rounded shadow-md'>Add Employ</button>
        )}
      </div>

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ textAlign: 'left' }}>
          <tr>
            <th colSpan="3">Employ List: {product.length}</th>
          </tr>
          <tr>
            <th>Employ ID</th>
            <th>Name</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {product.map((Employ, index) => (
            <tr key={index}>
              <td>{Employ.PK_CatID}</td>
              <td>{Employ.Name}</td>
              <td>{Employ.Code}</td>
              <td>
                <button onClick={() => startEditEmploy(Employ)} className='bg-slate-500 hover:bg-slate-400 text-white font-semibold 
                pr-2 py-2 px-2 rounded shadow-md'>Edit</button>
              </td>
              <td>
                <button onClick={() => deleteEmploy(Employ.PK_CatID)} className='bg-slate-500 hover:bg-slate-400 text-white font-semibold 
                pr-2 py-2 px-2 rounded shadow-md'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Employ;
