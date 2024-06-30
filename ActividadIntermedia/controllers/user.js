const { handleHttpError } = require('../utils/handleError');
const { userModel } = require('../models');

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        res.send(users);
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_USERS', 500);
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
    } catch (err) {
        handleHttpError(res, 'ERROR_GET_USER', 500);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const user = await userModel.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send(user);
    } catch (err) {
        handleHttpError(res, 'ERROR_UPDATE_USER', 500);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.send({ message: 'User deleted successfully' });
    } catch (err) {
        handleHttpError(res, 'ERROR_DELETE_USER', 500);
    }
};

module.exports = { getUsers, getUser, updateUser, deleteUser };
