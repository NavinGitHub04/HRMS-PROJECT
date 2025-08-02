import { connection } from "../db/index.js"
import { apiError } from "../utils/apiError.js"

const getAllOrgUnits = async () => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_orgunit`)
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const getOrgUnitById = async (id) => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_orgunit WHERE PK_OrgUnitID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const createOrgUnit = async (id, parentUnitId, name, description, validFrom, validTo, createdDate, modifiedDate) => {
    try {
        const [result] = await connection.promise().query(`INSERT INTO hr_orgunit (PK_OrgUnitID, ParentUnitID, Name, Description, ValidFrom, ValidTo, CreatedDate, ModifiedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [id, parentUnitId, name, description, validFrom, validTo, createdDate, modifiedDate])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const updateOrgUnit = async (id, name, description, validFrom, validTo, modifiedDate) => {
    try {
        const [result] = await connection.promise().query(`UPDATE hr_orgunit SET Name = ?, Description = ?, ValidFrom = ?, ValidTo = ?, ModifiedDate = ? WHERE PK_OrgUnitID = ?`, [name, description, validFrom, validTo, modifiedDate, id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const deleteOrgUnit = async (id) => {
    try {
        const result = await connection.promise().query(`DELETE FROM hr_orgunit WHERE PK_OrgUnitID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

export default {
    getAllOrgUnits,
    getOrgUnitById,
    createOrgUnit,
    updateOrgUnit,
    deleteOrgUnit
}