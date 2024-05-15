import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import loginModel from "../model/login.model.js";

const { sign } = jwt;


export async function register(req, res) {
    try {
        let { username, email, password, name, phone } = req.body;
        if (username.length < 4) return res.status(400).json({ msg: "username is too small" });
        if (name.length < 4) return res.status(400).json({ msg: "name is too small" });
        if (!/[a-z0-9\.]+@[a-z0-9]+\.[a-z]{2,6}/.test(email)) return res.status(400).json({ msg: "invalid email" });
        if (password.length < 4) return res.status(400).json({ msg: "password not big enough!" });
        if (phone.length < 4) return res.status(400).json({ msg: "phone.no is too small" });


        let user = await loginModel.findOne({ $or: [{ username }, { email }, {phone}] });
        if (user && user.username == username) return res.status(400).json({ msg: "username already exist" });
        if (user && user.email == email) return res.status(400).json({ msg: "email already exist" });
        if (user && user.phone == phone) return res.status(400).json({ msg: "phone.no already exist" });
        let hashedPassword = await bcrypt.hash(password, 10);
        await loginModel.create({
            username,
            name,
            phone,
            email,
            password: hashedPassword
        });
        return res.status(201).json({ msg: "registration completed" });
    } catch (error) {
        return res.status(500).json({ msg: "some error occured" });
    }
}

export async function login(req, res) {
    try {
        let { email, password } = req.body;
        let user = await loginModel.findOne({ email });
        if (!user) return res.status(401).json({ msg: "Invalid username or password" });
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            let token = await sign({
                email: user.email,
                // userId: user._id
            }, process.env.SECRET_KEY, {
                expiresIn: "24h"
            });
            return res.status(200).json({ msg: "Login successful", token })
        }
        return res.status(201).json({ msg: "invalid username or password" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "some error occured" });
    }
}