import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Division() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newDivision, setNewDivision] = useState({
    PK_DivID: '',
    FK_HR_CompanyID: '',
    Name: '',
  });
  const [editDivisionId, setEditDivisionId] = useState(null);

  useEffect(() => {
    fetchDivision();
  }, []);

  const fetchDivision = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get('/api/v1/division/select');
      setProduct(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const deleteDivision = async (id) => {
    try {
      await axios.get(`/api/v1/division/delete/${id}`);
      fetchDivision();
    } catch (error) {
      console.error('Error deleting Division:', error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    setNewDivision({
      ...newDivision,
      [e.target.name]: e.target.value,
    });
  };

  const startEditDivision = (division) => {
    setEditDivisionId(division.PK_DivID);
    setNewDivision({
      PK_DivID: division.PK_DivID,
      FK_HR_CompanyID: division.FK_HR_CompanyID,
      Name: division.Name,
    });
  };

  const addDivision = async () => {
    if (!newDivision.PK_DivID || !newDivision.Name) {
      alert('Please fill in at least Division ID and Name');
      return;
    }
    try {
      await axios.post('/api/v1/division/create', {
        id: Number(newDivision.PK_DivID),
        companyId: Number(newDivision.FK_HR_CompanyID),
        name: newDivision.Name,
      });
      setNewDivision({ PK_DivID: '', FK_HR_CompanyID: '', Name: '' });
      fetchDivision();
    } catch (error) {
      console.error('Error adding Division:', error.response?.data || error.message);
    }
  };

  const updateDivision = async () => {
    if (!newDivision.PK_DivID) {
      alert('No Division selected for update!');
      return;
    }
    try {
      await axios.post('/api/v1/division/update', {
        id: Number(newDivision.PK_DivID),
        name: newDivision.Name,
        companyId: Number(newDivision.FK_HR_CompanyID),
      });
      setNewDivision({ PK_DivID: '', FK_HR_CompanyID: '', Name: '' });
      setEditDivisionId(null);
      fetchDivision();
    } catch (error) {
      console.error('Error updating Division:', error.response?.data || error.message);
    }
  };

  if (error) return <h1>Something went wrong</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div className='m-4'>
        <h3>{editDivisionId ? 'Edit Division' : 'Add New Division'}</h3>
        <input
          type="text"
          name="PK_DivID"
          placeholder="Enter Division ID"
          value={newDivision.PK_DivID}
          onChange={handleInputChange}
          disabled={!!editDivisionId}
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />
        <input
          type="text"
          name="Name"
          placeholder="Enter Division Name"
          value={newDivision.Name}
          onChange={handleInputChange}
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />
        <input
          type="text"
          name="FK_HR_CompanyID"
          placeholder="Enter Company ID"
          value={newDivision.FK_HR_CompanyID}
          onChange={handleInputChange}
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />
        {editDivisionId ? (
          <>
            <button
              onClick={updateDivision}
              className="mr-2 bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
            >
              Update Division
            </button>
            <button
              onClick={() => {
                setEditDivisionId(null);
                setNewDivision({ PK_DivID: '', FK_HR_CompanyID: '', Name: '' });
              }}
              className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={addDivision}
            className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
          >
            Add Division
          </button>
        )}
      </div>

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ textAlign: 'left' }}>
          <tr>
            <th colSpan="5">Division List: {product.length}</th>
          </tr>
          <tr>
            <th>Division ID</th>
            <th>Name</th>
            <th>Company ID</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {product.map((division, index) => (
            <tr key={index}>
              <td>{division.PK_DivID}</td>
              <td>{division.Name}</td>
              <td>{division.FK_HR_CompanyID}</td>
              <td>
                <button
                  onClick={() => startEditDivision(division)}
                  className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => deleteDivision(division.PK_DivID)}
                  className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Division;
