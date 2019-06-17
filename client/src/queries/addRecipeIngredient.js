import gql from 'graphql-tag';

export default gql`
    mutation AddIngredients($id: ID, $name: String, $measurement: String) {
        addRecipeIngredients(id: $id, name: $name, measurement: $measurement) {
            id
            name
            measurement
        }
    }
`;