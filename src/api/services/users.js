class UsersService {
    constructor(connector) {
        this.connector = connector
        this.path = '/users'
    }

    async getUserProfile(id) {
        return await this.connector.get(`${this.path}/profile?username=${id}`)
    }

    async createUser(data) {
        return await this.connector.post(this.path, data)
    }

    async updateUser(id, data) {
        return await this.connector.patch(`${this.path}?id=${id}`, data)
    }
}

module.exports = UsersService
