import { connection } from "../db/index.js"
import { apiError } from "../utils/apiError.js"

const getAllCompanies = async () => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_company`)
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const getCompanyById = async (id) => {
    try {
        const [result] = await connection.promise().query(`SELECT * FROM hr_company WHERE PK_CompanyID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const createCompany = async (id, name, address, currency) => {
    try {
        const [result] = await connection.promise().query(`INSERT INTO hr_company (PK_CompanyID, Name, Address, Currency) VALUES (?, ?, ?, ?)`, [id, name, address, currency])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const updateCompany = async (id, name, address, currency) => {
    try {
        const [result] = await connection.promise().query(`UPDATE hr_company SET Name = ?, Address = ?, Currency = ? WHERE PK_CompanyID = ?`, [name, address, currency, id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

const deleteCompany = async (id) => {
    try {
        const result = await connection.promise().query(`DELETE FROM hr_company WHERE PK_CompanyID = ?`, [id])
        return result
    } catch (error) {
        throw new apiError(400, error)
    }
}

export default {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
}