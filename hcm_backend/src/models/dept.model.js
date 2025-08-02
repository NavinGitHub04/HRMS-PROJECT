import { connection } from "../db/index.js"
import { apiError } from "../utils/apiError.js"

const getAllDepartments = async () => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_dept`)
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const getDepartmentById = async (id) => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_dept WHERE PK_DeptID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const createDepartment = async (id, name, code, deptId, description, isActive) => {
    try {
        const [result] = await connection.promise().query(`INSERT INTO hr_dept (PK_DeptID, Name, Code, FK_HR_DeptID, Description, IsActive) VALUES (?, ?, ?, ?, ?, ?)`, [id, name, code, deptId, description, isActive])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const updateDepartment = async (id, name, code, description, isActive) => {
    try {
        const [result] = await connection.promise().query(`UPDATE hr_dept SET Name = ?, Code = ?, Description = ?, IsActive = ? WHERE PK_DeptID = ?`, [name, code, description, isActive, id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const deleteDepartment = async (id) => {
    try {
        const result = await connection.promise().query(`DELETE FROM hr_dept WHERE PK_DeptID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

export default {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
}