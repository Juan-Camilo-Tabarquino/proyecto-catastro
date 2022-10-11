import { gql } from "graphql-request";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getClient } from "../GrapQL"
import { onListTerrenos } from "../store";


export const useTerrenosStore = () => {
  
    const { terrenos } = useSelector( state => state.terrenos )
    const router = useRouter();
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
    
    const startCreateTerrenos = async({area,valor_comercial,tipo,construcciones, fuentes_agua, predio}) => {
        const client = await getClient();
        
        const mutation = gql`
        
        mutation create(
    
                $area: Int!,
                $valor_comercial: Int!,
                $tipo: String!,
                $construcciones: String!,
                $fuentes_agua: String!,
                $predio: Int!,
            
            ) {
                createTerreno(
                    area: $area,
                    valor_comercial:$valor_comercial,
                    tipo: $tipo,
                    construcciones: $construcciones,
                    fuentes_agua: $fuentes_agua,
                    predio: $predio,
            ) {
                id,
                predio
            }
            }
    
        `;
    
        const variables = {
            area: parseInt(area),
            valor_comercial: parseInt(valor_comercial),
            tipo: tipo,
            construcciones: construcciones,
            fuentes_agua: fuentes_agua,
            predio: parseInt(predio),
        }
        try {
            await client.request(mutation, variables);      
            Swal.fire('Creacion de terreno','El nuevo terreno se ha creado exitosamente.','success');
            router.push('/terrenos');   
        } catch (error) {
            return Swal.fire('Error','Error en la creacion del terrenos, asegurese de que el predio no tiene otro terreno asociado.','error');
        }
    };

    return {

        terrenos,

        startCreateTerrenos,
        startListTerrenos,
    };

};


