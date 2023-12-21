import React from 'react'

const page = ({params}:any) => {
  return (
    <div>Hello {params.id} </div>
  )
}

export default page