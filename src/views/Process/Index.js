import React, {Fragment, useState, useEffect} from 'react'
import Navbar from '../../components/NavBar';
import PList from '../../components/PList';
import PListPag from '../../components/PListPag';
import Form  from '../../components/Form';
import { Button } from '@material-ui/core';
import  'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import VirtualScroll from '../../components/VirtualScroll';
import {Container,Modal,ModalBody,ModalHeader,ModalFooter} from 'reactstrap';
import { DataGrid, GridEventListener,GridRowsProp,GridColDef } from '@mui/x-data-grid';
//import  { Proveedor,useProveedorData }  from './model/useProveedorData.d.ts';
import { useMovieData } from '@mui/x-data-grid-generator';
import useRows from '../../components/useRows'
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const totalEle = 100000;

const rows = [
  { id: 0, nombre: '', razonsocial: '', direccion: '', col5: '' }/*,
  { id: 2, nombre: 'DataGridPro', razonsocial: 'is Awesome', direccion: ':)', col5: 'ri?' },
  { id: 3, nombre: 'MUI', razonsocial: 'is Amazing', direccion: ':/', col5: '!!!' },*/
];

//console.log(rows.length+ "DATOS rows: "+rows);
const columns = [
  { field: 'id', headerName: 'id', width: 150 },
  { field: 'nombre', headerName: 'Nombre', width: 150 },
  { field: 'razonsocial', headerName: 'Razon social', width: 150 },
  { field: 'direccion', headerName: 'Direccion', width: 150 },
  { field: 'col5', headerName: '', width: 150 }
];

function Index() {
 
  const [state, setState] = useState({
    modalActualizar: false,
    modalInsertar: false,
    form: {
      nombre: "",
      razonsocial: "",
      direccion: "",
    },
  });


  const [proveedor, setProveedor] = useState({
    nombre: '',
    razonsocial:'',
    direccion:''
  })
  const [proveedores, setProveedores] = useState([])
  const [grids, setGrids] = useState([])
  const [listUpdated, setListUpdatedProveedores] = useState(false)
  
   
  const mostrarModalInsertar = () => {
    setState({
      modalInsertar: true,
    });
  };
  const cerrarModalInsertar = () => {
    setState({ modalInsertar: false });
  };
  useEffect(() => {
    const getProv = async ()=>{
      //console.log("INICIA CARGA")
      const promise = await axios.get("http://localhost:9001/api/",{ method: 'GET',
        headers: {'Access-Control-Allow-Origin':'*'},
        mode: 'no-cors', // <---
        cache: 'default'
      });
    const status = promise.status;
    if(status===200)
    {
      const data = promise.data;
      //console.log("DATA:"+data)
      //setState({books:data});
      setProveedores(data);
      /*setGrids(new Array(data.length).fill(null).map((data, index) => {
        return (<div style={{height:'70px'}} key={index} className="grid">
          <h3>Lorem Ipsum is simply dummy text of the printing {index}</h3>
        </div>)
      }))
      */
      setDatos(data,["id","nombre","RS","Direccion"])
      setDatosInfo(data)
      //console.log(data.length+" DATOS data: "+data);
      /*
      setGrids(data.map((data, index) => {
        return (<div style={{height:'70px'}} key={index} className="grid">
        <h3>{index} {data.nombre} {data.razonsocial} {data.direccion}</h3>
        </div>)
      }))
      */
    }else{
      console.log("ERROR AL CARGAR LA LISTA")
    }
    }
    getProv()
    setListUpdatedProveedores(false)
  }, [listUpdated]);
  /* test table*/
    
    const [datos, setDatos] = useState({
      rows: proveedores,
      columns : ["id","nombre","RS","Direccion"]
    })
    //const datos = useRows(proveedores);
    //console.log("DATOS gen: "+datos)
    //console.log("DATOS rows: "+datos.rows)
    //console.log("DATOS col: "+datos.columns)
    //const data = useProveedorData();
    //---------ORiGIN
    const [message, setMessage] = React.useState('');
    const dataOrigin = useMovieData();
    const handleRowClick = (params) => {
      setMessage(`Movie "${params.row.col1}" clicked-> "${params.row.id}"`);
    };
    const [finalClickInfo, setFinalClickInfo] = useState(null);
    const [datosInfo, setDatosInfo] = useState(rows);
    const handleOnCellClick = (params) => {
      setFinalClickInfo(params);
      //console.log("Columna->"+params.field)
      if(params.field=="col5"){
         //Damos de baja
        console.log("Solicita Baja de "+params.id)
        
        //Consume DELETE
        const requestInit ={
             method : 'DELETE'
         }
         fetch('http://localhost:9001/api/'+params.id,requestInit)
         .then(res => res.text())
         .then(res=> console.log("resultado"+res))
         setListUpdatedProveedores(true)
     
     
      }
       
    };
 /* FIN test table */
  const handleChangeIns = (e,form) => {
    console.log("hola mundo"+form.nombre)
  };

 
  const handleSumbitInsert= () =>{
    console.log("nombre -> "+state.form.nombre)
      //validacion de los datos
      if(proveedor.nombre==='' || 
      proveedor.razonsocial==='' ||
      proveedor.direccion==='' ){
          alert('Todos los campos son obligatorios')
          return
      }

      //Consulta POST
      const requestInit ={
          method : 'POST',
          headers: {'Content-Type':'application/json'},
          body:JSON.stringify(proveedor)
      }
      fetch('http://localhost:9001/api/',requestInit)
      .then(res => res.json())
      .then(res=> console.log("resultado"+res))

      setProveedor({
          nombre:"",
          razonsocial:"",
          direccion:""
      })
      
  }
  return (
   <Fragment>
    <Navbar brand='E-commerce'/>
    <Container>
      <Button color="primary" variant='contained' onClick={()=>mostrarModalInsertar()}>
        Agregar proveedor
      </Button>
    </Container>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Box sx={{ height: 300, width: '100%' }}>
        <DataGrid rows={datosInfo} columns={columns} onCellClick={handleOnCellClick}  />
      </Box>
      {message && <Alert severity="info">{message}</Alert>}
    </Stack>

    {finalClickInfo &&
        `Final clicked id = ${finalClickInfo.id}, 
        Final clicked field = ${finalClickInfo.field}, 
        Final clicked value = ${finalClickInfo.value}`}
   {/* <div className='container'>
      <div className='row'>
        <div className='col-7'>
          <h2 style={{textAlign:'center'}}>Proveedores list</h2>
            <PList proveedores={proveedores} listUpdated={listUpdated} setListUpdatedProveedores={setListUpdatedProveedores}></PList>
        </div>
        
        </div>
    </div> */}

    <div className='container'>
      
    </div>
    <Modal isOpen={state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar proveedor</h3></div>
          </ModalHeader>

          <ModalBody>
          <Form proveedor={proveedor} setProveedor={setProveedor}></Form>

          </ModalBody>

          <ModalFooter>
            
            <Button
              className="btn btn-danger"
              onClick={()=>cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        
   </Fragment>
    
   
  );
}

export default Index;
