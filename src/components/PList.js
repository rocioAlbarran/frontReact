import React from 'react'

const PList = ({proveedores,setListUpdatedProveedores})=>{
    //console.log("en PLIST.js"+proveedores);
    //proveedores = JSON.stringify(proveedores)
    const handleDelete =id=>{
        //Consulta POST
        const requestInit ={
           method : 'DELETE'
       }
       fetch('http://localhost:9000/api/'+id,requestInit)
       .then(res => res.text())
       .then(res=> console.log("resultado"+res))
       setListUpdatedProveedores(true)
   
   }
    return (
        
        <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>nombre</th>
                    <th>RS</th>
                    <th>Dirección</th>
                </tr>
            </thead>
            <tbody>
            {proveedores.map(proveedor=> (
                <tr key = {proveedor.id}>
                    <td>{proveedor.id}</td>
                    <td>{proveedor.nombre}</td>
                    <td>{proveedor.razonsocial}</td>
                    <td>{proveedor.direccion}</td>
                    <td>
                        <div className='mb-3'>
                            <button  onClick={()=> handleDelete(proveedor.id)} className='btn btn-danger'>Delete</button>
                        </div>
                    </td>
                </tr>
                ))
            }
            </tbody>
        </table>
    );
}
export default PList;