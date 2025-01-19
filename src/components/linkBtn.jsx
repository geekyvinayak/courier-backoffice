import { Button, Stack, useTheme } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { tokens } from '../theme';

const LinkBtn = ({label='',url='/' ,size='large',filled=true}) => {
   const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    console.log(colors)
    const handleNavigation = (link) => {
      navigate(link);
    };

  return (
    <Stack spacing={2} direction="row">
  <Button
  size={size}
  sx={{
    border: '2px solid white', // Red border (you can change the color)
    backgroundColor: 'white',
    '&:hover': {
      // backgroundColor: colors.blueAccent[500], // Light red on hover
      border: `2px solid #1569CB`,
    },
    '&.active': {
      backgroundColor: '#1569CB', // Solid red when active
      color: 'white',
      border: `2px solid #1569CB`,
    }
  }}
  className={`px-4 py-2 font-semibold rounded shadow focus:outline-none focus:ring ${
    window.location.pathname.includes(url) ? 'active' : ''
  } ${filled? 'active':''}`}
  onClick={() => handleNavigation(url)}
>
  {label}
 </Button>
    </Stack>
  )
}


export default LinkBtn