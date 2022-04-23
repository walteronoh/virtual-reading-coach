import { gql } from "@apollo/client";

const Book_Contents = gql`
query GetBookContent {
    book {
        pages {
            content
            tokens {
              value
              position
            }
        }
    }
}
`;

export { Book_Contents };