let UserService = {
    isUserLogin: function () {
        return true;
    },

    getCurrentUser: function () {
        return {name: ""};
    }
};

export default UserService;