import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heroprofiledata from "../../component/heroComponetnt/Heroprofiledata";
import { useHerosQuery } from "../../store/service/endpoint/heroEnpint";

const IndexProfile = () => {
  const { id } = useParams();
  console.log(id);
  const { data, isError, isLoading } = useHerosQuery(id);
  const [datapowerstats, setdatapowerstats] = useState(null);

  useEffect(() => {
    if (data && data.powerstats) {
      setdatapowerstats(data.powerstats);
    }
  }, [data]);

  console.log(datapowerstats);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error loading data</h1>;
  }

  return (
    <div>
      {datapowerstats ? <Heroprofiledata datapowerstats={datapowerstats} /> : <h1>No data available</h1>}
    </div>
  );
};

export default IndexProfile;
