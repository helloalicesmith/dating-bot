class UsersService {
    constructor(connector) {
        this.connector = connector
    }

    async getUserProfile(id) {
        return await this.connector.get(`/user/${id}`)
    }

    async getUserPhoto(id, data) {
        return await this.connector.patch(`/upload-files/${id}`, data)
    }

    async createUser(data) {
        return await this.connector.post('/users', data)
    }

    async updateUser(id, data) {
        return await this.connector.patch(`/users/${id}`, data)
    }
}

module.exports = UsersService
