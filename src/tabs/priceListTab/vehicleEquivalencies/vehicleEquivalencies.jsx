import React from 'react'
import SubTabNavigator from '../../../components/subTabNavigator'
import LinkBtn from '../../../components/linkBtn'
import VehicleEquivalenciesGrid from './vehicleEquivalenciesGrid'

const VehicleEquivalencies = () => {
  return (
    <>
    <SubTabNavigator data={[{lable:"Vehicle Types",url:'/pricelist/vehiclestype'},{lable:"Vehicle Equivalencies",url:'/pricelist/vehicleequivalencies'}]} />
    <div className='ml-4' >
    <LinkBtn label='New Vehicle Equivalency' url={'/pricelist/vehicleequivalencies/create'}/>
    </div>
    <VehicleEquivalenciesGrid />
    </>
  )
}

export default VehicleEquivalencies