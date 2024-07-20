import React, { useEffect, useState } from "react";
import "animate.css";
import MyComponent from "../hook/useFetch";
import HeroCard from "../component/heroComponetnt/HeroCard";
import FavList from "../component/heroComponetnt/FavList";
import { useSelector } from "react-redux";
import Search from "../component/heroComponetnt/Search";

const Homepage = () => {
  const favArr = useSelector((state) => state.favorites.favArr);
  const [heroArr, serHeroArr] = useState([]);
  const [isfavBtn, setisFavBtn] = useState(false);
  const { data, isError, isLoading, moreHandle } = MyComponent();
  const isProfileOpen = useSelector((state) => state.profileOpen.isProfileOpen);
  // for search
  const [input, setInput] = useState("");
  const inputChangehandler = (e) => {
    setInput(e.target.value);
  };
  const [isSearch, setIsSearch] = useState(false);
  const { searchData, searchError, isSearchLoading } = MyComponent(input);
  // console.log("search data",searchData, searchError, isSearchLoading);
  // const [removeAnimate, setRemoveAnimate] = useState(null);
  // console.log("searchData",isSearchLoading,searchData,searchError)
  console.log("data", data, isLoading);

  const heroSearchSubmithandler = async (e) => {
    e.preventDefault();
    console.log(input);
    setIsSearch(!isSearch);
  };

  useEffect(() => {
    if (data && !heroArr.some((hero) => hero.id === data.id)) {
      serHeroArr((pre) => [...pre, data]);
    }
  }, [data]);

  return (
    <div className={`${isProfileOpen && "fixed"} `}>
      <div className=" relative">
        <div className=" fixed top-0 left-0 right-0 bg-background h-screen -z-10"></div>
        {/* cover photo */}
        <div className="  flex border-y-2 border-black justify-center items-center bg-herobackground bg-center h-1/5 z-50 ">
          <h1 className=" honk text-4xl">SAVE THE WORLD</h1>
        </div>
        {/* body  */}
        <div className=" relative border-2 border-black border-t-0 max-full lg:w-2/3 md:w-3/4 mx-auto">
          {/* search bar */}
          <div className="sticky top-0 z-50 border-b-2 border-black bg-gray-400 flex justify-between px-2 py-2">
            {isSearch ? (
              <>
                <div className=" flex items-center justify-between px-2 py-1 rounded-md bg-white">
                  <input readOnly value={`Result for : ${input}`} type="text" />
                  <button
                    onClick={() => {
                      setIsSearch(false);
                      setInput("");
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
              </>
            ) : (
              <>
                <form onSubmit={heroSearchSubmithandler} className="">
                  <div className=" flex items-center justify-between px-2 py-1 rounded-md bg-white">
                    <input
                      name="input"
                      value={input}
                      onChange={inputChangehandler}
                      type="text"
                      className="focus:outline-none focus:ring-0 focus:border-none"
                      placeholder="Search Hearo"
                      required
                    />
                    <button type="submit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 80 80"
                        className=" size-8"
                      >
                        <path d="M 50 7 C 37.308594 7 27 17.308594 27 30 C 27 35.09375 28.664063 39.800781 31.472656 43.613281 L 27.226563 47.859375 C 26.886719 47.734375 26.53125 47.660156 26.171875 47.660156 C 25.402344 47.660156 24.632813 47.953125 24.050781 48.535156 L 7.878906 64.707031 C 6.714844 65.871094 6.714844 67.785156 7.878906 68.949219 L 11.050781 72.121094 C 12.214844 73.285156 14.128906 73.285156 15.292969 72.121094 L 31.464844 55.949219 C 32.316406 55.097656 32.539063 53.84375 32.140625 52.773438 L 36.386719 48.527344 C 40.199219 51.335938 44.90625 53 50 53 C 62.691406 53 73 42.691406 73 30 C 73 17.308594 62.691406 7 50 7 Z M 50 9 C 61.609375 9 71 18.390625 71 30 C 71 41.609375 61.609375 51 50 51 C 38.390625 51 29 41.609375 29 30 C 29 18.390625 38.390625 9 50 9 Z M 50 11 C 49.449219 11 49 11.449219 49 12 C 49 12.550781 49.449219 13 50 13 C 50.550781 13 51 12.550781 51 12 C 51 11.449219 50.550781 11 50 11 Z M 45.347656 11.613281 C 45.324219 11.613281 45.300781 11.613281 45.28125 11.613281 C 45.210938 11.621094 45.148438 11.628906 45.082031 11.648438 C 44.546875 11.792969 44.230469 12.339844 44.375 12.875 C 44.519531 13.40625 45.066406 13.722656 45.597656 13.578125 C 46.132813 13.4375 46.449219 12.890625 46.308594 12.355469 C 46.191406 11.921875 45.800781 11.617188 45.347656 11.613281 Z M 54.652344 11.613281 C 54.203125 11.617188 53.808594 11.921875 53.691406 12.355469 C 53.550781 12.890625 53.867188 13.4375 54.402344 13.578125 C 54.933594 13.722656 55.480469 13.40625 55.625 12.875 C 55.769531 12.339844 55.453125 11.792969 54.917969 11.648438 C 54.832031 11.625 54.742188 11.613281 54.652344 11.613281 Z M 40.976563 13.410156 C 40.808594 13.414063 40.644531 13.460938 40.5 13.546875 C 40.269531 13.675781 40.101563 13.894531 40.03125 14.152344 C 39.964844 14.410156 40 14.683594 40.132813 14.910156 C 40.265625 15.140625 40.484375 15.308594 40.742188 15.378906 C 40.996094 15.445313 41.269531 15.410156 41.5 15.277344 C 41.976563 15 42.140625 14.390625 41.863281 13.910156 C 41.683594 13.59375 41.34375 13.402344 40.976563 13.410156 Z M 58.953125 13.414063 C 58.613281 13.429688 58.304688 13.617188 58.132813 13.914063 C 57.855469 14.390625 58.023438 15.003906 58.5 15.28125 C 58.976563 15.554688 59.589844 15.390625 59.863281 14.914063 C 60 14.683594 60.035156 14.410156 59.964844 14.15625 C 59.898438 13.898438 59.730469 13.679688 59.5 13.546875 C 59.335938 13.449219 59.144531 13.40625 58.953125 13.414063 Z M 37.285156 16.269531 C 37.015625 16.269531 36.753906 16.375 36.5625 16.5625 C 36.175781 16.953125 36.175781 17.589844 36.5625 17.980469 C 36.953125 18.367188 37.589844 18.367188 37.980469 17.980469 C 38.367188 17.589844 38.367188 16.953125 37.980469 16.5625 C 37.792969 16.378906 37.546875 16.273438 37.285156 16.269531 Z M 62.742188 16.269531 C 62.472656 16.265625 62.210938 16.371094 62.019531 16.5625 C 61.628906 16.953125 61.628906 17.589844 62.019531 17.980469 C 62.410156 18.367188 63.042969 18.367188 63.433594 17.980469 C 63.824219 17.589844 63.824219 16.953125 63.433594 16.5625 C 63.25 16.378906 63.003906 16.277344 62.742188 16.269531 Z M 65.5625 20 C 65.394531 20.003906 65.230469 20.050781 65.085938 20.136719 C 64.609375 20.410156 64.445313 21.023438 64.71875 21.5 C 64.996094 21.976563 65.609375 22.140625 66.085938 21.863281 C 66.5625 21.589844 66.730469 20.976563 66.453125 20.5 C 66.269531 20.183594 65.929688 19.992188 65.5625 20 Z M 34.363281 20 C 34.027344 20.019531 33.71875 20.207031 33.546875 20.5 C 33.269531 20.976563 33.433594 21.589844 33.910156 21.863281 C 34.390625 22.140625 35 21.976563 35.277344 21.5 C 35.554688 21.023438 35.390625 20.410156 34.910156 20.136719 C 34.746094 20.039063 34.554688 19.992188 34.363281 20 Z M 32.605469 24.34375 C 32.152344 24.347656 31.761719 24.648438 31.644531 25.082031 C 31.503906 25.617188 31.820313 26.164063 32.355469 26.308594 C 32.886719 26.453125 33.433594 26.136719 33.578125 25.601563 C 33.722656 25.066406 33.40625 24.519531 32.871094 24.375 C 32.785156 24.351563 32.695313 24.339844 32.605469 24.34375 Z M 67.394531 24.34375 C 67.371094 24.339844 67.347656 24.34375 67.324219 24.34375 C 67.257813 24.347656 67.191406 24.359375 67.125 24.375 C 66.59375 24.519531 66.277344 25.066406 66.421875 25.601563 C 66.5625 26.136719 67.109375 26.453125 67.644531 26.308594 C 67.902344 26.242188 68.121094 26.074219 68.253906 25.84375 C 68.386719 25.613281 68.421875 25.339844 68.355469 25.082031 C 68.238281 24.648438 67.847656 24.347656 67.394531 24.34375 Z M 32 29 C 31.449219 29 31 29.449219 31 30 C 31 30.550781 31.449219 31 32 31 C 32.550781 31 33 30.550781 33 30 C 33 29.449219 32.550781 29 32 29 Z M 68 29 C 67.449219 29 67 29.449219 67 30 C 67 30.550781 67.449219 31 68 31 C 68.550781 31 69 30.550781 69 30 C 69 29.449219 68.550781 29 68 29 Z M 32.652344 33.660156 C 32.550781 33.65625 32.449219 33.667969 32.355469 33.691406 C 31.820313 33.835938 31.503906 34.382813 31.644531 34.917969 C 31.789063 35.453125 32.335938 35.769531 32.871094 35.625 C 33.40625 35.480469 33.722656 34.933594 33.578125 34.402344 C 33.464844 33.976563 33.089844 33.675781 32.652344 33.660156 Z M 67.375 33.660156 C 66.925781 33.664063 66.535156 33.96875 66.421875 34.402344 C 66.351563 34.660156 66.386719 34.933594 66.519531 35.160156 C 66.652344 35.390625 66.871094 35.558594 67.128906 35.625 C 67.664063 35.769531 68.210938 35.453125 68.355469 34.921875 C 68.496094 34.386719 68.179688 33.839844 67.644531 33.695313 C 67.558594 33.671875 67.46875 33.660156 67.375 33.660156 Z M 34.386719 38 C 34.21875 38.003906 34.058594 38.050781 33.910156 38.132813 C 33.683594 38.265625 33.515625 38.484375 33.445313 38.742188 C 33.375 38.996094 33.410156 39.269531 33.546875 39.5 C 33.675781 39.730469 33.894531 39.898438 34.152344 39.964844 C 34.410156 40.035156 34.683594 40 34.910156 39.863281 C 35.390625 39.589844 35.554688 38.976563 35.277344 38.5 C 35.09375 38.183594 34.753906 37.992188 34.386719 38 Z M 65.542969 38.003906 C 65.199219 38.019531 64.890625 38.207031 64.71875 38.5 C 64.585938 38.730469 64.550781 39.003906 64.621094 39.261719 C 64.691406 39.519531 64.859375 39.738281 65.089844 39.871094 C 65.566406 40.144531 66.175781 39.980469 66.453125 39.5 C 66.730469 39.023438 66.566406 38.414063 66.089844 38.136719 C 65.921875 38.039063 65.730469 37.996094 65.542969 38.003906 Z M 37.285156 41.730469 C 37.015625 41.726563 36.753906 41.832031 36.5625 42.019531 C 36.175781 42.410156 36.175781 43.046875 36.5625 43.4375 C 36.953125 43.824219 37.589844 43.824219 37.980469 43.4375 C 38.367188 43.046875 38.367188 42.410156 37.980469 42.019531 C 37.792969 41.835938 37.546875 41.730469 37.285156 41.730469 Z M 62.742188 41.730469 C 62.472656 41.722656 62.210938 41.828125 62.019531 42.019531 C 61.628906 42.410156 61.628906 43.046875 62.019531 43.4375 C 62.410156 43.824219 63.042969 43.824219 63.433594 43.4375 C 63.824219 43.046875 63.824219 42.410156 63.433594 42.019531 C 63.25 41.835938 63.003906 41.734375 62.742188 41.730469 Z M 58.972656 44.589844 C 58.808594 44.589844 58.644531 44.636719 58.5 44.71875 C 58.019531 44.996094 57.855469 45.609375 58.132813 46.085938 C 58.410156 46.5625 59.019531 46.730469 59.5 46.453125 C 59.726563 46.320313 59.894531 46.101563 59.964844 45.84375 C 60.035156 45.589844 60 45.316406 59.863281 45.085938 C 59.683594 44.769531 59.339844 44.578125 58.972656 44.589844 Z M 40.953125 44.589844 C 40.609375 44.605469 40.300781 44.792969 40.132813 45.089844 C 39.855469 45.566406 40.019531 46.179688 40.5 46.453125 C 40.726563 46.589844 41 46.625 41.257813 46.554688 C 41.515625 46.488281 41.734375 46.320313 41.863281 46.089844 C 42 45.859375 42.035156 45.585938 41.964844 45.332031 C 41.894531 45.074219 41.726563 44.855469 41.5 44.722656 C 41.332031 44.625 41.140625 44.582031 40.953125 44.589844 Z M 32.734375 45.179688 C 33.386719 45.917969 34.082031 46.613281 34.820313 47.265625 L 30.921875 51.164063 L 28.835938 49.078125 Z M 45.332031 46.390625 C 44.882813 46.394531 44.492188 46.695313 44.375 47.128906 C 44.230469 47.664063 44.546875 48.210938 45.082031 48.355469 C 45.617188 48.5 46.164063 48.183594 46.308594 47.648438 C 46.375 47.390625 46.339844 47.117188 46.207031 46.886719 C 46.074219 46.660156 45.855469 46.492188 45.597656 46.421875 C 45.511719 46.398438 45.421875 46.386719 45.332031 46.390625 Z M 54.699219 46.390625 C 54.597656 46.386719 54.496094 46.394531 54.402344 46.421875 C 53.867188 46.566406 53.550781 47.113281 53.691406 47.644531 C 53.835938 48.179688 54.382813 48.496094 54.917969 48.355469 C 55.453125 48.210938 55.769531 47.664063 55.625 47.128906 C 55.511719 46.707031 55.136719 46.40625 54.699219 46.390625 Z M 50 47 C 49.449219 47 49 47.449219 49 48 C 49 48.550781 49.449219 49 50 49 C 50.550781 49 51 48.550781 51 48 C 51 47.449219 50.550781 47 50 47 Z M 26.171875 49.652344 C 26.425781 49.652344 26.675781 49.75 26.875 49.949219 L 30.050781 53.121094 C 30.449219 53.519531 30.449219 54.136719 30.050781 54.535156 L 13.878906 70.707031 C 13.480469 71.105469 12.863281 71.105469 12.464844 70.707031 L 9.292969 67.535156 C 8.894531 67.136719 8.894531 66.519531 9.292969 66.121094 L 11 64.414063 L 13.292969 66.707031 L 14.707031 65.292969 L 12.414063 63 L 14 61.414063 L 16.292969 63.707031 L 17.707031 62.292969 L 15.414063 60 L 17 58.414063 L 19.292969 60.707031 L 20.707031 59.292969 L 18.414063 57 L 20 55.414063 L 22.292969 57.707031 L 23.707031 56.292969 L 21.414063 54 L 23 52.414063 L 25.292969 54.707031 L 26.707031 53.292969 L 24.414063 51 L 25.464844 49.949219 C 25.664063 49.75 25.917969 49.652344 26.171875 49.652344 Z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </>
            )}
            {/* fav btn  */}
            <button
              onClick={async () => {
                setisFavBtn(!isfavBtn);
                setIsSearch(false);
                setInput("");
              }}
              className=" relative bg-gray-700 text-white px-2 py-1 rounded-md"
            >
              {isfavBtn ? (
                <p>HOME</p>
              ) : (
                <>
                  {" "}
                  <p className=" absolute bg-red-400 px-2 rounded-full -right-2 -top-2">
                    {favArr.length}
                  </p>{" "}
                  <p>Favorite</p>
                </>
              )}
            </button>
          </div>

          {isfavBtn ? (
            <div className=" md:w-2/3 w-full  z-50 left-0 right-0 top-14 mx-auto">
              <FavList />
            </div>
          ) : (
            <>
              {isSearch && searchData?.results ? (
                // <><h1>searchData.response</h1></>
                <>
                  {
                    <HeroCard
                      searchData={searchData.results}
                      searchError={searchError}
                      isSearchLoading={isSearchLoading}
                    />
                  }
                </>
              ) : (
                <>
                  {data && (
                    <div
                      className={`${
                        isfavBtn && "opacity-15 pointer-events-none"
                      } `}
                    >
                      <HeroCard heroArr={heroArr} moreHandle={moreHandle} />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>

        <nav aria-label="Page navigation example z-20">
          <ul className="flex items-center -space-x-px h-10 text-base">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-3 h-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 1 1 5l4 4"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="z-10 flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-3 h-3 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Homepage;
