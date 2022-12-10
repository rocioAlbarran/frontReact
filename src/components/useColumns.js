import { useMemo } from "react";

export default function useColumns() {
  const columns = useMemo(
    () => [
      {
        Header: "id",
        accessor: "id"
      },
      {
        Header: "Nombre",
        accessor: "nombre"
      },
      {
        Header: "Razon Social",
        accessor: "razonsocial"
      },
      {
        Header: "Direccion",
        accessor: "direccion"
      }
      /*
      ,
      {
        Header: "-",
        accessor: "borrar"
      }*/
    ],
    []
  );

  return columns;
}
