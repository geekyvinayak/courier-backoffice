import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../../../consts/apiCalls";

const rows = [
  {
    id: 1,
    Id: "DAYOFF",
    nameEn: "Weekend",
    nameFr: "Fin de semaine",
    unitEn: "Each",
    unitFr: "Chaque",
    reference: "",
  },
  {
    id: 2,
    Id: "DeliveryWaitTime",
    nameEn: "Delivery Wait Time",
    nameFr: "Attente à la livraison",
    unitEn: "min",
    unitFr: "min",
    reference: "",
  },
  {
    id: 3,
    Id: "HOLIDAY",
    nameEn: "Holiday",
    nameFr: "Jour férié",
    unitEn: "Each",
    unitFr: "Chaque",
    reference: "",
  },
  {
    id: 4,
    Id: "MILEAGE",
    nameEn: "Mileage",
    nameFr: "Kilométrage",
    unitEn: "km",
    unitFr: "km",
    reference: "",
  },
  {
    id: 5,
    Id: "NumberOfPieces",
    nameEn: "Nb. of Pieces",
    nameFr: "Nbr. de pièces",
    unitEn: "item",
    unitFr: "item",
    reference: "",
  },
  {
    id: 6,
    Id: "OFFHOURS",
    nameEn: "After Hours",
    nameFr: "Après heures",
    unitEn: "Each",
    unitFr: "Chaque",
    reference: "",
  },
  {
    id: 7,
    Id: "PickupWaitTime",
    nameEn: "Pickup Wait Time",
    nameFr: "Attente au ramassage",
    unitEn: "min",
    unitFr: "min",
    reference: "",
  },
  {
    id: 8,
    Id: "TIP",
    nameEn: "Tip",
    nameFr: "Pourboire",
    unitEn: "Each",
    unitFr: "Chaque",
    reference: "",
  },
  {
    id: 9,
    Id: "TotalWeight",
    nameEn: "Weight",
    nameFr: "Poids",
    unitEn: "lbs",
    unitFr: "lbs",
    reference: "",
  },
  {
    id: 10,
    Id: "5-tonTime",
    nameEn: "5-Ton extra time",
    nameFr: "5-ton time",
    unitEn: "Hrs",
    unitFr: "Hrs",
    reference: "",
  },
];

const columns = [
  { field: "id", headerName: "Id", flex: 1 },
  { field: "name", headerName: "Name (EN)", flex: 1.5 },
  { field: "unitsOfMeasure", headerName: "Unit of Measure (EN)", flex: 1.5 },
  { field: "reference", headerName: "Reference #", flex: 1 },
];

const ExtraFeesGrid = () => {
  const navigate = useNavigate();

  const [extraFeesList, setExtraFeesList] = useState([]);

  const fetchExtraFees = async () => {
    try {
      const response = await getRequest("/extraFee");
      setExtraFeesList(response);
    } catch (error) {
      console.error("Error fetching Extra fees:", error);
    }
  };

  useEffect(() => {
    fetchExtraFees();
  }, []);

  return (
    <div className="mx-auto w-[90%] mt-5">
      <div>
        <DataGrid
          rows={extraFeesList}
          className="cursor-pointer"
          columns={columns}
          onCellClick={(params) => {
            if (params.field != "action") {
              navigate(`./edit/${params.row.id}`);
            }
          }}
          disableColumnMenu
          disableSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          sx={{
            "& .MuiDataGrid-cell , & .MuiDataGrid-columnHeader ": {
              border: "1px solid #e0e0e0", // Border between rows
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#f5f5f5", // Light color for odd rows
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "#ffffff", // White color for even rows
            },
            "& .MuiDataGrid-virtualScrollerContent": {
              maxHeight: "50vh",
            },
            "& .MuiDataGrid-columnHeaders": {
              fontWeight: "bold", // Bold text
              fontSize: "16px", // Increase font size
            },
          }}
        />
      </div>
    </div>
  );
};

export default ExtraFeesGrid;
