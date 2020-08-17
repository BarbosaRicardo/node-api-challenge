const express = require('express');

const Project = require('./../helpers/projectModel.js')
const Actions = require('./../helpers/actionModel.js')

const router = express.Router()

//routes

router.get('/', async (req,res,next) => {
   const actions = await Actions.get();
   actions
      ? res.status(200).json(actions)
      : next({status: 500, message: 'action unable to be retreived'});
}); // GET '/'

router.get('/:id', validateActionId, async(req,res,next) => {
   res.status(200).json(req.action)
}); // GET by ID

router.post('/', validateAction, async(req,res,next) => {
   try {
      const result = await Actions.insert(req.action);
      res.status(201).json(result);
   }
   catch(error){
      next(error);
   }
}); // POST '/'

router.put(':/id', validateActionId, validateAction, async(req,res,next) => {
   const {id} = req.params;
   try {
      const updatedProject = await Actions.update(id, req.action);
      res.status(200).jason(updatedProject);
   }
   catch(error){
      next(error)
   }
}); // PUT ':/id'

router.delete('/:id', validateActionId, async(req,res,next) => {
   const {id} = req.params;

   try{
      const count = await Actions.remove(id);

      if(count <=0){
         next({status:500, message:"error while deleting"})
      } else{
         res.status(200).json({message: "deleted successfully"})
      }
   }
   catch(error){
   next(error);
   }
}); // DELETE by ID

//middleware 
async function validateActionId(req,res,next) => {
   const{id}= req.params
   try {
      const action = await Actions.get(id);
      if(action) {
         req.action = action;
         next()
      } else{
         next({status: 404, message: 'Action does not exist'})
      }
   }
   catch(error){
      next(error)
   }
}; // validateActionId mw

async function validateAction(req,res,next) {
   const {body} = req;

   
}
