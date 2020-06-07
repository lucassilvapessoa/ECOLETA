import express, { Router } from 'express'
import multer from 'multer'



import PointsController from './controllers/PointsController'
import ItemsControllerI from './controllers/itemsController'

const  routes =  express.Router()
const pointsController = new  PointsController()
const itemsController = new ItemsControllerI()

routes.get('/items',itemsController.index)
routes.post('/points',pointsController.create)
routes.get('/points/:id',pointsController.show)
routes.get('/points',pointsController.index)


export default routes 

//Server Pattern
//Repository Pattern (Data Mapper)
