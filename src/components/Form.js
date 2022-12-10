import React from 'react'
const Form = ({proveedor, setProveedor})=>{

    const handleChange= e =>{
        setProveedor({
            ...proveedor,
            [e.target.name]:e.target.value
        })
    }

    const handleSumbit= () =>{
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
        .then(res => {
            return res.ok?
            res.json(): Promise.reject({
                error:true,
                status:res.status,
                statusText:res.statusText
            })
        }).catch(error =>{
            return {
                error:true,
                statusText:error.message
            }
        })

        setProveedor({
            nombre:"",
            razonsocial:"",
            direccion:""
        })

    }

    return(
        <form onSubmit={handleSumbit}>
            <div className='mb-3'>
                <label  htmlFor='nombre' className='form-label'>Nombre</label>
                <input name="nombre" onChange={handleChange} type ="text" id="nombre" className='form-control'/>
            </div>
            <div className='mb-3'>
                <label  htmlFor='razonsocial' className='form-label'>Razón Social</label>
                <input name="razonsocial" onChange={handleChange} type ="text" id="razsoc" className='form-control'/>
            </div>
            <div className='mb-3'>
                <label  htmlFor='direccion' className='form-label'>Dirección</label>
                <input name = "direccion" onChange={handleChange} type ="text" id="direccion" className='form-control'/>
            </div>
            <button className='btn btn-primary'>Submit</button>
        </form>
    );
}
export default Form;