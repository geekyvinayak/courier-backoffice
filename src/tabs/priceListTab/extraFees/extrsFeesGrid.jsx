import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
  { id: 1, Id: "DAYOFF", nameEn: "Weekend", nameFr: "Fin de semaine", unitEn: "Each", unitFr: "Chaque", reference: "" },
  { id: 2, Id: "DeliveryWaitTime", nameEn: "Delivery Wait Time", nameFr: "Attente à la livraison", unitEn: "min", unitFr: "min", reference: "" },
  { id: 3, Id: "HOLIDAY", nameEn: "Holiday", nameFr: "Jour férié", unitEn: "Each", unitFr: "Chaque", reference: "" },
  { id: 4, Id: "MILEAGE", nameEn: "Mileage", nameFr: "Kilométrage", unitEn: "km", unitFr: "km", reference: "" },
  { id: 5, Id: "NumberOfPieces", nameEn: "Nb. of Pieces", nameFr: "Nbr. de pièces", unitEn: "item", unitFr: "item", reference: "" },
  { id: 6, Id: "OFFHOURS", nameEn: "After Hours", nameFr: "Après heures", unitEn: "Each", unitFr: "Chaque", reference: "" },
  { id: 7, Id: "PickupWaitTime", nameEn: "Pickup Wait Time", nameFr: "Attente au ramassage", unitEn: "min", unitFr: "min", reference: "" },
  { id: 8, Id: "TIP", nameEn: "Tip", nameFr: "Pourboire", unitEn: "Each", unitFr: "Chaque", reference: "" },
  { id: 9, Id: "TotalWeight", nameEn: "Weight", nameFr: "Poids", unitEn: "lbs", unitFr: "lbs", reference: "" },
  { id: 10, Id: "5-tonTime", nameEn: "5-Ton extra time", nameFr: "5-ton time", unitEn: "Hrs", unitFr: "Hrs", reference: "" },
];

const columns = [
  { field: "Id", headerName: "Id", flex: 1 },
  { field: "nameEn", headerName: "Name (EN)", flex: 1.5 },
  { field: "nameFr", headerName: "Name (FR)", flex: 1.5 },
  { field: "unitEn", headerName: "Unit of Measure (EN)", flex: 1.5 },
  { field: "unitFr", headerName: "Unit of Measure (FR)", flex: 1.5 },
  { field: "reference", headerName: "Reference #", flex: 1 },
];

const ExtraFeesGrid = () => {
  return (
    <div className="mx-auto w-[80%] mt-2">
      <div>
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnMenu
          disableSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          sx={{
            '& .MuiDataGrid-cell , & .MuiDataGrid-columnHeader ': {
              border: '1px solid #e0e0e0', // Border between rows
            },
            '& .MuiDataGrid-row:nth-of-type(odd)': {
              backgroundColor: '#f5f5f5', // Light color for odd rows
            },
            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: '#ffffff', // White color for even rows
            },
          }}
        />
      </div>
    </div>
  );
};

export default ExtraFeesGrid;
