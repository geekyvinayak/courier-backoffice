import React from 'react'
import ExtraFeesScheduleGrid from './extraFeesScheduleGrid'
import { Link } from 'react-router-dom'

export const ExtraFeesSchedule = () => {
  return (
    <div>
        <button><Link to={'/pricelist/extrafeesschedule/create'}>New Schedule</Link></button>
        <ExtraFeesScheduleGrid />
    </div>
  )
}
