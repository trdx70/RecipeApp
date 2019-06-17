import gql from 'graphql-tag'

export default gql`
   mutation AddRecipe($name: String, $about: String, $description: String, $origin: String) {
       addRecipe(name: $name, about: $about, description:$description, origin: $origin) {
           id
           name
           about

       }
   }
`;
