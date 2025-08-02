import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import model from "../models/subDiv.model.js"

const getAllSubDivisions = asyncHandler( async (req, res) => {
    const result = await model.getAllSubDivisions()
    res
    .status(200)
    .json(
        new apiResponse(200, result, "All sub-division details fetched successfylly")
    )
})

const getSubDivisionById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getSubDivisionById(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Sub-division details fetched successfylly")
    )
})

const createSubDivision = asyncHandler( async (req, res) => {
    const { id, divisionId, name, description } = req.body
    const result = await model.createSubDivision(id, divisionId, name, description)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Sub-division created successfully")
    )
})

const updateSubDivision = asyncHandler( async (req, res) => {
    const { id, name, description } = req.body
    const result = await model.updateSubDivision(id, name, description)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Sub-division updated successfully")
    )
})

const deleteSubDivision = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteSubDivision(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Sub-division deleted successfully")
    )
})

export {
    getAllSubDivisions,
    getSubDivisionById,
    createSubDivision,
    updateSubDivision,
    deleteSubDivision
}