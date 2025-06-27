const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signupOrLogin = async (req, res) => {
    const { email, password } = req.body;
    let admin = await Admin.findOne({ email });

    if (!admin) {
        const hashed = await bcrypt.hash(password, 10);
        admin = new Admin({ email, password: hashed });
        await admin.save();
        return res.json({ message: 'Admin registered', token: jwt.sign({ id: admin._id }, process.env.JWT_SECRET) });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    res.json({ message: 'Login successful', token });
};