import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';
import { FuleSurchargeDetailCreate } from './fuleSurchargeDetailCreate';

export const FuleSurchargeDetail = ({ formik, id:tableId }) => {

    const [showDialog, setShowDialog] = useState(false);
    const [detailId, setDetailId] = useState(false);
    // Define DataGrid columns
    const columns = [
        {
            field: 'startDate',
            headerName: 'Start Date',
            flex: 1,
            cellClassName: 'text-center cursor-pointer !text-[#3e4396]',
        },
        {
            field: 'surcharges',
            headerName: 'Surcharges',
            flex: 2,
            renderCell: (params) => {
                const vehicleOverrides = params.row.vehicleOverrides || [];
                return vehicleOverrides
                    .filter(v => v.overrideValue !== null && v.overrideValue !== undefined)
                    .map(v => `${v.vehicleTypeId}: ${v.overrideValue}`)
                    .join(', ') || '—';
            },
        },
    ];

    return (
        <div className='border-solid border border-gray p-5 mb-4 mt-4'>
            <div className="flex justify-between items-center mb-4 px-1">
                <Typography className='block text-sm text-gray-700 mb-1 font-semibold'>
                    Fuel Surcharges
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                // onClick={()=>setShowDialog(true)}
                >
                    Add Surcharges
                </Button>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={formik.values.details}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10]}
                    onCellClick={(params) => {
                        console.log(params.row);
                        if (params.field == "startDate") {
                            setDetailId(params.row.fuelSurchargeTableId);
                            setShowDialog(true);
                        }

                    }}
                    disableRowSelectionOnClick
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
                        "& .MuiDataGrid-columnHeaders": {
                            fontWeight: "bold", // Bold text
                            fontSize: "14px", // Increase font size
                        },
                        "& .MuiDataGrid-virtualScrollerContent": {
                            fontWeight: "500", // Bold text
                            fontSize: "12px",
                        },
                    }}
                />
            </div>
            {
                <FuleSurchargeDetailCreate
                    open={showDialog}
                    handleDialogClose={() => setShowDialog(false)}
                    detailId={detailId}
                    setDetailId={setDetailId}
                    tableId={tableId}
                />
            }
        </div>
    );
};
