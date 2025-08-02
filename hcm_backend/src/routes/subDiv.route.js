import { Router } from "express"
import {
    getAllSubDivisions,
    getSubDivisionById,
    createSubDivision,
    updateSubDivision,
    deleteSubDivision
} from '../controllers/subDiv.controller.js'

const router = Router()

router.route('/select').get(getAllSubDivisions)
router.route('/select/:id').get(getSubDivisionById)
router.route('/create').post(createSubDivision)
router.route('/update').post(updateSubDivision)
router.route('/delete/:id').get(deleteSubDivision)

export default router