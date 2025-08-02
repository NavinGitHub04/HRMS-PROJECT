import { connection } from "../db/index.js"
import { apiError } from "../utils/apiError.js"

const getAllJobs = async () => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_job`)
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const getJobById = async (id) => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_job WHERE PK_JobID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const createJob = async (id, title, description, createdDate, modifiedDate) => {
    try {
        const [result] = await connection.promise().query(`INSERT INTO hr_job (PK_JobID, Title, Description, CreatedDate, ModifiedDate) VALUES (?, ?, ?, ?, ?)`, [id, title, description, createdDate, modifiedDate])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const updateJob = async (id, title, description, modifiedDate) => {
    try {
        const [result] = await connection.promise().query(`UPDATE hr_job SET Title = ?, Description = ?, ModifiedDate = ? WHERE PK_JobID = ?`, [title, description, modifiedDate, id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const deleteJob = async (id) => {
    try {
        const result = await connection.promise().query(`DELETE FROM hr_job WHERE PK_JobID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

export default {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
}