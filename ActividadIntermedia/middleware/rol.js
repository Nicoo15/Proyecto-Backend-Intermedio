const { handleHttpError } = require('../utils/handleError');

const checkRol = (roles) => (req, res, next) => {
    try {
        const { user } = req;
        const userRol = user.role;
        const checkValueRol = roles.includes(userRol);
        if (!checkValueRol) {
            return handleHttpError(res, 'NOT_ALLOWED', 403);
        }
        next();
    } catch (err) {
        handleHttpError(res, 'ERROR_PERMISSIONS', 403);
    }
};

module.exports = checkRol;
