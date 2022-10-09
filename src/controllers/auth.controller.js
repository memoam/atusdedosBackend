import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Role from '../models/Role.js';
import { SECRET } from '../config.js';

export const signUp = async (req, res) => {
  try {
    const {
      username,
      name,
      lastName,
      email,
      password,
      birthDay,
      birthMonth,
      birthYear,
      roles,
    } = req.body;

    // Creating a new User Object
    const newUser = new User({
      username,
      name,
      lastName,
      email,
      birthDay,
      birthMonth,
      birthYear,
      password: await User.encryptPassword(password),
    });

    // checking for roles
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: 'user' });
      newUser.roles = [role._id];
    }

    // Saving the User Object in Mongodb
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign({ id: savedUser._id }, SECRET, {
      expiresIn: 86400, // 24 hours
    });
    const user = {
      username: savedUser.username,
      email: savedUser.email,
      id: savedUser._id,
      name: savedUser.name,
      lastName: savedUser.lastName,
      birthDay: savedUser.birthDay,
      birthMonth: savedUser.birthMonth,
      birthYear: savedUser.birthYear,
    };
    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const signIn = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      'roles'
    );

    if (!userFound) return res.status(400).json({ message: 'User Not Found' });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: 'Invalid Password',
      });

    const token = jwt.sign({ id: userFound._id }, SECRET, {
      expiresIn: 86400, // 24 hours
    });
    const user = {
      username: userFound.username,
      email: userFound.email,
      id: userFound._id,
      name: userFound.name,
      lastName: userFound.lastName,
      birthDay: userFound.birthDay,
      birthMonth: userFound.birthMonth,
      birthYear: userFound.birthYear,
    };
    res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
  }
};
