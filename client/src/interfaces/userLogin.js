class UserLogin {
    username = '';
    password = '';

    UserLogin(username, password) {
        this.username = username;
        this.password = password;
    }

    getUsername() {
        return username;
    }

    setUsername(username) {
        this.username = username;
    }

    getPassword() {
        return password;
    }

    setPassword(password) {
        this.password = password;
    }
}
export default UserLogin;