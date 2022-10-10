import { gql } from "graphql-request";
import { useDispatch, useSelector } from "react-redux";
import { getClient } from "../GrapQL"
import { onListTerrenos } from "../store";


export const useTerrenosStore = () => {
  
    const { terrenos } = useSelector( state => state.terrenos )

    const dispatch = useDispatch();

    const startListTerrenos = async() => {
        const client = await getClient();
        const query = gql`
            {
                getAllTerrenos{
                    id,
                    area,
                    valor_comercial,
                    tipo,
                    construcciones,
                    fuentes_agua,
                    predio
                }
            }
        `;
    
        const { getAllTerrenos } = await client.request(query);
        
        dispatch(onListTerrenos(getAllTerrenos))
  
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

        terrenos,

        //startCreatePredios,
        startListTerrenos,
    };

};


