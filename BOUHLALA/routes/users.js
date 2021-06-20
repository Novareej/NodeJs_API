const router = require('express').Router();
 const usersRepo = require('../repositories/users')
 /* GET users listing. */


 router.get('/', async function(req, res, next) {
   res.send(await usersRepo.getUsers(offset,limit))
 });

 router.get('/:id', async function(req, res, next) {
  res.send(await usersRepo.getUsers(req.params.id))
});
 
 router.post('/',async function(req,res,next){
 
  if(req.user.role == "admin" || req.user.role == "author"){
    const user = req.body
    const retrievedUser = await usersRepo.getUserByEmail(user.email) 
    if(!retrievedUser){
      res.send(await usersRepo.addUser(user))
    }else{
      res.status(400).json({ message: 'Email already exists!' })
    }
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
})

router.put('/',async function(req,res,next){
  
  if(req.user == "admin" || req.user == "author"){
    const user = req.body
  res.send(await usersRepo.updateUser(user))
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
})

router.delete('/:id',async function(req,res,next){
  
  if(req.user == "admin" || req.user == "author"){
    const id = req.params.id
    await usersRepo.deleteUser(id)
    res.send({id})
  }else{
    res.status(403).json({ message: 'unauthorised access!' })
  }
  
})
module.exports = router;
 
