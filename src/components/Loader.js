import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
  return (
    <Spinner
        animation='border' 
        role='status' 
        variant='secondary'
        style={{
            height:'200px',
            width:'200px',
            margin:'auto',
            display:'block'
        }}
    
    >
        <span className='sr-only'> Cargando nuestros productos...</span>
        
    </Spinner>
  )
}

export default Loader