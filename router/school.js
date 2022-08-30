const express=require('express')
const Rout=express.Router()
const school=require('../controller/school')

Rout.route('/').get(school.getAll).post(school.add)
Rout.route('/:id').get(school.getOne).delete(school.deleteSchool).patch(school.update)

module.exports=Rout