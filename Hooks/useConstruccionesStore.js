import { gql } from "graphql-request";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getClient } from "../GrapQL"
import { onListConstrucciones } from "../store";


export const useConstruccionesStore = () => {
  
    const { construcciones } = useSelector( state => state.construcciones )
    const router = useRouter();
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
    
    const startCreateConstruccion = async({num_pisos,area, direccion, tipo,predio}) => {
        const client = await getClient();
        
        const mutation = gql`
        
        mutation create(
    
                $num_pisos: Int!,
                $area: Int!,
                $direccion: String!,
                $tipo: String!,
                $predio: Int!
            
            ) {
                createConstruccion(
                    num_pisos: $num_pisos,
                    area: $area,
                    direccion: $direccion,
                    tipo: $tipo,
                    predio: $predio
            ) {
                id, 
                predio
            }
            }
    
        `;
    
        const variables = {
            num_pisos : parseInt(num_pisos), 
            area: parseInt(area), 
            direccion:direccion, 
            tipo: tipo, 
            predio: parseInt(predio),
        }

        try {
            await client.request(mutation, variables);      
            Swal.fire('Creacion de la construccion','La nueva construccion se ha creado exitosamente.','success');
            router.push('/terrenos');   
        } catch (error) {
            console.log(error)
        }  
    };

    return {

        construcciones,

        startCreateConstruccion,
        startListConstrucciones,
    };

};