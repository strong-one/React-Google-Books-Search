//This will hold the query `GET_ME`, which will execute the `me` query set up using Apollo Server

import { gql } from "@apollo/client";

// query me, me is User, User takes all user data within typeDef, savedBooks is the entry point into Book, Book needs to show all data within Book typeDef

export const GET_ME = gql`
  query me {
    _id
    username
    email
    bookCount
    savedbooks {
      bookId
      title
      authors
      description
      image
    }
  }
`;
