import Users from '../modals/userModal.mjs'
        
// Add a new Sign Up
        let addUser=async(req,res)=>{
            try {
            let newUser = new Users({
                 name:req.body.name,
                 email:req.body.email,
                 password:req.body.password,
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
            } catch (error) {
               console.log(error) ;
               res.status(500).json({message:"Internal server errror"});
            }
            }
            
// Login User
let LoginUser=async(req,res)=>{
    try {
    
    } catch (error) {
       console.log(error) ;
       res.status(500).json({message:"Internal server errror"});
    }
    }
  
    const UserController = {addUser, LoginUser};
    export default UserController;