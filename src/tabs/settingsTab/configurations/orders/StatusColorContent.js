import React, { useEffect } from 'react'
import { getRequest } from '../../../../consts/apiCalls';

const StatusColorContent = () => {
   const fetchParcelTypes = async () => {
      try {
        const response = await getRequest("/order-status-colors");
        console.log("i got this",response)
      } catch (error) {
        console.error("Error fetching parcel types:", error);
      }
    };

    useEffect(() => {
      fetchParcelTypes()
    }, [])
    
  return (
    <div>StatusColorContent</div>
  )
}

export default StatusColorContent