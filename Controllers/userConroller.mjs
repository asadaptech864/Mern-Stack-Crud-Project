import Users from '../modals/userModal.mjs'
import bcrypt from 'bcrypt'       
// Add a new Sign Up
        let addUser=async(req,res)=>{
            try {
                let user = await Users.find({email: req.body.email});
                if (user.length == 1) {
                    res.status(404).json({message:"User already exists"});
                } else {
                    bcrypt.hash(req.body.password, 15).then(async function(hash){
                        let newUser = new Users({
                            name:req.body.name,
                            email:req.body.email,
                            password:hash,
                            });
                       let adduser = await Users.insertOne(newUser);
                       if (!adduser) {
                              res.status(404).json({message:"Failed to add User"});
                       } else {
                       
                           res.status(200).json({
                           message:"User added successfully",
                           user:adduser,
                       })
                       } 
                    })
                }
          
            
            } catch (error) {
               console.log(error) ;
               res.status(500).json({message:"Internal server errror"});
            }
            }
            
// Login User
let LoginUser=async(req,res)=>{
    try {
        let checkUser = await Users.findOne({email:req.body.email});
if (checkUser.length == 0) {
    res.status(404).json({message:"User not found. Please register now...."});
} else {
    const match = bcrypt.compareSync(req.body.password, checkUser.password);
    if(match) {
        res.status(200).json({
            message:"User Login successfully",
            user:checkUser,
        })
    } else {
        res.status(404).json({message:"Invalid Credentials"});
    }
}
    
    } catch (error) {
       console.log(error) ;
       res.status(500).json({message:"Internal server errror"});
    }
    }
  
    const UserController = {addUser, LoginUser};
    export default UserController;