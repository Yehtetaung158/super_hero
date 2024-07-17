import React, { useEffect, useState } from 'react';
import { useHerosQuery } from "../store/service/endpoint/heroEnpint";
import { data } from 'autoprefixer';

const MyComponent = () => {
    const [heroId,setHeriId]=useState(1)
    const [moreHeroFetch,setmoreHeroFetch]=useState(10)
    // Fetch data with the custom hook
    const { data, isError, isLoading } = useHerosQuery(heroId);

    // Effect hook to perform actions when data is available
    useEffect(() => {
        if (data && heroId < moreHeroFetch) {
            setHeriId(pre => pre+1);
        }
    }, [data,moreHeroFetch]); 

    const moreHandle=()=>{
        setmoreHeroFetch(pre=> pre+10)
    }
    
    // Dependency array to run the effect when `data` changes

    return {data,isError,isLoading,moreHandle}
};


export default MyComponent;
