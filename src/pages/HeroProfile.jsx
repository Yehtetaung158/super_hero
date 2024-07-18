import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useHerosQuery } from "../store/service/endpoint/heroEnpint";

const HeroProfile = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useHerosQuery(id);
  console.log(data, isError, isLoading);
  return (
    <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-light-blue-400 p-2 border-2 border-black  rounded-sm  z-50 w-5/6 h-3/4 bg-background">
      <button className="absolute top-2 right-2 w-6">
        <img src="img\x-40.svg" alt="" />
      </button>

      {isLoading ? (
        <>
          <h1>Loading</h1>
        </>
      ) : (
        <>
          {isError ? (
            <>
              {" "}
              <h1>Error</h1>
            </>
          ) : (
            <>
              {" "}
              {data && (
                <div className=" h-full flex gap-2">
                  <div className=" h-full w-1/3 bg-slate-500">
                    <div className="h-1/3 w-full">
                      <img
                        className="h-full mx-auto "
                        src={data.image.url}
                        alt=""
                      />
                    </div>
                    <div>
                      <ul>
                        {Object.keys(data).map(
                          (key) =>
                            key !== "id" &&
                            key !== "image" && (
                              <li key={key} className=" bg-yellow-100 w-full">
                                {<NavLink className={`bg-red-200 w-full`} to={`/${id}/${key}`}>{key}</NavLink>}
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                  </div>
                  <div><Outlet/></div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HeroProfile;
