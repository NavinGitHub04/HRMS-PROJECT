import { Router } from "express"
import {
    getAllPositions,
    getPositionById,
    createPosition,
    updatePosition,
    deletePosition
} from '../controllers/position.cotroller.js'

const router = Router()

router.route('/select').get(getAllPositions)
router.route('/select/:id').get(getPositionById)
router.route('/create').post(createPosition)
router.route('/update').post(updatePosition)
router.route('/delete/:id').get(deletePosition)

export default router