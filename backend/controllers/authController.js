const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Register a new user
function register(req, res) {
    const { name, email, password, role } = req.body;
    const users = userModel.getUsers();
    
    // Cek jika email sudah digunakan
    if (userModel.findUserByEmail(email)) {
        return res.status(400).json(
            { message: 'Email already exists' });
    }

    // Hash password sebelum menyimpannya
    const hashedPassword = bcrypt.hashSync(password, 8);
    const id = Math.floor(100 + Math.random() * 900);
    const newUser = {
        id: id,
        name,
        email,
        password: hashedPassword,
        role : role
    };

    users.push(newUser);
    userModel.saveUsers(users);

    res.status(201).json({ message: 'User registered successfully' });
}

// Login user
function login(req, res) {
    const { email, password } = req.body;
    const user = userModel.findUserByEmail(email);

    if (!user) {
        return res.status(400).json(
            {
                status : "error",
                message: 'Email Not Found'
            });
    }

    // Validasi password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json(
            {
                status : "error",
                message: 'Invalid Password'
            });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user.id, email: user.email, role : user.role}, '123', { expiresIn: '1h' });

   res.cookie('token', token, { 
    httpOnly: true, 
    secure: false, // Pastikan `secure` aktif jika di production
    maxAge: 3600000, // 1 jam
    sameSite: 'Strict' // Atau 'Lax', tergantung pada kebutuhan
});

    res.json({
        status : "success",
        message: 'Login successful',
        user: { id: user.id, name :user.name, email: user.email, password: user.password, role: user.role },
        token : token
    });
}
function logout(req, res) {
     // Hapus token dari cookie
    res.clearCookie('token',  { 
    httpOnly: true, 
    secure: false, // Pastikan `secure` aktif jika di production
    maxAge: 3600000, // 1 jam
    sameSite: 'Strict' // Atau 'Lax', tergantung pada kebutuhan
});
 
    console.log(req.cookies);
    res.json({ message: 'Logout successful' });
}

module.exports = {
    register,
    login,
    logout
};
