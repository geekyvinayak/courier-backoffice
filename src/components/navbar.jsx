import React from 'react'
import { IconButton ,useTheme} from '@mui/material'
import { useContext } from 'react'
import { ColorModeContext , tokens } from '../theme'
import { InputBase } from '@mui/material'
import { DarkModeOutlined, LightModeOutlined, PersonOutline ,ArrowForwardOutlined} from '@mui/icons-material'

const Navbar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

  return (
    <div className='flex justify-between p-2 items-center border-b-2'>
        <div>
            DASHBOARD
        </div>
        <div className='flex'>
        <div className={`flex bg-[${colors.primary[400]}] border-2`} >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Order Id" />
        <IconButton type="button" sx={{backgroundColor:colors.blueAccent[500], borderRadius:0}} classes='bg-red-400' cl>
          <ArrowForwardOutlined color='red'/>
        </IconButton>
      </div>
        <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode ==='light'?<LightModeOutlined />:<DarkModeOutlined />}
        </IconButton>
        <IconButton>
            <PersonOutline />
        </IconButton>
        </div>
    </div>
  )
}

export default Navbar