class GeoService {
    constructor(connector) {
        this.connector = connector
        this.path = 'http://api.openweathermap.org/geo/1.0'
    }

    async getLocationByLatLong({ lat, long, limit = 10 }) {
        return await this.connector.get(
            `${this.path}/reverse?lat=${lat}&lon=${long}&limit=${limit}&appid=${process.env.OPENWEATHER_KEY}`
        )
    }
}

module.exports = GeoService
