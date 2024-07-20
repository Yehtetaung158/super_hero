import React, { useEffect, useState } from "react";
import {
  useHeroSearchQuery,
  useHerosQuery,
} from "../store/service/endpoint/heroEnpint";

const MyComponent = (heroInput) => {
  const [heroId, setHeriId] = useState(1);
  const [moreHeroFetch, setmoreHeroFetch] = useState(10);
  const [heroName, setHeroName] = useState(null);

  const { data, isError, isLoading } = useHerosQuery(heroId);
  const {
    data: searchData,
    isError: searchError,
    isLoading: isSearchLoading,
  } = useHeroSearchQuery(heroName, { skip: !heroName });

  useEffect(() => {
    if (heroInput) {
      setHeroName(heroInput);
    }
  }, [heroInput]);

  useEffect(() => {
    if (data && heroId < moreHeroFetch) {
      setHeriId((pre) => pre + 1);
    }
  }, [data, moreHeroFetch]);

  const moreHandle = () => {
    setmoreHeroFetch((pre) => pre + 10);
  };

  return {
    data,
    isError,
    isLoading,
    moreHandle,
    searchData,
    searchError,
    isSearchLoading,
  };
};

export default MyComponent;
