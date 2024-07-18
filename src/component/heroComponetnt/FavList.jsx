import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../../store/fav_Service";

const FavList = () => {
    const dispatch = useDispatch();
    const favArr = useSelector((state) => state.favorites.favArr);
    const [removeAnimate, setRemoveAnimate] = useState(null);

    const removeBtnHandler = (id) => {
        setRemoveAnimate(id);
        setTimeout(() => {
            dispatch(removeFavorite(id));
        }, 1000); // delay to allow animation to complete
    };

    return (
        <>
            {favArr.map((item) => (
                <div
                    key={item.id}
                    className={`relative animate__animated ${removeAnimate === item.id ? 'animate__fadeOutLeft' : 'animate__flipInY'} bg-background h-full border-x-2 border-b-2 border-black`}
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
                                <li>Place-of-birth / {item.biography["place-of-birth"]}</li>
                                <li>Gender / {item.appearance.gender}</li>
                            </ul>
                            <div className="absolute bottom-0 left-0 flex justify-between w-full items-center px-2 pb-1">
                                <div className="flex justify-between items-center w-full">
                                    <button
                                        onClick={() => removeBtnHandler(item.id)}
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
        </>
    );
};

export default FavList;
