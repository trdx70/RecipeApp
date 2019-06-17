import gql from 'graphql-tag';

export default gql`
   query RecipeDetailQuery($id: ID) {
       recipe(id: $id) {
          id
          name
          about
          ingredients {
             id
             name
             measurement
          }
       }
   }
`;