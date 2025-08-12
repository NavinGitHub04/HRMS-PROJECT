import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Componey() {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newCompany, setNewCompany] = useState({
    ID: '',
    Name: '',
    Address: '',
    Currency: ''
  });
  const [editCompanyId, setEditCompanyId] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await axios.get('/api/v1/company/select');
      setProduct(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const deleteCompany = async (id) => {
    try {
      await axios.get(`/api/v1/company/delete/${id}`);
      fetchCompanies();
    } catch (error) {
      console.error('Error deleting company:', error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    setNewCompany({
      ...newCompany,
      [e.target.name]: e.target.value
    });
  };
  const startEditCompany = (company) => {
    setEditCompanyId(company.PK_CompanyID);
    setNewCompany({
      ID: company.PK_CompanyID,
      Name: company.Name,
      Address: company.Address,
      Currency: company.Currency
    });
  };
  const addCompany = async () => {
    if (!newCompany.ID || !newCompany.Name) {
      alert('Please fill in at least ID and Name');
      return;
    }
    try {
      await axios.post('/api/v1/company/create', {
        id: Number(newCompany.ID),
        name: newCompany.Name,
        address: newCompany.Address,
        currency: newCompany.Currency
      });
      setNewCompany({ ID: '', Name: '', Address: '', Currency: '' });
      fetchCompanies();
    } catch (error) {
      console.error('Error adding company:', error.response?.data || error.message);
    }
  };
  const updateCompany = async () => {
    if (!newCompany.ID) {
      alert('No company selected for update!');
      return;
    }
    try {
      await axios.post('/api/v1/company/update', {
        id: Number(newCompany.ID),
        name: newCompany.Name,
        address: newCompany.Address,
        currency: newCompany.Currency
      });
      setNewCompany({ ID: '', Name: '', Address: '', Currency: '' });
      setEditCompanyId(null);
      fetchCompanies();
    } catch (error) {
      console.error('Error updating company:', error.response?.data || error.message);
    }
  };

  if (error) return <h1>Something went wrong</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <div className='m-4'>
        <h3>{editCompanyId ? 'Edit Company' : 'Add New Company'}</h3>
        <input
          type="text"
          name="ID"
          placeholder="Enter Company ID"
          value={newCompany.ID}
          onChange={handleInputChange}
          disabled={!!editCompanyId}
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />
        <input
          type="text"
          name="Name"
          placeholder="Enter Company Name"
          value={newCompany.Name}
          onChange={handleInputChange}
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400
           bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />
        <input
          type="text"
          name="Address"
          placeholder="Enter Address"
          value={newCompany.Address}
          onChange={handleInputChange}
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />
        <input
          type="text"
          name="Currency"
          placeholder="Enter Currency"
          value={newCompany.Currency}
          onChange={handleInputChange}
          className=' pl-4 pr-4 py-2 text-gray-800 placeholder-gray-400 bg-white bg-opacity-70 border-none border-r-4
           border-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 
           focus:ring-blue-400 transition duration-200'
        />
        {editCompanyId ? (
          <>
            <button onClick={updateCompany}
              className='mr-2 bg-slate-500 hover:bg-slate-400 text-white font-semibold 
            pr-2 py-2 px-2 rounded shadow-md'>
              Update Company
            </button>
            <button
              onClick={() => {
                setEditCompanyId(null);
                setNewCompany({ ID: '', Name: '', Address: '', Currency: '' });

              }}
              className='bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md'

            >
              Cancel
            </button>
          </>
        ) : (
          <button onClick={addCompany}
            className='bg-slate-500 hover:bg-slate-400 text-white font-semibold 
          pr-2 py-2 px-2 rounded shadow-md'>Add Company</button>
        )}
      </div>

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead style={{ textAlign: 'left' }}>
          <tr>
            <th colSpan="6">Company List: {product.length}</th>
          </tr>
          <tr>
            <th>Company ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Currency</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {product.map((company, index) => (
            <tr key={index}>
              <td>{company.PK_CompanyID}</td>
              <td>{company.Name}</td>
              <td>{company.Address}</td>
              <td>{company.Currency}</td>
              <td>
                <button onClick={() => startEditCompany(company)}
                  className='bg-slate-500 hover:bg-slate-400 text-white font-semibold 
                pr-2 py-2 px-2 rounded shadow-md'>Edit</button>
              </td>
              <td>
                <button onClick={() => deleteCompany(company.PK_CompanyID)}
                  className='bg-slate-500 hover:bg-slate-400 text-white 
                font-semibold pr-2 py-2 px-2 rounded shadow-md'>
                  Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Componey;

