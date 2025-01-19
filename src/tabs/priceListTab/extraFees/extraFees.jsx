import React from 'react'
import { Link } from 'react-router-dom'
import ExtraFeesCreate from './extraFeesCreate'
import ExtraFeesGrid from './extrsFeesGrid'

export const ExtraFees = () => {
  return (
    <div>
        <button><Link to={'/pricelist/extrafees/create'}>Add Extra Fees Type</Link></button>
        <ExtraFeesGrid />
    </div>
  )
}
