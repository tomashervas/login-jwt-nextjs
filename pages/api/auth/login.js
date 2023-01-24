import { serialize } from "cookie";
import jwt from "jsonwebtoken";

export default function handleLogin(req, res) {
  const { email, password } = req.body;

  //check email & pass in bbdd

  if (email == "admin@local.local" && password == "admin") {
    const token = jwt.sign({
        email,
        username: 'admin',
        exp: Math.floor(Date.now()/1000) + 60 * 60 * 24 * 30
    },'secret')

    const tokenSerialized = serialize('tokenAuth', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV == 'production',
          sameSite: 'strict',
          maxAge: 1000*60*60*24*30,
          path: '/'
      })
  
    res.setHeader('Set-cookie', tokenSerialized)
    return res.json('login ok');

  }

  return res.json('login failed');

}
