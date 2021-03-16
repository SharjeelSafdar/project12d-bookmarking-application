const { ApolloServer, gql } = require("apollo-server-lambda");
const faunaDB = require("faunadb");
const q = faunaDB.query;

const faunaClient = new faunaDB.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
});

const typeDefs = gql`
  type Bookmark {
    id: ID!
    title: String!
    url: String!
  }
  type Query {
    bookmarks: [Bookmark]!
  }
  type Mutation {
    createBookmark(title: String!, url: String!): Bookmark!
    editBookmark(id: ID!, title: String!, url: String!): Bookmark!
    deleteBookmark(id: ID!): ID!
    batchDeleteBookmarks(ids: [ID]!): [ID]!
  }
`;

const resolvers = {
  Query: {
    bookmarks: async () => {
      const res = await faunaClient.query(
        q.Paginate(q.Match(q.Index("all_bookmarks")))
      );
      return res.data.map(([ref, title, url]) => ({
        id: ref.id,
        title,
        url,
      }));
    },
  },
  Mutation: {
    createBookmark: async (_, { title, url }) => {
      const res = await faunaClient.query(
        q.Create(q.Collection("bookmarks"), {
          data: {
            title,
            url,
          },
        })
      );
      return {
        ...res.data,
        id: res.ref.id,
      };
    },
    editBookmark: async (_, { id, title, url }) => {
      const res = await faunaClient.query(
        q.Update(q.Ref(q.Collection("bookmarks"), id), {
          data: {
            title,
            url,
          },
        })
      );
      return {
        ...res.data,
        id: res.ref.id,
      };
    },
    deleteBookmark: async (_, { id }) => {
      const res = await faunaClient.query(
        q.Delete(q.Ref(q.Collection("bookmarks"), id))
      );
      return res.ref.id;
    },
    batchDeleteBookmarks: async (_, { ids }) => {
      const res = await faunaClient.query(
        q.Map(
          ids,
          q.Lambda(
            "id",
            q.Delete(q.Ref(q.Collection("bookmarks"), q.Var("id")))
          )
        )
      );
      return res.map(resItem => resItem.ref.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // playground: true,
  // introspection: true,
});

exports.handler = server.createHandler();
