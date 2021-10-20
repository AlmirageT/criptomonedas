import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ResultadoDiv = styled.div`
    color:#fff;

`;
const Parrafo = styled.p`
    font-size: 18px;
    span {
        font-weight:bold;
    }
`;
const Precio = styled.p`
    font-size:30px;
    span {
        font-weight:bold;
    }
`;

const Cotizacion = ({resultado}) => {
    if(Object.keys(resultado).length === 0){
        return null;
    }
    return ( 
        <ResultadoDiv>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Parrafo>El precio más alto del dia: <span>{resultado.HIGHDAY}</span></Parrafo>
            <Parrafo>El precio más bajo del dia: <span>{resultado.LOWDAY}</span></Parrafo>
            <Parrafo>Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Parrafo>
            <Parrafo>Última actualizacion: <span>{resultado.LASTUPDATE}</span></Parrafo>
        </ResultadoDiv>
     );
}
 
Cotizacion.propType = {
    resultado: PropTypes.func.isRequired,
}

export default Cotizacion;