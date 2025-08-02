import { asyncHandler } from "../utils/asyncHandler.js"
import { apiResponse } from "../utils/apiResponse.js"
import model from "../models/position.model.js"

const getAllPositions = asyncHandler( async (req, res) => {
    const result = await model.getAllPositions()
    res
    .status(200)
    .json(
        new apiResponse(200, result, "All position details fetched successfully")
    )
})

const getPositionById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getPositionById(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Position details fetched successfully")
    )
})

const createPosition = asyncHandler( async (req, res) => {
    const { id, jobId, orgUnitId, title, validFrom, validTo, createdDate, modifiedDate } = req.body
    const result = await model.createPosition(id, jobId, orgUnitId, title, validFrom, validTo, createdDate, modifiedDate)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Position created successfully")
    )
})

const updatePosition = asyncHandler( async (req, res) => {
    const { id, title, validFrom, validTo, modifiedDate } = req.body
    const result = await model.updatePosition(id, title, validFrom, validTo, modifiedDate)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Position updated successfully")
    )
})

const deletePosition = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deletePosition(id)
    res
    .status(200)
    .json(
        new apiResponse(200, result, "Position deleted successfully")
    )
})

export {
    getAllPositions,
    getPositionById,
    createPosition,
    updatePosition,
    deletePosition
}