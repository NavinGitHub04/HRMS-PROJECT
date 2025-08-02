import { Router } from "express"
import {
    getAllOrgUnits,
    getOrgUnitById,
    createOrgUnit,
    updateOrgUnit,
    deleteOrgUnit
} from '../controllers/orgUnit.controller.js'

const router = Router()

router.route('/select').get(getAllOrgUnits)
router.route('/select/:id').get(getOrgUnitById)
router.route('/create').post(createOrgUnit)
router.route('/update').post(updateOrgUnit)
router.route('/delete/:id').get(deleteOrgUnit)

export default router