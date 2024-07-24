// src/pages/Homepage.jsx
import React, { useEffect } from "react";
import "animate.css";
import HeroCard from "../component/heroComponetnt/HeroCard";
import { useSelector, useDispatch } from "react-redux";
import MyComponent from "../hook/useFetch";
import {
  setIsFavBtn,
  setInput,
  setFilterInput,
  setIsSearch,
} from "../store/heroSlice";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { isfavBtn, input, filterInput, isSearch, isIntro } = useSelector(
    (state) => state.hero
  );
  const favArr = useSelector((state) => state.favorites.favArr);
  const isProfileOpen = useSelector((state) => state.profileOpen.isProfileOpen);
  const {
    searchData,
    moreHandle,
    data,
    searchError,
    isError,
    isLoading,
    isSearchLoading,
  } = MyComponent(input);
  console.log(searchError, isError, isLoading, isSearchLoading);

  const resultsCount = searchData?.results?.length || 0;
  const message = `Result for (${
    resultsCount > 0 ? resultsCount : "0"
  }) : ${input}`;

  useEffect(() => {
    if (isIntro) {
      nav("/intro");
    }
  }),
    [isIntro];

  return (
    <div className={`${isProfileOpen && "fixed"} `}>
      <div className="relative w-full ">
        <div className="fixed top-0 left-0 right-0 bg-yellow-500 h-screen -z-10"></div>
        <div className="tracking-in-contract-bck flex border-y-2 border-black justify-center items-center bg-herobackground bg-center h-1/6 z-50 ">
          <h1 className="honk text-4xl">SAVE THE WORLD</h1>
        </div>

        <div className="max-full lg:w-2/3 md:w-3/4 mx-auto h-full z-20">
          <div className="sticky top-0 z-50 border-b-2 border-black bg-gray-400 flex justify-between px-2 py-2">
            {!isfavBtn ? (
              <>
                {isSearch ? (
                  <div className="flex items-center justify-between px-2 py-1 rounded-md bg-white">
                    <input readOnly value={message} type="text" />
                    <button
                      onClick={() => {
                        dispatch(setIsSearch(false));
                        dispatch(setInput(""));
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      dispatch(setIsSearch(true));
                    }}
                    className=""
                  >
                    <div className="flex items-center justify-between px-2 py-1 rounded-md bg-white">
                      <input
                        name="input"
                        value={input}
                        onChange={(e) => {
                          dispatch(setInput(e.target.value));
                        }}
                        type="text"
                        className="focus:outline-none focus:ring-0 focus:border-none"
                        placeholder="Search Hero"
                        required
                      />
                      <button type="submit">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              <form className="">
                <div className="flex items-center justify-between px-2 py-1 rounded-md bg-white">
                  <input
                    name="input"
                    value={filterInput}
                    onChange={(e) => dispatch(setFilterInput(e.target.value))}
                    type="text"
                    className="focus:outline-none focus:ring-0 focus:border-none"
                    placeholder="Search Hero"
                    required
                  />
                  {filterInput !== "" ? (
                    <button onClick={() => dispatch(setFilterInput(""))}>
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
                  ) : (
                    <button type="submit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </form>
            )}
            <button
              onClick={async () => {
                dispatch(setIsFavBtn(!isfavBtn));
                dispatch(setIsSearch(false));
                dispatch(setInput(""));
              }}
              className="cardbg hvr-bounce-in relative bg-gray-700 text-white px-2 py-1 rounded-md"
            >
              {isfavBtn ? (
                <p>HOME</p>
              ) : (
                <>
                  <p className="absolute bg-red-400 px-2 rounded-full -right-2 -top-2">
                    {favArr.length}
                  </p>
                  <p>Favorite</p>
                </>
              )}
            </button>
          </div>

          <div className="w-full z-30 bg-gray-300">
            {isLoading || isSearchLoading ? (
              <HeroCard />
            ) : isError || searchError ? (
              <HeroCard />
            ) : filterInput ? (
              <HeroCard />
            ) : isfavBtn ? (
              <HeroCard />
            ) : isSearch ? (
              <HeroCard searchData={searchData} />
            ) : (
              data && <HeroCard data={data} />
            )}
          </div>

          <div className="sticky top-0 z-50 border-b-2 border-black bg-gray-400 flex justify-between px-2 py-2">
            {!filterInput && !isfavBtn && !isSearch && (
              <>
                <button
                  onClick={() => moreHandle()}
                  className="bg-gray-700 text-white px-2 py-1 rounded-md"
                >
                  More...
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
