import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsIntro } from "../store/heroSlice";
import { useNavigate } from "react-router-dom";

const Intropage = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { isIntro } = useSelector((state) => state.hero);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setIsIntro(false));
    }, 3000);
  }, [isIntro]);
  useEffect(() => {
    if (!isIntro) {
      nav("/");
    }
  }, [isIntro]);
  return (
    <div className="tracking-in-contract-bck flex border-y-2 border-black justify-center items-center bg-herobackground bg-center  h-screen z-50 ">
    <h1 className="honk text-4xl">SAVE THE WORLD</h1>
  </div>
  );
};

export default Intropage;
