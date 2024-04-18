import React from 'react'
import portal from '../assets/images/portal.gif'

export const PortalLoading = () => {
  return (
    <div className="p-10 flex items-center justify-center">
      <img src={portal} className="w-[160px] h-[160px]" alt="loading" />
    </div>
  )
}
