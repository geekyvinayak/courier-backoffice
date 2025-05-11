import React from 'react'
import SubTabNavigator from '../../../components/subTabNavigator'
import LinkBtn from '../../../components/linkBtn'
import FuleSurchargesCalculatorGrid from './fuleSurchargesCalculatorGrid'

export const FuleSurchargesCalculator = () => {
  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          { lable: "Fule Surcharges Schedules", url: "/pricelist/extrafeesschedule" },
          { lable: "Fule Surcharges Table", url: "/pricelist/extrafees" },
          { lable: "Fule Prices", url: "/pricelist/extrafees" },
          { lable: "Fule Surcharges Calculator", url: "/pricelist/surcharge-calculator" },
        ]}
      />
      <div>
        <LinkBtn
          label="New Calculator"
          url={"/pricelist/surcharge-calculator/create"}
        />
      </div>
      <FuleSurchargesCalculatorGrid />
    </div>
  )
}
