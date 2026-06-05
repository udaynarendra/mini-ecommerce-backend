const adminMiddleware = (req,res,next)=>{
    try{
    const role = req.user.role;
    if(role!=='admin'){
         return res.status(403).json({
            message:'Access Denied'
        })
    }
    next();}
    catch(error){
        return res.status(500).json({
            message:'server error'
        })
    }
}
export default adminMiddleware;