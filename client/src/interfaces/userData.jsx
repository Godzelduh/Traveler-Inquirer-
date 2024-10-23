
class userData {
    id = '';
    username = '';

    userData(id, username) {
        this.id = id;
        this.username = username;
    }

    getId() {
        return id;
    }
    setId(id) {
        this.id = id;
    }
    getUsername() {
        return username;
    }
    setUsername(username) {
        this.username = username;
    }
}
export default userData;