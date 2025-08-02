import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import model from "../models/company.model.js"

const getAllCompanies = asyncHandler( async (req, res) => {
    const result = await model.getAllCompanies()
    res
    .status(200)
    .json(
        new apiResponse(200, result, "All company details fetched successfully")
    )
})

const getCompanyById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getCompanyById(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Company details fetched successfully")
    )
})

const createCompany = asyncHandler( async (req, res) => {
    const { id, name, address, currency } = req.body
    const result = await model.createCompany(id, name, address, currency)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Company created successfully")
    )
})

const updateCompany = asyncHandler( async (req, res) => {
    const { id, name, address, currency } = req.body
    const result = await model.updateCompany(id, name, address, currency)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Company updated successfully")
    )
})

const deleteCompany = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteCompany(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Company deleted successfully")
    )
})

export {
    getAllCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
}