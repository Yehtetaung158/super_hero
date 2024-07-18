import React from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { useHerosQuery } from "../store/service/endpoint/heroEnpint";

const HeroProfile = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useHerosQuery(id);
  // console.log(data, isError, isLoading);
  const loaction=useLocation();
  console.log(loaction)
  return (
    <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-light-blue-400 p-2 border-2 border-black  rounded-sm  z-50 w-5/6 h-3/4 min-h-72 bg-background">
      <button className="absolute top-2 right-2 w-6">
        {/* <img src="img\x-40.svg" alt="" /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
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
                        src={data?.image?.url}
                        alt=""
                      />
                    </div>
                    <div>
                      <ul className=" my-2 py-1 mx-2 px-2 bg-gray-400">
                        {Object.keys(data).map(
                          (key) =>
                            key !== "id" &&
                            key !== "name" &&
                            key !== "response" &&
                            key !== "image" && (
                              <NavLink
                                key={key}
                                state={{ data, key }}
                                className={`w-full flex `}
                                to={`/${id}/${key}`}
                              >
                                {key}
                              </NavLink>
                            )
                        )}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <Outlet />
                  </div>
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
