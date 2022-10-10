import { gql } from "graphql-request";
import { useDispatch, useSelector } from "react-redux";
import { getClient } from "../GrapQL"
import { onListConstrucciones } from "../store";


export const useConstruccionesStore = () => {
  
    const { construcciones } = useSelector( state => state.construcciones )

    const dispatch = useDispatch();

    const startListConstrucciones = async() => {
        const client = await getClient();
        const query = gql`
            {
                getAllConstrucciones{
                    id,
                    num_pisos,
                    area,
                    tipo,
                    direccion,
                    predio
                }
            }
        `;
    
        const { getAllConstrucciones } = await client.request(query);
        
        dispatch(onListConstrucciones(getAllConstrucciones))
  
    };
    
    // const startCreatePredios = async() => {
    //     const client = await getClient();
        
    //     const mutation = gql`
        
    //     mutation create(
    
    //             $numero_predial: Int!,
    //             $avaluo: Int!,
    //             $nombre: String!,
    //             $departamento: String!,
    //             $municipio: String!
            
    //         ) {
    //             createPredio(
    //                 numero_predial: $numero_predial,
    //                 avaluo: $avaluo,
    //                 nombre: $nombre,
    //                 departamento: $departamento,
    //                 municipio: $municipio
    //         ) {
    //             numero_predial,
    //             avaluo,
    //             nombre,
    //             departamento,
    //             municipio
    //         }
    //         }
    
    //     `;
    
    //     const variables = {
    //         numero_predial : 1234456789, 
    //         avaluo: 123452313, 
    //         nombre:"Prueba con front", 
    //         departamento: "valle del cauca", 
    //         municipio: "Palmira",
    //     }
    
    //     const data = await client.request(mutation, variables);      
    // };

    return {

        construcciones,

        //startCreatePredios,
        startListConstrucciones,
    };

};