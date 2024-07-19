import React from 'react'
import { useLocation } from 'react-router-dom'
import Heroprofiledata from '../../component/heroComponetnt/Heroprofiledata';

const Biographypage = () => {
  const location= useLocation();
  const data = location.state.data;
  const key = location.state.key;
  const cuuent_data =data[`${key}`];
  const name = location.state.data.name;
  return (
    <div>
      {location && <>
        <Heroprofiledata cuuent_data={cuuent_data} name={name} />
      </>}
    </div>
  )
}

export default Biographypage