import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "./LoadingAnimation.json";

const LoadingComponent = () => {
  return (
    <div className="text-center my-4">
      <Lottie
        animationData={loadingAnimation}
        loop={true}
        style={{ height: 150, width: 150, margin: "0 auto" }}
      />
      <p className="mt-2">Loading jobs, please wait...</p>
    </div>
  );
};

export default LoadingComponent;
