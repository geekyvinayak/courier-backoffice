import React from 'react'
import { Link } from 'react-router-dom'
import PriceListGrid from './priceListGrid'

const PriceList = () => {
  return (
    <div>
      <div>
        <button><Link to={'/pricelist/create'}>Add New</Link></button>
      </div>
      <div>
        <PriceListGrid />
      </div>
    </div>
  )
}

export default PriceList