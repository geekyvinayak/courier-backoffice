import React from 'react'
import SubTabNavigator from '../../../components/subTabNavigator'
import LinkBtn from '../../../components/linkBtn'
import FuleSurchargesScheduleGrid from './fuleSurchargesScheduleGrid'

export const FuleSurchargesSchedule = () => {
  return (
    <div className="wraper-container">
      <SubTabNavigator
        data={[
          { lable: "Fuel Surcharges Schedules", url: "/pricelist/fuel-surcharges-schedule" },
          { lable: "Fuel Surcharges Table", url: "/pricelist/fuel-surcharges-table" },
          { lable: "Fuel Prices", url: "/pricelist/fuel-prices" },
          { lable: "Fuel Surcharges Calculator", url: "/pricelist/surcharge-calculator" },
        ]}
      />
      <div>
        <LinkBtn
          label="New Surcharge Schedule"
          url={"/pricelist/fuel-surcharges-schedule/create"}
        />
      </div>
      <FuleSurchargesScheduleGrid />
    </div>
  )
}
