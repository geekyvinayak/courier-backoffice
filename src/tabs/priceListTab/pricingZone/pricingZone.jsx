import React from 'react'
import SubTabNavigator from '../../../components/subTabNavigator'
import LinkBtn from '../../../components/linkBtn'

const PricingZone = () => {
  return (
    <div className="ml-2">
    <SubTabNavigator
      data={[
        { lable: "Zone", url: "/pricelist/pricingzones" },
        {
          lable: "Zone Layout",
          url: "/pricelist/pricingzoneslayout",
        },
      ]}
    />
    
  </div>
  )
}

export default PricingZone