import { Router } from "express"
import {
    getAllDivision,
    getDivisionById,
    createDivision,
    updateDivision,
    deleteDivision
} from '../controllers/div.controller.js'

const router = Router()

router.route('/select').get(getAllDivision)
router.route('/select/:id').get(getDivisionById)
router.route('/create').post(createDivision)
router.route('/update').post(updateDivision)
router.route('/delete/:id').get(deleteDivision)

export default router