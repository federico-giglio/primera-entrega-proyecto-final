const validarAdmin = (req, res, next) => {
  const admin = req.header("admin");
  if (admin == true) next();
  else res.status(401).send({mensaje: "Sin autorizacion"});
};

module.exports = validarAdmin;
