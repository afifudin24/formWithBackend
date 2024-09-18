const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/users.json');

function getUsers() {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

function saveUsers(users) {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

function findUserByEmail(email) {
    const users = getUsers();
    return users.find(user => user.email === email);
}


module.exports = {
    getUsers,
    saveUsers,
    findUserByEmail
};
