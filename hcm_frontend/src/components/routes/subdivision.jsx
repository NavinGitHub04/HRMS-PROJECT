import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SubDivision() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newSubDivision, setNewSubDivision] = useState({
    PK_SubDivID: '',
    FK_HR_DivisionID: '',
    Name: '',
  });
  const [editSubDivisionId, setEditSubDivisionId] = useState(null);

  useEffect(() => {
    fetchSubDivisions();
  }, []);

  const fetchSubDivisions = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get('/api/v1/subDiv/select');
      setProduct(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const deleteSubDivision = async (id) => {
    try {
      await axios.get(`/api/v1/subDiv/delete/${id}`);
      fetchSubDivisions();
    } catch (error) {
      console.error('Error deleting SubDivision:', error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    setNewSubDivision({
      ...newSubDivision,
      [e.target.name]: e.target.value,
    });
  };

  const startEditSubDivision = (division) => {
    setEditSubDivisionId(division.PK_SubDivID);
    setNewSubDivision({
      PK_SubDivID: division.PK_SubDivID,
      FK_HR_DivisionID: division.FK_HR_DivisionID,
      Name: division.Name,
    });
  };

  const addSubDivision = async () => {
    if (!newSubDivision.PK_SubDivID || !newSubDivision.Name) {
      alert('Please fill in SubDivision ID and Name');
      return;
    }
    try {
      await axios.post('/api/v1/subDiv/create', {
        id: Number(newSubDivision.PK_SubDivID),
        divisionId: Number(newSubDivision.FK_HR_DivisionID),
        name: newSubDivision.Name,
      });
      setNewSubDivision({ PK_SubDivID: '', FK_HR_DivisionID: '', Name: '' });
      fetchSubDivisions();
    } catch (error) {
      console.error('Error adding SubDivision:', error.response?.data || error.message);
    }
  };

  const updateSubDivision = async () => {
    if (!newSubDivision.PK_SubDivID) {
      alert('No SubDivision selected for update!');
      return;
    }
    try {
      await axios.post('/api/v1/subDiv/update', {
        id: Number(newSubDivision.PK_SubDivID),
        divisionId: Number(newSubDivision.FK_HR_DivisionID),
        name: newSubDivision.Name,
      });
      setNewSubDivision({ PK_SubDivID: '', FK_HR_DivisionID: '', Name: '' });
      setEditSubDivisionId(null);
      fetchSubDivisions();
    } catch (error) {
      console.error('Error updating SubDivision:', error.response?.data || error.message);
    }
  };

  if (error) return <h1>Something went wrong</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div className='m-4'>
        <h3>{editSubDivisionId ? 'Edit SubDivision' : 'Add New SubDivision'}</h3>

        <input
          type="text"
          name="PK_SubDivID"
          placeholder="SubDivision ID"
          value={newSubDivision.PK_SubDivID}
          onChange={handleInputChange}
          disabled={!!editSubDivisionId}
          className='pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />

        <input
          type="text"
          name="Name"
          placeholder="SubDivision Name"
          value={newSubDivision.Name}
          onChange={handleInputChange}
          className='pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />

        <input
          type="text"
          name="FK_HR_DivisionID"
          placeholder="Division ID"
          value={newSubDivision.FK_HR_DivisionID}
          onChange={handleInputChange}
          className='pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />

        {editSubDivisionId ? (
          <>
            <button
              onClick={updateSubDivision}
              className="mr-2 bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
            >
              Update SubDivision
            </button>
            <button
              onClick={() => {
                setEditSubDivisionId(null);
                setNewSubDivision({ PK_SubDivID: '', FK_HR_DivisionID: '', Name: '' });
              }}
              className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={addSubDivision}
            className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
          >
            Add SubDivision
          </button>
        )}
      </div>

      <table border="1" cellPadding="10" className="border border-collapse w-full">
        <thead className='text-left'>
          <tr>
            <th colSpan="5">subDivision List: {product.length}</th>
          </tr>
          <tr>
            <th>SubDivision ID</th>
            <th>Name</th>
            <th>Division ID</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {product.map((division, index) => (
            <tr key={index}>
              <td>{division.PK_SubDivID}</td>
              <td>{division.Name}</td>
              <td>{division.FK_HR_DivisionID}</td>
              <td>
                <button
                  onClick={() => startEditSubDivision(division)}
                  className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => deleteSubDivision(division.PK_SubDivID)}
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

export default SubDivision;

