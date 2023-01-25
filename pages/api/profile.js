import jwt from "jsonwebtoken";

export default function profileHandler(req, res) {
    const { tokenAuth } = req.cookies
    
    if(!tokenAuth) return res.status(401).json({error: 'no token'})

    try {
      const user = jwt.verify( tokenAuth, 'secret' )
      const {email, username} = user;
      return res.json({email, username});

    } catch (error) {
      return res.status(401).json({error: 'invalid token'})     
    }
  
  }