import { gql } from "graphql-request";
import { useDispatch, useSelector } from "react-redux";
import { getClient } from "../GrapQL"
import { onListPredios } from "../store";

export const usePrediosStore = () => {
  
    const { predios } = useSelector( state => state.predios )

    const dispatch = useDispatch();

    const startListPredios = async() => {
        const client = await getClient();
        const query = gql`
                {
                getAllPredios{
                    numero_predial,
                    avaluo,
                    nombre,
                    departamento,
                    municipio
                }
            }
        `;
    
        const { getAllPredios } = await client.request(query);

        const predios = getAllPredios.map(predio => {
            return {
                id: predio.numero_predial,
                ...predio
            }
        })
        
        dispatch(onListPredios(predios))
  
    };
    
    const startCreatePredios = async() => {
        const client = await getClient();
        
        const mutation = gql`
        
        mutation create(
    
                $numero_predial: Int!,
                $avaluo: Int!,
                $nombre: String!,
                $departamento: String!,
                $municipio: String!
            
            ) {
                createPredio(
                    numero_predial: $numero_predial,
                    avaluo: $avaluo,
                    nombre: $nombre,
                    departamento: $departamento,
                    municipio: $municipio
            ) {
                numero_predial,
                avaluo,
                nombre,
                departamento,
                municipio
            }
            }
    
        `;
    
        const variables = {
            numero_predial : 1234456789, 
            avaluo: 123452313, 
            nombre:"Prueba con front", 
            departamento: "valle del cauca", 
            municipio: "Palmira",
        }
    
        const data = await client.request(mutation, variables);      
    };

    return {

        predios,

        startCreatePredios,
        startListPredios,
    };

};


