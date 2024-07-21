import React, { useEffect, useState } from "react";
import { addFavorite, removeFavorite } from "../../store/fav_Service";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { toggleSProfile } from "../../store/profileOpen_service";
import MyComponent from "../../hook/useFetch";
import useFavFlter from "../../hook/useFavFlter";

  const HeroCard = ({ input, isfavBtn,filterInput}) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [removeAnimate, setRemoveAnimate] = useState(null);
  const [heroArr, serHeroArr] = useState([]);
  const [currentArr, setCurrentArr] = useState([]);

  const { data, isError, isLoading, moreHandle } = MyComponent();

  const favArr = useSelector((state) => state.favorites.favArr);
  console.log("FAv",favArr)
  const isProfileOpen = useSelector((state) => state.profileOpen.isProfileOpen);
  const { searchData, searchError, isSearchLoading } = MyComponent(input, {
    skip: !input,
  });
  const {newArray, handleflt }=useFavFlter()
  console.log(searchData)
  const favBtnHandler = (id) => {
    const currentItem = currentArr.find((i) => i.id == id);
    if (currentItem) {
      dispatch(addFavorite(currentItem));
    }
  };

  const removeBtnHandler = async(id) => {
    setRemoveAnimate(id);
    setTimeout(async() => {
      dispatch(removeFavorite(id));
      setRemoveAnimate(null);
    }, 500);
  };

  const moreBtnHandler = (id) => {
    dispatch(toggleSProfile());
    nav(`/${id}`);
  };

  //for not to be same fav add
  useEffect(() => {
    if (data && !heroArr.some((hero) => hero.id === data.id)) {
      serHeroArr((pre) => [...pre, data]);
    }
  }, [data]);

  useEffect(() => {
    if(filterInput){
      handleflt(filterInput);
      setCurrentArr(newArray)
    }else if (searchData?.results) {
      setCurrentArr(searchData.results);
    } else if (isfavBtn && favArr) {
      setCurrentArr(favArr);
    } else if (heroArr) {
      setCurrentArr(heroArr);
    }
  }, [searchData, heroArr, isfavBtn, favArr,filterInput]);

  // isSearchLoading || isLoading 

  if (isSearchLoading || isLoading ) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-yellow-400">
      <div className=" loader"></div>
    </div>
    );
  }

  if ((isError || searchError)) {
    return (
      <div>
        <h1>Error!</h1>
      </div>
    );
  }

  if( currentArr.length===0 ||searchData?.error==="character with given name not found" ){
    return(<>
    <div className="  items-center justify-center w-full h-scree last:flex hidden animate__animated animate__pulse">
    <div className=" flex flex-col ">
      <div className="relative">
        <img src="img/picsvg_download.svg" alt="" />
        <div className=" w-full flex justify-center absolute top-2/3 z-50 marvel-regular-italic">
        {searchData?.error ? <>{searchData?.error}</> : <>
        There is no FAV Hero
        </>}
        </div>
      </div>
    </div>
  </div>
    </>)
  }

  return (
    <>
      <div className="relative h-full w-full">
        <Outlet />
      </div>
      <div
        className={`h-screen overflow-auto ${
          isProfileOpen &&
          "opacity-20 pointer-events-none select-none overscroll-y-none"
        } `}
      >
        <div className="flex flex-wrap justify-start py-4 ">
          {currentArr?.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className="w-full sm:w-1/2 lg:w-1/3 p-2"
            >
              {hoveredItem === item.id ? (
                <div
                  className={`relative animate__animated ${
                    removeAnimate === item.id ? "animate__flipInY" : ""
                  } bg-background h-full`}
                >
                  <img
                    className="h-[200px] w-full object-cover rounded-lg opacity-30"
                    src={item?.image?.url}
                    alt="Cityscape"
                  />
                  <div className="absolute top-0 rounded-lg z-40 flex justify-between items-center w-full h-full">
                    <img
                      className="h-[200px] w-1/3 object-cover rounded-lg"
                      src={item?.image?.url}
                      alt="Cityscape"
                    />
                    <div className="w-2/3 rounded-lg h-full p-2 marvel-bold relative">
                      <ul>
                        <li>Name / {item.name}</li>
                        <li>Publisher / {item.biography.publisher}</li>
                        <li>Race / {item.appearance.race}</li>
                        <li>
                          Place-of-birth / {item.biography["place-of-birth"]}
                        </li>
                        <li>Gender / {item.appearance.gender}</li>
                      </ul>
                      <div className="absolute bottom-0 left-0 flex justify-between w-full items-center px-2 pb-1">
                        <div className="flex justify-between items-center w-full">
                          {favArr.find((i) => i.id === item.id) ? (
                            <button
                              onClick={() => {
                                removeBtnHandler(item.id);
                                console.log(item.id)
                              }}
                              type="button"
                              className="text-yellow-400 bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              onClick={() => favBtnHandler(item.id)}
                              type="button"
                              className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-yellow-900"
                            >
                              Add FAV
                            </button>
                          )}
                          <button
                            onClick={() => moreBtnHandler(item.id)}
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
              ) : (
                <div>
                  <img
                    className="h-[200px] w-full object-cover rounded-lg shadow-lg animate__animated animate__flipInY"
                    src={item?.image?.url}
                    alt="Cityscape"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        {!isfavBtn && !searchData && !filterInput ? (
            <button
              onClick={moreHandle}
              className="bg-gray-700 text-white px-2 py-1 rounded-md"
            >
              More...
            </button>) : <></>
          }
      </div>
    </>
  );
};

export default HeroCard;
