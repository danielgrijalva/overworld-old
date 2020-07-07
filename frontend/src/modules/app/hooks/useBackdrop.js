import React, { useEffect } from "react";
import {
  Backdrop as BackdropElement,
  Footer,
  BackdropFrom
} from "../components/";
import { getBackdrop } from "../../landing/actions";
import { useSelector, useDispatch } from "react-redux";
import { Backdrops as options } from "../../landing/utils";

const UseBackdrop = params => {
  const { backdrop } = useSelector(state => state.landing);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(backdrop).length === 0) {
      const game = options[Math.floor(Math.random() * options.length)];
      dispatch(getBackdrop(game.gameId));
    }
  });

  const Backdrop = props => (
    <>
      {Object.keys(backdrop).length > 0 && (
        <BackdropElement
          imageId={backdrop.imageId}
          position={params ? params.position : false}
        />
      )}
      {props.children}
      <BackdropFrom
        backdrop={backdrop}
        position={params ? params.position : false}
      />
      <Footer />
    </>
  );

  return { Backdrop };
};

export default UseBackdrop;
