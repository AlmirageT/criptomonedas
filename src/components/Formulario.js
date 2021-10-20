import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import Axios from 'axios';
import Error from './Error';
import PropTypes from 'prop-types';


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color:#fff;
    transition:background-color .3s ease;
    &:hover{
        background-color:#326AC0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarCriptoMoneda}) => {

    //state del listado de criptomonedas
    const [ listaCripto, guardarCriptomonedas ] = useState([]);
    //validaciones
    const [ error, guardarError ] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar de Estados Unidos' },
        { codigo: 'CLP', nombre: 'Peso Chileno' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Peso Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ];

    //utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu Moneda','',MONEDAS);
    //UTILIZAR USECRIPTOMONEDA
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda','',listaCripto);
    //ejecutar llamado a la api
    useEffect(() => {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await Axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarApi();
    }, []);

    //cuando se hace submit
    const cotizarMoneda = e => {
        e.preventDefault();
        //validar si campos estan llenos
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }
        //dejar error como false
        guardarError(false);
        //pasar datos al componente principal
        guardarMoneda(moneda);
        guardarCriptoMoneda(criptomoneda);

    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="TODOS LOS CAMPOS SON OBLIGATORIOS"/> : null}

            <SelectMonedas/>

            <SelectCripto/>

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
Formulario.propType = {
    guardarCriptoMoneda: PropTypes.func.isRequired,
    guardarMoneda: PropTypes.func.isRequired
}
export default Formulario;