import { gql } from "graphql-request";
import { useDispatch, useSelector } from "react-redux";
import { getClient } from "../GrapQL"
import { onListPropietariosJ, onListPropietariosN } from "../store";


export const usePropietariosStore = () => {
  
    const { propietariosN, propietariosJ } = useSelector( state => state.propietarios )

    const dispatch = useDispatch();

    const startListProietariosJ = async() => {
        const client = await getClient();
        const query = gql`
            {
                getAllPropietarios{
                    id,
                    email,
                    direccion,
                    telefono,
                    nit,
                    razon_social,
                    predio
                }
            }
        `;
    
        const { getAllPropietarios } = await client.request(query);
        
        dispatch(onListPropietariosJ(getAllPropietarios))
  
    };

    const startListProietariosN = async() => {
        const client = await getClient();
        const query = gql`
            {
                getAllPropietarios{
                    id,
                    email,
                    direccion,
                    telefono,
                    tipo_documento,
                    numero_documento,
                    nombre,
                    apellidos,
                    predio
                }
            }
        `;
    
        const { getAllPropietarios } = await client.request(query);

        dispatch(onListPropietariosN(getAllPropietarios))
  
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

        propietariosJ,
        propietariosN,
        startListProietariosJ,
        startListProietariosN,
    };

};