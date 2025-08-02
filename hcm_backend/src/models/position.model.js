import { connection } from "../db/index.js"
import { apiError } from "../utils/apiError.js"

const getAllPositions = async () => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_position`)
        return result
    } catch (error) {
        throw apiError(400, error)
    }
}

const getPositionById = async (id) => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_position WHERE PK_PositionID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const createPosition = async (id, jobId, OrgUnitId, title, validFrom, validTo, createdDate, modifiedDate) => {
    try {
        const [result] = await connection.promise().query(`INSERT INTO hr_position (PK_PositionID, FK_HR_JobID, FK_HR_OrgUnitID, Title, ValidFrom, ValidTo, CreatedDate, ModifiedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [id, jobId, OrgUnitId, title, validFrom, validTo, createdDate, modifiedDate])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const updatePosition = async (id, title, validFrom, validTo, modifiedDate) => {
    try {
        const [result] = await connection.promise().query(`UPDATE hr_position SET Title = ?, ValidFrom = ?, ValidTo = ?, ModifiedDate = ? WHERE PK_PositionID = ?`, [title, validFrom, validTo, modifiedDate, id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const deletePosition = async (id) => {
    try {
        const result = await connection.promise().query(`DELETE FROM hr_position WHERE PK_PositionID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

export default {
    getAllPositions,
    getPositionById,
    createPosition,
    updatePosition,
    deletePosition
}