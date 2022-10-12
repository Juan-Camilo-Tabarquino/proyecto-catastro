import { gql } from "graphql-request";
import { Router, useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getClient } from "../GrapQL";
import { onListPredios } from "../store";

export const usePrediosStore = () => {
  
    const { predios } = useSelector( state => state.predios );
    const dispatch = useDispatch();
    const router = useRouter();
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
    
    const startCreatePredios = async({numero_predial,avaluo,nombre,departamento,municipio}) => {
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
            numero_predial : parseInt(numero_predial), 
            avaluo: parseInt(avaluo), 
            nombre:nombre, 
            departamento: departamento, 
            municipio: municipio,
        }

        try {
            await client.request(mutation, variables);
            Swal.fire('Creacion de predio','El nuevo predio se ha creado exitosamente.','success');
            router.push('/');    
        } catch (error) {
            return console.log(error)
        }
    };

    const startUpdatePredio = async({id,avaluo,nombre}) => {
        const client = await getClient();
        
        const mutation = gql`
        
        mutation create(
    
                $id: Int!,
                $avaluo: Int!,
                $nombre: String!,
            ) {
                updatePredio(
                    numero_predial: $id,
                    avaluo: $avaluo,
                    nombre: $nombre,
            ) {
               success,
               message
            }
            }
    
        `;
    
        const variables = {
            id : parseInt(id), 
            avaluo: parseInt(avaluo), 
            nombre:nombre, 
        }

        try {
            await client.request(mutation, variables);
            Swal.fire('Actualizacion de predio','El predio se ha actualizado exitosamente.','success');
            router.push('/');    
        } catch (error) {
            return console.log(error)
        }
    };

    const startDeletePredio = async({id}) => {
        const client = await getClient();

        const mutation = gql`
        
        mutation create(
                $id: Int!,     
            ) {
                deletePredio(
                    numero_predial: $id,
                )
            }
    
        `;
    
        const variables = {
            id: parseInt(id),
        }

        try {
            await client.request(mutation, variables);
        } catch (error) {
            return console.log(error)
        }        
    }

    return {

        predios,

        startCreatePredios,
        startListPredios,
        startUpdatePredio,
        startDeletePredio
    };

};


