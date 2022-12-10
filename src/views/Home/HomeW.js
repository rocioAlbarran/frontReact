//import logo from './logo.svg';
import React,{useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import '../../css/styles.css';
import { Button } from '@material-ui/core';
const styles = makeStyles({
  tablaMaterial:{
    minWidth:300,
    alignContent: "center"
  }
})
function HomeW() {
  return (
    <div className="App">

        <TableContainer>
          <table className='classes.tablaMaterial'>
            <TableHead>
              <TableRow>
                <TableCell>e-Commerce Gapsi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            <TableRow>
                <TableCell><img src='http://www.grupoasesores.com.mx/img/logo.png'/></TableCell>
              </TableRow>
            <TableRow>
                <TableCell className='celdas'>Candidato</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><a href='/users'><Button color="primary" variant='contained' >
        Continuar
      </Button></a></TableCell>
              </TableRow>
              <TableRow>
                <TableCell> v1.0.0</TableCell>
              </TableRow>
              </TableBody>
          </table>
        </TableContainer>
        <div>
        
        </div>
      </div>
      
   
  );
}

export default HomeW;
