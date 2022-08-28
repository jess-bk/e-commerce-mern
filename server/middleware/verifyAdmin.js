const verifyAdminRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const adminRolesArray = [...allowedRoles];
    console.log("rolesArray :", adminRolesArray);
    console.log("req.isAdmin :", req.isAdmin);

    const result = req.isAdmin
      .map((role) => adminRolesArray.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyAdminRoles;
