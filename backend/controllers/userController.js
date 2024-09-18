const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
// Get all users
function getAllUsers(req, res) {
    const users = userModel.getUsers();
    res.json(users);
}

// Get user by ID
function getUserById(req, res) {
    const users = userModel.getUsers();
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
}

// Create a new user
function createUser(req, res) {
    const { nama, email, password, role } = req.body;
    const users = userModel.getUsers();
   const hashedPassword = bcrypt.hashSync(password, 8);

    const newUser = {
        id: users.length + 1,
        nama : nama,
        email : email,
        password: hashedPassword,
        role : role
    };

    users.push(newUser);
    userModel.saveUsers(users);
    res.status(201).json(newUser);
}

// Update user by ID
function updateUser(req, res) {
    const users = userModel.getUsers();
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });
    
  
    if (req.body.password !== '') {
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
         users[userIndex] = { 
        ...users[userIndex],
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };
    } else {
          users[userIndex] = { 
        ...users[userIndex],
        name: req.body.name,
        email: req.body.email,
       
    };
    }
    userModel.saveUsers(users);
    console.log(users[userIndex]);
    res.json({   
      user : users[userIndex],
        message : "Updated Successfully"
    }
    );
}

// Delete user by ID
function deleteUser(req, res) {
    const users = userModel.getUsers();
    const updatedUsers = users.filter(u => u.id !== parseInt(req.params.id));
    if (users.length === updatedUsers.length) return res.status(404).json({ message: 'User not found' });

    userModel.saveUsers(updatedUsers);
    res.json({ message: 'User deleted' });
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
