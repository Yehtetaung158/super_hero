import React from 'react'
import { useLocation} from 'react-router-dom'
import Heroprofiledata from '../../component/heroComponetnt/Heroprofiledata';

const Appearancepage = () => {
  const location=useLocation();
  return (
    <div>
      {location && <>
        <Heroprofiledata location={location}/>
      </>}
    </div>
  )
}

export default Appearancepage