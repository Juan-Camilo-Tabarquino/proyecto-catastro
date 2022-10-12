import { gql } from "graphql-request";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getClient } from "../GrapQL"
import { onListPropietariosJ, onListPropietariosN } from "../store";


export const usePropietariosStore = () => {
  
    const { propietariosN, propietariosJ } = useSelector( state => state.propietarios )
    const router = useRouter();
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

        const filtrados = getAllPropietarios.filter(propietario => propietario.nit !== null);
        
        dispatch(onListPropietariosJ(filtrados))
  
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

        const filtrados = getAllPropietarios.filter(propietario => propietario.nombre !== null);

        dispatch(onListPropietariosN(filtrados))
  
    };
    
    const startCreatePropietarioNatural = async({direccion,telefono,email,tipo_documento,numero_documento,nombre,apellidos,predio}) => {
        const client = await getClient();

        const mutation = gql`
        
        mutation create(
    
                $telefono: Int!,
                $email: String!,
                $direccion: String!,
                $tipo_documento: String!,
                $numero_documento: Int!,
                $nombre: String!,
                $apellidos: String!,
                $predio: Int!
            
            ) {
                createPropietario(
                    telefono: $telefono,
                    email: $email,
                    direccion: $direccion
                    tipo_documento: $tipo_documento,
                    numero_documento: $numero_documento,
                    nombre: $nombre,
                    apellidos: $apellidos,
                    predio: $predio
            ) {
               id,
               predio
            }
            }
    
        `;
    
        const variables = {
            direccion: direccion,
            telefono: parseInt(telefono),
            email: email,
            tipo_documento: tipo_documento,
            numero_documento: parseInt(numero_documento),
            nombre: nombre,
            apellidos:apellidos,
            predio: parseInt(predio),
        }

        try {
            await client.request(mutation, variables);
            Swal.fire('Creacion del propietario','El nuevo propietario se ha creado exitosamente.','success');
            router.push('/propietarios');    
        } catch (error) {
            return console.log(error)
        }        
    };

    const startCreatePropietarioJuridico = async({direccion,telefono,email,nit,razon_social,predio}) => {
        const client = await getClient();
        
        const mutation = gql`
        
        mutation create(
    
                $telefono: Int!,
                $email: String!,
                $direccion: String!,
                $nit: Int!,
                $razon_social: String!
                $predio: Int!
            
            ) {
                createPropietario(
                    telefono: $telefono,
                    email: $email,
                    direccion: $direccion
                    nit: $nit,
                    razon_social: $razon_social,
                    predio: $predio
            ) {
               id,
               predio
            }
            }
    
        `;
    
        const variables = {
            direccion: direccion,
            telefono: parseInt(telefono),
            email: email,
            nit: parseInt(nit),
            razon_social: razon_social,
            predio: parseInt(predio),
        }
    
        try {
            await client.request(mutation, variables);
            Swal.fire('Creacion del propietario','El nuevo propietario se ha creado exitosamente.','success');
            router.push('/propietarios');    
        } catch (error) {
            return console.log(error)
        }      
    };

    const startUpdatePropietarioJ = async({id,direccion,telefono,email,nit,razon_social,predio}) => {
        const client = await getClient();
        
        const mutation = gql`
        
        mutation create(
    
                $id: Int!,
                $telefono: Int!,
                $email: String,
                $direccion: String!,
                $nit: Int!,
                $razon_social: String!
                $predio: Int!
            
            ) {
                updatePropietario(
                    id: $id,
                    telefono: $telefono,
                    email: $email,
                    direccion: $direccion
                    nit: $nit,
                    razon_social: $razon_social,
                    predio: $predio
            ) {
               success,
               message
            }
            }
    
        `;
    
        const variables = {
            id: id,
            direccion: direccion,
            telefono: parseInt(telefono),
            email: email,
            nit: parseInt(nit),
            razon_social: razon_social,
            predio: parseInt(predio),
        }
    
        try {
            await client.request(mutation, variables);
            Swal.fire('Actualizacion del propietario','El propietario se ha actualizado exitosamente.','success');
            router.push('/propietarios');    
        } catch (error) {
            return console.log(error)
        }      
    }

    const startUpdatePropietarioN = async({id,direccion,telefono,email,tipo_documento,numero_documento,nombre,apellidos,predio}) => {
        const client = await getClient();

        const mutation = gql`
        
        mutation create(
    
                $id: Int!,
                $telefono: Int!,
                $email: String!,
                $direccion: String!,
                $tipo_documento: String!,
                $numero_documento: Int!,
                $nombre: String!,
                $apellidos: String!,
                $predio: Int!
            
            ) {
                updatePropietario(
                    id: $id,
                    telefono: $telefono,
                    email: $email,
                    direccion: $direccion
                    tipo_documento: $tipo_documento,
                    numero_documento: $numero_documento,
                    nombre: $nombre,
                    apellidos: $apellidos,
                    predio: $predio
            ) {
               success,
               message,
            }
            }
    
        `;
    
        const variables = {
            id: id,
            direccion: direccion,
            telefono: parseInt(telefono),
            email: email,
            tipo_documento: tipo_documento,
            numero_documento: parseInt(numero_documento),
            nombre: nombre,
            apellidos:apellidos,
            predio: parseInt(predio),
        }

        try {
            await client.request(mutation, variables);
            Swal.fire('Actualizacion del propietario','El propietario se ha actualizado exitosamente.','success');
            router.push('/propietarios');    
        } catch (error) {
            return console.log(error)
        }        
    };

    const startDeletePropietario = async({id}) => {
        const client = await getClient();

        const mutation = gql`
        
        mutation create(
                $id: Int!,     
            ) {
                deletePropietario(
                    id: $id,
            )
            }
    
        `;
    
        const variables = {
            id: parseInt(id),
        }

        try {
            await client.request(mutation, variables);
            Swal.fire('Actualizacion del propietario','El propietario se ha actualizado exitosamente.','success');
            router.push('/propietarios');    
        } catch (error) {
            return console.log(error)
        }        
    }

    return {

        propietariosJ,
        propietariosN,
        startListProietariosJ,
        startListProietariosN,
        startCreatePropietarioNatural,
        startCreatePropietarioJuridico,
        startUpdatePropietarioJ,
        startUpdatePropietarioN,
        startDeletePropietario,

    };

};