const User = {
    username: {
        type: 'STRING',
        allowNull: false,
        unique: true,
    },
    password: {
        type: 'STRING',
        allowNull: false,
    },
    email: {
        type: 'STRING',
        allowNull: false,
        unique: true,
    },
};

export default User;