import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography, IconButton } from '@mui/material';
import { FuleSurchargeDetailCreate } from './fuleSurchargeDetailCreate';
import { DeleteDialog } from '../../../components/deleteDialog';
import { getRequest, deleteRequest } from '../../../consts/apiCalls';
import useToast from '../../../components/toast/useToast';

export const FuleSurchargeDetail = ({ id: tableId }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [rows, setRows] = useState([]);
  const { showError, showSuccess } = useToast();

  // 🔹 Fetch data from API
  const fetchDetails = async () => {
    try {
      const response = await getRequest(`/fuel-surcharge-tables/${tableId}/details`);
      setRows(response || []);
    } catch (error) {
      console.error('Failed to fetch surcharge details:', error);
      showError('Failed to fetch surcharge details');
    }
  };

  // 🔹 Delete record
  const handleDelete = async (detailId) => {
    try {
      await deleteRequest(`/fuel-surcharge-tables/${tableId}/details/${detailId}`);
      showSuccess('Surcharge deleted successfully');
      fetchDetails();
    } catch (error) {
      console.error('Failed to delete surcharge:', error);
      showError('Failed to delete surcharge');
    }
  };

  // 🔹 Fetch data when component mounts or tableId changes
  useEffect(() => {
    if (tableId) fetchDetails();
  }, [tableId]);

  // 🔹 DataGrid Columns
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
        return (
          vehicleOverrides
            .map((v) => {
              if (v.overrideValue !== null && v.overrideValue !== undefined) {
                return `${v.vehicleTypeId}: ${v.overrideValue}`;
              }
              if (v.overrideFuelPriceId || v.overrideFuelCalculatorId) {
                return `${v.vehicleTypeId}: (PriceId:${v.overrideFuelPriceName || '—'}, CalcId:${v.overrideFuelCalculatorName || '—'})`;
              }
              return null;
            })
            .filter(Boolean)
            .join(', ') || '—'
        );
      },
    },
    {
      field: 'action',
      headerName: '',
      sortable: false,
      flex: 0.5,
      cellClassName: 'flex !justify-center',
      renderCell: (params) => (
        <IconButton>
          <DeleteDialog handleDelete={() => handleDelete(params.row.fuelSurchargeTableId)} />
        </IconButton>
      ),
    },
  ];

  return (
    <div className='border-solid border border-gray p-5 mb-4 mt-4'>
      <div className='flex justify-between items-center mb-4 px-1'>
        <Typography className='block text-sm text-gray-700 mb-1 font-semibold'>
          Fuel Surcharges
        </Typography>
        <Button
          variant='contained'
          color='primary'
          onClick={() => {
            setDetailId(null);
            setShowDialog(true);
          }}
        >
          Add Surcharges
        </Button>
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          getRowId={(row) => row.fuelSurchargeTableId}
          onCellClick={(params) => {
            if (params.field === 'startDate') {
              setDetailId(params.row.fuelSurchargeTableId);
              setShowDialog(true);
            }
          }}
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-cell , & .MuiDataGrid-columnHeader ': {
              border: '1px solid #e0e0e0',
            },
            '& .MuiDataGrid-row:nth-of-type(odd)': {
              backgroundColor: '#f5f5f5',
            },
            '& .MuiDataGrid-row:nth-of-type(even)': {
              backgroundColor: '#ffffff',
            },
            '& .MuiDataGrid-columnHeaders': {
              fontWeight: 'bold',
              fontSize: '14px',
            },
            '& .MuiDataGrid-virtualScrollerContent': {
              fontWeight: '500',
              fontSize: '12px',
            },
          }}
        />
      </div>

      <FuleSurchargeDetailCreate
        open={showDialog}
        handleDialogClose={() => { setShowDialog(false); fetchDetails() }}
        detailId={detailId}
        setDetailId={setDetailId}
        tableId={tableId}
        refreshData={fetchDetails}
      />
    </div>
  );
};
