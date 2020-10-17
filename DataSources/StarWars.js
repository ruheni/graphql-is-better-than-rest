import { RESTDataSource } from 'apollo-datasource-rest'

class StarWarsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://swapi.dev/api/people'
    }

    // get characters
    async getCharacters() {
        const { results } = await this.get('/')
        return results
    }

    // get one character
    async getCharacterProfile(id) {
        return await this.get(`/${id}/`)
    }

    // search character
    async searchCharacter(queryParam) {
        const { results } = await this.get(`/?search=${queryParam}`)
        return results
    }
}

export default StarWarsAPI
