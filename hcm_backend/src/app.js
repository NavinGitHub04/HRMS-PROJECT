import express from 'express'

const app = express()

app.use(express.json({ limit: '16kb'}))
app.use(express.urlencoded({ extended: true, limit: '16kb'}))

import companyRouter from './routes/company.route.js'
import deptRouter from './routes/dept.route.js'
import divisionRouter from './routes/div.route.js'
import empCatRouter from './routes/empCat.route.js'
import empSubCatRouter from './routes/empSubCat.route.js'
import jobRouter from './routes/job.route.js'
import orgUnitRouter from './routes/orgUnit.route.js'
import positionRouter from './routes/position.route.js'
import subDivRouter from './routes/subDiv.route.js'

app.use('/api/v1/company', companyRouter)
app.use('/api/v1/dept', deptRouter)
app.use('/api/v1/division', divisionRouter)
app.use('/api/v1/empCat', empCatRouter)
app.use('/api/v1/empSubCat', empSubCatRouter)
app.use('/api/v1/job', jobRouter)
app.use('/api/v1/orgUnit', orgUnitRouter)
app.use('/api/v1/position', positionRouter)
app.use('/api/v1/subDiv', subDivRouter)

export { app }