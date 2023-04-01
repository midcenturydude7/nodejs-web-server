const User = require("../model/User");

async function handleLogout(req, res) {
  // on client, also delete the access token
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // successful request, not sending content back;
  const refreshToken = cookies.jwt;

  // is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  // delete refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true }); // secure: true - only serves on https
  res.sendStatus(204);
}

module.exports = { handleLogout };
