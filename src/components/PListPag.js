import React from 'react'
import { useTable, usePagination } from "react-table";
import useRows from "./useRows";
import useColumns from "./useColumns";

import { BiFirstPage, BiLastPage } from "react-icons/bi";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import "../css/styles.css";
const PListPag = ({proveedores,setListUpdatedProveedores})=>{
    
    //console.log("en PLIST.js"+proveedores);
    //proveedores = JSON.stringify(proveedores)
    const handleDelete =id=>{
        console.log("ID:"+id)
        //Consulta DEL
        const requestInit ={
           method : 'DELETE'
       }
       fetch('http://localhost:9000/api/'+id,requestInit)
       .then(res => res.text())
       .then(res=> console.log("resultado"+res))
       setListUpdatedProveedores(true)
   
   }
   const columns = useColumns();
  const data = useRows(proveedores);
  const table = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 5,
        pageIndex: 0
      }
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = table;

    return (
        <div className="container">
        <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            page.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </td>
                       
                        
                      );
                    })
                  }
                  <td><button id='borrar' 
                  onClick={()=> handleDelete(row.cells)} 
                  className='btn btn-danger'>Eliminar</button></td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      <div className="pagination">
        <span>
          Página&nbsp;
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{" "}
        </span>
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            <BiFirstPage className="page-controller" />
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            <MdKeyboardArrowLeft className="page-controller" />
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            <MdKeyboardArrowRight className="page-controller" />
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <BiLastPage className="page-controller" />
          </button>{" "}
        </div>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 15].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize !== 15 ? `Mostrar ${pageSize}` : `Mostrar todo`}
            </option>
          ))}
        </select>
      </div>
      </div>
    );
}
export default PListPag;