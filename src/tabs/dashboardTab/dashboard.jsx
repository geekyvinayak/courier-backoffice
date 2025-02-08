import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import { Card, CardHeader, CardContent, Box, Chip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ResponsiveLine } from '@nivo/line';
import LocationOnIcon from '@mui/icons-material/LocationOn';
const OrderDashboard = () => {
  const totalData = [
    { id: 'Received', value: 20, color: '#A8A8A8' },
    { id: 'Assigned', value: 20, color: '#2E7D32' },
    { id: 'Picked up', value: 15, color: '#90CAF9' },
    { id: 'Delivered', value: 25, color: '#1976D2' },
  ];

  const deliveredData = [
    { id: 'On Time', value: 27, color: '#2E7D32' },
  ];

  const activeData = [
    { id: 'On Time', value: 33, color: '#2E7D32' },
    { id: 'At Risk', value: 10, color: '#FFA000' },
    { id: 'Late', value: 10, color: '#D32F2F' },
  ];

  const barData = [
    { date: 'Jan 25', 'On Time': 115, Late: 25 },
    { date: 'Jan 26', 'On Time': 105, Late: 15 },
    { date: 'Jan 27', 'On Time': 80, Late: 25 },
    { date: 'Jan 28', 'On Time': 120, Late: 20 },
    { date: 'Jan 29', 'On Time': 125, Late: 20 },
    { date: 'Feb 1', 'On Time': 0, Late: 0 },
    { date: 'Feb 2', 'On Time': 90, Late: 20 },
    { date: 'Feb 3', 'On Time': 115, Late: 15 },
    { date: 'Feb 4', 'On Time': 120, Late: 10 },
    { date: 'Feb 5', 'On Time': 110, Late: 15 },
    { date: 'Feb 6', 'On Time': 25, Late: 0 },
  ];

  const CenterText = ({ value }) => (
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="middle"
      style={{
        fontSize: '24px',
        fontWeight: 'bold',
        fill: '#000'
      }}
    >
      {value}
    </text>
  );

  return (
    <div className='flex p-4 justify-between'>
    <div style={{display: 'flex',flex:1, flexDirection: 'column', gap: '1rem' , maxWidth:"45%",justifyContent:"space-between"}}>
      {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        <div className='max-w-[200px]'>
        <Card>
          <CardHeader 
            title={<Typography variant="h6">Total</Typography>}
          />
          <CardContent>
            <div style={{ height: '256px', position: 'relative' }}>
              <ResponsivePie
                data={totalData}
                margin={{ top: 20, right: 120, bottom: 20, left: 20 }}
                innerRadius={0.6}
                padAngle={0.5}
                cornerRadius={3}
                colors={{ datum: 'data.color' }}
                enableArcLabels={false}
                enableArcLinkLabels={false}
                legends={[{
                  anchor: 'right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemsSpacing: 10,
                  symbolSize: 12,
                  itemDirection: 'left-to-right'
                }]}
                layers={['arcs', 'legends', () => <CenterText value={80} />]}
              />
            </div>
          </CardContent>
        </Card></div>

<div className='max-w-[250px]'>
        <Card>
          <CardHeader 
            title={<Typography variant="h6">Delivered</Typography>}
          />
          <CardContent>
            <div style={{ height: '256px' }}>
              <ResponsivePie
                data={deliveredData}
                margin={{ top: 20, right: 120, bottom: 20, left: 20 }}
                innerRadius={0.6}
                colors={{ datum: 'data.color' }}
                enableArcLabels={false}
                enableArcLinkLabels={false}
                legends={[{
                  anchor: 'right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemsSpacing: 10,
                  symbolSize: 12,
                  itemDirection: 'left-to-right'
                }]}
                layers={['arcs', 'legends', () => <CenterText value={27} />]}
              />
            </div>
          </CardContent>
        </Card></div>
        <div className='max-w-[200px]'>
        <Card>
          <CardHeader 
            title={<Typography variant="h6">Active</Typography>}
          />
          <CardContent>
            <div style={{ height: '256px' }}>
              <ResponsivePie
                data={activeData}
                margin={{ top: 20, right: 120, bottom: 20, left: 20 }}
                innerRadius={0.6}
                colors={{ datum: 'data.color' }}
                enableArcLabels={false}
                enableArcLinkLabels={false}
                legends={[{
                  anchor: 'right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemsSpacing: 10,
                  symbolSize: 12,
                  itemDirection: 'left-to-right'
                }]}
                layers={['arcs', 'legends', () => <CenterText value={53} />]}
              />
            </div>
          </CardContent>
        </Card></div>
      </div> */}
  <div className='h-50%'>
      <Card>
        <CardHeader 
          title={<Typography variant="h6">Delivered Orders Per Day</Typography>}
        />
        <CardContent>
          <div style={{ height: '320px' }}>
            <ResponsiveBar
              data={barData}
              keys={['On Time', 'Late']}
              indexBy="date"
              margin={{ top: 20, right: 130, bottom: 50, left: 50 }}
              padding={0.3}
              colors={['#1469ad', '#4fa4d4']}
              axisBottom={{
                tickRotation: -45
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0
              }}
              legends={[{
                dataFrom: 'keys',
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 12
              }]}
            />
          </div>
        </CardContent>
      </Card>
      </div>
      <div className='h-50%'>
      <LatenessChart />
      </div>
    </div>
    <LastOrders />
    </div>
  );
};

export default OrderDashboard;

const LatenessChart = () => {
  const data = [
    {
      id: "Today",
      data: [
        { x: "7AM", y: 0 },
        { x: "8AM", y: 200 },
        { x: "9AM", y: 400 },
        { x: "10AM", y: 300 },
        { x: "11AM", y: 200 },
        { x: "12PM", y: 100 },
        { x: "1PM", y: 200 },
        { x: "2PM", y: 300 },
        { x: "3PM", y: 200 },
        { x: "4PM", y: 100 },
        { x: "5PM", y: 200 },
        { x: "6PM", y: 100 },
        { x: "7PM", y: 0 }
      ],
      color: "#1976D2"
    },
    {
      id: "Last Friday",
      data: [
        { x: "7AM", y: 0 },
        { x: "8AM", y: 300 },
        { x: "9AM", y: 500 },
        { x: "10AM", y: 400 },
        { x: "11AM", y: 300 },
        { x: "12PM", y: 200 },
        { x: "1PM", y: 300 },
        { x: "2PM", y: 400 },
        { x: "3PM", y: 300 },
        { x: "4PM", y: 200 },
        { x: "5PM", y: 300 },
        { x: "6PM", y: 200 },
        { x: "7PM", y: 0 }
      ],
      color: "#666666"
    },
    {
      id: "Last 3 Months Average",
      data: [
        { x: "7AM", y: 0 },
        { x: "8AM", y: 5000 },
        { x: "9AM", y: 10000 },
        { x: "10AM", y: 3000 },
        { x: "11AM", y: 4000 },
        { x: "12PM", y: 6000 },
        { x: "1PM", y: 2000 },
        { x: "2PM", y: 1000 },
        { x: "3PM", y: 1000 },
        { x: "4PM", y: 1000 },
        { x: "5PM", y: 1500 },
        { x: "6PM", y: 1000 },
        { x: "7PM", y: 0 }
      ],
      color: "#E91E63"
    }
  ];

  return (
    <Card>
      <CardHeader 
        title={<Typography variant="h6">Minutes of Lateness Per Working Hour</Typography>}
      />
      <CardContent>
        <div style={{ height: '250px' }}>
          <ResponsiveLine
            data={data}
            margin={{ top: 20, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ 
              type: 'linear', 
              min: 0, 
              max: 15000 
            }}
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              tickValues: [0, 5000, 10000, 15000]
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            enableArea={false}
            colors={{ datum: 'color' }}
            legends={[
              {
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 100,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle'
              }
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const LastOrders = () => {
  const orders = [
    {
      id: 'PT210144',
      time: '11:43 AM',
      status: 'Received',
      pickup: {
        address: '920 BELFAST RD',
        city: 'OTTAWA, ON, K1G0Z6',
        time: '11:43 AM - 4:01 PM Feb 7, 2025'
      },
      delivery: {
        address: '303 Terry Fox Dr',
        city: 'Ottawa, ON, K2K 3J1',
        time: '11:43 AM - 4:01 PM Feb 7, 2025'
      }
    },
    {
      id: 'PT210140',
      time: '11:29 AM',
      status: 'Received',
      pickup: {
        address: '1806 Carling Ave',
        city: 'Ottawa, ON, K2A 1E2',
        time: '11:29 AM - 3:29 PM Feb 7, 2025'
      },
      delivery: {
        address: '67 Rue du Couvent',
        city: 'Gatineau, QC, J9H6A2',
        time: '11:29 AM - 3:29 PM Feb 7, 2025'
      }
    },
    {
      id: 'PT210139',
      time: '11:28 AM',
      status: 'Assigned',
      pickup: {
        address: '1806 Carling Ave',
        city: 'Ottawa, ON, K2A 1E2',
        time: '11:28 AM - 3:28 PM Feb 7, 2025'
      },
      delivery: {
        address: '2717 STEVENAGE DR',
        city: 'OTTAWA, ON, K1G 3N2',
        time: '11:28 AM - 3:28 PM Feb 7, 2025'
      }
    },
    {
      id: 'PT210137',
      time: '11:15 AM',
      status: 'Picked up',
      pickup: {
        address: '146 Richmond Rd',
        city: 'Ottawa, ON, K1Z 6W2',
        time: '11:15 AM - 12:15 PM Feb 7, 2025'
      },
      delivery: {
        address: '44 Seymour Ave',
        city: 'Ottawa, ON, K2E 6P2',
        time: '11:15 AM - 12:15 PM Feb 7, 2025'
      }
    },
    {
      id: 'PT210144',
      time: '11:43 AM',
      status: 'Received',
      pickup: {
        address: '920 BELFAST RD',
        city: 'OTTAWA, ON, K1G0Z6',
        time: '11:43 AM - 4:01 PM Feb 7, 2025'
      },
      delivery: {
        address: '303 Terry Fox Dr',
        city: 'Ottawa, ON, K2K 3J1',
        time: '11:43 AM - 4:01 PM Feb 7, 2025'
      }
    },
    {
      id: 'PT210140',
      time: '11:29 AM',
      status: 'Received',
      pickup: {
        address: '1806 Carling Ave',
        city: 'Ottawa, ON, K2A 1E2',
        time: '11:29 AM - 3:29 PM Feb 7, 2025'
      },
      delivery: {
        address: '67 Rue du Couvent',
        city: 'Gatineau, QC, J9H6A2',
        time: '11:29 AM - 3:29 PM Feb 7, 2025'
      }
    },


  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Received': return '#1976D2';
      case 'Assigned': return '#2E7D32';
      case 'Picked up': return '#FFA000';
      default: return '#757575';
    }
  };

  return (
    <div className='w-[50%]'>
    <Card sx={{ p: 2 }}>
      <CardHeader 
        title="Last Orders Created" 
        sx={{ p: 1, pb: 2 }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {orders.map(order => (
          <Box key={order.id} sx={{ 
            display: 'flex', 
            // justifyContent: 'space-between',
            borderBottom: '1px solid #e0e0e0',
            pb: 2
          }}>
            <Box sx={{ display: 'flex', gap: 2, flex: 1 }}>
              <Box>
                <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {order.id}
                  <Typography variant="caption" color="text.secondary">
                    at {order.time}
                  </Typography>
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mt: 1 }}>
                  <LocationOnIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                  <Box>
                    <Typography variant="body2">{order.pickup.address}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {order.pickup.city}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                      {order.pickup.time}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
              <Chip
                label={order.status} 
                size="small"
                sx={{ 
                  bgcolor: `${getStatusColor(order.status)}15`,
                  color: getStatusColor(order.status),
                  borderRadius: 1
                }} 
              />
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                <LocationOnIcon sx={{ color: '#F44336', fontSize: 20 }} />
                <Box>
                  <Typography variant="body2">{order.delivery.address}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {order.delivery.city}
                  </Typography>
                  <Typography variant="caption" display="block" color="text.secondary">
                    {order.delivery.time}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
    </div>
  );
};