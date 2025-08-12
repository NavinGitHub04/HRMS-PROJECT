import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Job() {
    const [product, setProduct] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [newJob, setNewJob] = useState({
        PK_JobID: '',
        Title: '',
        Description: '',
        createdDate: '',
        modifiedDate: '',
    });

    const [editJobPK_JobID, setEditJobPK_JobID] = useState(null);

    useEffect(() => {
        fetchJob();
    }, []);

    const fetchJob = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get('/api/v1/job/select');
            setProduct(response.data.data);
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    const deleteJob = async (PK_JobID) => {
        try {
            await axios.get(`/api/v1/job/delete/${PK_JobID}`);
            fetchJob();
        } catch (error) {
            console.error('Error deleting Job:', error.response?.data || error.message);
        }
    };

    const handleInputChange = (e) => {
        // const { name, value } = e.target.value;
        setNewJob({
            ...newJob,
            [e.target.name]: e.target.value,
        });
    };

    const startEditJob = (job) => {
        setEditJobPK_JobID(job.PK_JobID);
        setNewJob({
            PK_JobID: job.PK_JobID?.toString() || '',
            Title: job.Title || '',
            Description: job.Description || '',
        });
    };

    const addJob = async () => {
        if (!newJob.PK_JobID || !newJob.Title) {
            alert('Please fill in at least PK_JobID and Title');
            return;
        }
        try {
            await axios.post('/api/v1/job/create', {
                id: Number(newJob.PK_JobID),
                title: newJob.Title,
                description: newJob.Description,
                createdDate: newJob.createdDate,
                modifiedDate: newJob.modifiedDate,
            });
            setNewJob({ PK_JobID: '', Title: '', Description: '' });
            console.log(setNewJob({ PK_JobID: '', Title: '', Description: '' }));
            fetchJob();
        } catch (error) {
            console.error('Error adding Job:', error.response?.data || error.message);
        }
    };

    const updateJob = async () => {
        if (!newJob.PK_JobID) {
            alert('No Job selected for update!');
            return;
        }
        try {
            await axios.post('/api/v1/job/update', {
                id: Number(newJob.PK_JobID),
                title: newJob.Title,
                description: newJob.Description,
                modifiedDate: newJob.modifiedDate,
            });
            setNewJob({ PK_JobID: '', Title: '', Description: '' });
            setEditJobPK_JobID(null);
            fetchJob();
        } catch (error) {
            console.error('Error updating Job:', error.response?.data || error.message);
        }
    };

    if (error) return <h1>Something went wrong</h1>;
    if (loading) return <h1>Loading...</h1>;

    return (
        <>
            <div style={{ margin: '20px' }}>
                <h3>{editJobPK_JobID ? 'Edit Job' : 'Add New Job'}</h3>
                <input
                    type="text"
                    name="PK_JobID"
                    placeholder="Enter ID "
                    value={newJob.PK_JobID}
                    onChange={handleInputChange}
                    disabled={!!editJobPK_JobID}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="text"
                    name="Title"
                    placeholder="Enter Job Title"
                    value={newJob.Title}
                    onChange={handleInputChange}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Enter Job Description"
                    value={newJob.Description}
                    onChange={handleInputChange}
                    style={{ marginRight: '10px' }}
                />
                <input
                    type="date"
                    name="createdDate"
                    placeholder="Enter created date"
                    value={newJob.createdDate}
                    onChange={handleInputChange}
                    disabled={!!editJobPK_JobID}
                    style={{ marginRight: '10px' }}
                />

                <input
                    type="date"
                    name="modifiedDate"
                    placeholder="Enter modified date"
                    value={newJob.modifiedDate}
                    onChange={handleInputChange}
                    style={{ marginRight: '10px' }}
                />
                {editJobPK_JobID ? (
                    <>
                        <button
                            onClick={updateJob}
                            className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
                            style={{ marginRight: '10px' }}
                        >
                            Update Job
                        </button>
                        <button
                            onClick={() => {
                                setEditJobPK_JobID(null);
                                setNewJob({ PK_JobID: '', Title: '', Description: '' });
                            }}
                            className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={addJob}
                        className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
                    >
                        Add Job
                    </button>
                )}
            </div>

            <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead style={{ textAlign: 'left' }}>
                    <tr>
                        <th colSpan="5">Job List: {product.length}</th>
                    </tr>
                    <tr>
                        <th>Job ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Created Date</th>
                        <th>Updated Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((job, index) => (
                        <tr key={index}>
                            <td>{job.PK_JobID}</td>
                            <td>{job.Title}</td>
                            <td>{job.Description}</td>
                            <td>{job.CreatedDate}</td>
                            <td>{job.ModifiedDate}</td>
                            <td>
                                <button
                                    onClick={() => startEditJob(job)}
                                    className="bg-slate-500 hover:bg-slate-400 text-white font-semibold pr-2 py-2 px-2 rounded shadow-md"
                                >
                                    Edit
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => deleteJob(job.PK_JobID)}
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

export default Job;

