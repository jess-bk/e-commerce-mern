const verifyAdminRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.isAdmin) return res.sendStatus(401);
    const adminRolesArray = [...allowedRoles];
    console.log("adminRolesArray :", adminRolesArray);
    console.log("req.isAdmin :", req.isAdmin);

    const result = req.isAdmin
      .map((role) => adminRolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    console.log("verifyAdmin", result);
    next();
  };
};

module.exports = verifyAdminRoles;
