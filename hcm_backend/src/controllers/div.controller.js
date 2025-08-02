import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import model from "../models/div.model.js"

const getAllDivision = asyncHandler( async (req, res) => {
    const result = await model.getAllDivision()
    res
    .status(200)
    .json(
        new apiResponse(200, result, "All division details fetched successfully")
    )
})

const getDivisionById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getDivisionById(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Division details fetched successfully")
    )
})

const createDivision = asyncHandler( async (req, res) => {
    const { id, companyId, name, description } = req.body
    const result = await model.createDivision(id, companyId, name, description)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Division created successfully")
    )
})

const updateDivision = asyncHandler( async (req, res) => {
    const { id, name, description } = req.body
    const result = await model.updateDivision(id, name, description)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Division updated successfully")
    )
})

const deleteDivision = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteDivision(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Division deleted successfully")
    )
})

export {
    getAllDivision,
    getDivisionById,
    createDivision,
    updateDivision,
    deleteDivision
}