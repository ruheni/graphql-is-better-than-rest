import { ApolloServer, gql } from 'apollo-server'
import StarWarsAPI from './DataSources/StarWars';

const typeDefs = gql`
    type Query {
        info: String!
        characters: [Character!],
        characterProfile(id: ID!): Character!
        searchCharacter(queryParam: String!): [Character]!
    }

    type Character {
        name: String!
        height: String!
        mass: String!
        hair_color: String!
        eye_color: String!
        birth_year: String!
        gender: String!
    }
`

const resolvers = {
    Query: {
        info: () => "Patience, you must have padewan",
        characters: async (_root, _args, { dataSources }) => {
            return dataSources.starwars.getCharacters()
        },
        characterProfile: async (_root, { id }, { dataSources }) => {
            return dataSources.starwars.getCharacterProfile(id)
        },
        searchCharacter: async (_root, { queryParam }, { dataSources }) => {
            return dataSources.starwars.searchCharacter(queryParam)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            starwars: new StarWarsAPI
        }
    }
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
