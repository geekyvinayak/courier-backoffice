import React from 'react'
import NewPrice from './newPrice'
import { Link } from 'react-router-dom'

const Price = () => {
  return (
    <div>
        <button><Link to={'/pricelist/create'}>Add New</Link></button>
    </div>
  )
}

export default Price