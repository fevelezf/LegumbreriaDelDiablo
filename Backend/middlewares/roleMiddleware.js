const roleMiddleware = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user || !rolesPermitidos.includes(req.user.role)) {
            return res.status(403).json({
                msg: 'Acceso denegado: no tienes permisos suficientes'
            });
        }
        next();
    };
};

module.exports = roleMiddleware;
