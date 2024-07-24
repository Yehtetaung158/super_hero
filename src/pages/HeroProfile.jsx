import React from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useHerosQuery } from "../store/service/endpoint/heroEnpint";
import { useDispatch } from "react-redux";
import { toggleSProfile } from "../store/profileOpen_service";

const HeroProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { data, isError, isLoading } = useHerosQuery(id);

  const outBtnHandler = () => {
    dispatch(toggleSProfile());
    nav("/");
  };

  return (
    <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-light-blue-400 p-2 border-2 border-black  rounded-sm  z-50 w-5/6 h-3/4 min-h-72 bg-background">
      <button
        onClick={outBtnHandler}
        className="absolute top-2 right-2 w-6 z-40"
      >
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
          <div className="flex items-center justify-center h-full w-full bg-yellow-400">
            <div className="loader"></div>
          </div>
        </>
      ) : (
        <>
          {isError ? (
            <>
              {" "}
              <div className="flex items-center justify-center h-full w-full bg-yellow-400">
                <div>Somethinf is wrong!</div>
              </div>
            </>
          ) : (
            <>
              {" "}
              {data && (
                <div className=" h-full flex gap-2 max-w-4/5">
                  <div className="w-full flex flex-col justify-between gap-2">
                    <div className=" flex gap-2 h-1/3">
                      <img className="rounded-t-lg" src={data?.image?.url} />
                      <div className=" w-1/2">
                        {data && (
                          <>
                            <ul className=" my-2 py-1 mx-2 px-2">
                              <NavLink className={`w-full flex`} state={{ data }} to={`/${data.id}`} end>
                                Powerstats
                              </NavLink>
                              {Object.keys(data).map(
                                (key) =>
                                  key !== "id" &&
                                  key !== "name" &&
                                  key !== "response" &&
                                  key !== "image" &&
                                  key !== "powerstats" && (
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
                          </>
                        )}
                      </div>
                    </div>
                    <div className="p-5 h-2/3">
                      <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                        {data?.name}
                      </h5>
                      <div className="  h-5/6  overflow-auto">
                        <Outlet />
                      </div>
                    </div>
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
