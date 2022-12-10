export default function useRows(proveedores) {
    //const rows = proveedores
    const columns = ["id","nombre","RS","Direccion"]
    const complete ={"rows": proveedores,"columns":columns}

  return complete;
}
