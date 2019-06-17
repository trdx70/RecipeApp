import gql from 'graphql-tag';

export default gql`
   {
       recipes {
           id
           name
           about
           origin
       }
   }
`;