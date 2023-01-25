import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default function logoutHandler(req, res) {
  const { tokenAuth } = req.cookies;

  if (!tokenAuth) return res.status(401).json({ error: "no token" });

  try {
    jwt.verify(tokenAuth, "secret");

    const tokenSerialized = serialize("tokenAuth", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    res.setHeader("Set-cookie", tokenSerialized);
    return res.json("logout");
  } catch (error) {
    return res.status(401).json({ error: "invalid token" });
  }
}
