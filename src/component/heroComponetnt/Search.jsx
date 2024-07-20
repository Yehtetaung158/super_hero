import React, { useState } from "react";
import MyComponent from "../../hook/useFetch";
import { useDispatch } from "react-redux";

const Search = ({ input }) => {
  const dispatch = useDispatch();
  const { searchData, searchError, isSearchLoading } = MyComponent(input);
  // console.log("search data",searchData, searchError, isSearchLoading);
  const [removeAnimate, setRemoveAnimate] = useState(null);

  const removeBtnHandler = (id) => {
    setRemoveAnimate(id);
    setTimeout(() => {
      dispatch(removeFavorite(id));
    }, 1000); // delay to allow animation to complete
  };

  return (
    <div className=" h-screen bg-red-300">
      {isSearchLoading ? (
        <>Loading...</>
      ) : (
        <>
          {searchError ? (
            <>Error!!</>
          ) : (
            <>
              {searchData?.response === "success" ? (
                <>
                <div className=" md:w-2/3 w-full  z-50 left-0 right-0 top-14 mx-auto">
                  <div className="  items-center justify-center w-full h-scree last:flex hidden animate__animated animate__pulse">
                    <div className=" flex flex-col ">
                      <div className="relative">
                        <img src="img/picsvg_download.svg" alt="" />
                        <div className=" w-full flex justify-center absolute top-2/3 z-50 marvel-regular-italic">
                          There is no FAV Hero
                        </div>
                      </div>
                    </div>
                  </div>
                  {searchData.results.map((i, index) => (
                    // console.log(i)
                    <div
                      key={index}
                      className={`relative animate__animated ${
                        removeAnimate === i.id
                          ? "animate__fadeOutLeft"
                          : "animate__flipInY"
                      } bg-background h-full border-x-2 border-b-2 border-black`}
                    >
                      <img
                        className="h-[200px] w-full object-cover rounded-lg opacity-30"
                        src={i?.image?.url}
                        alt="Cityscape"
                      />
                      <div className="absolute top-0 rounded-lg z-40 flex justify-between items-center w-full h-full">
                        <img
                          className="h-[200px] w-1/3 object-cover rounded-lg"
                          src={i?.image?.url}
                          alt="Cityscape"
                        />
                        <div className="w-2/3 rounded-lg h-full p-2 marvel-bold relative">
                          <ul>
                            <li>Name / {i.name}</li>
                            <li>Publisher / {i.biography.publisher}</li>
                            <li>Race / {i.appearance.race}</li>
                            <li>
                              Place-of-birth / {i.biography["place-of-birth"]}
                            </li>
                            <li>Gender / {i.appearance.gender}</li>
                          </ul>
                          <div className="absolute bottom-0 left-0 flex justify-between w-full items-center px-2 pb-1">
                            <div className="flex justify-between items-center w-full">
                              <button
                                onClick={() => removeBtnHandler(i.id)}
                                type="button"
                                className="text-yellow-400 bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                              >
                                Remove
                              </button>
                              <button
                                type="button"
                                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800 flex gap-1 items-center"
                              >
                                <p>More</p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </>
              ) : (
                <>
                  <h1>Not found for : "{input}"</h1>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
