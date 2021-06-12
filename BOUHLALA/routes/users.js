const router = require('express').Router();
 const usersRepo = require('../repositories/users')
 /* GET users listing. */


 router.get('/', async function(req, res, next) {
   res.send(await usersRepo.getUsers(offset,limit))
 });

 router.get('/:id', async function(req, res, next) {
  res.send(await usersRepo.getUsers(req.params.id))
});
 module.exports = router;
 
 router.post('/',async function(req,res,next){
  const { role } = req.user;
  if(role == "admin" || role == "author"){
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

