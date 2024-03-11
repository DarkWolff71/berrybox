import React from "react";
import { SparklesCore } from "./sparkles";

type Props = {
  children?: React.ReactNode;
};

function SparklesFullPageWrapper({ children }: Props) {
  return (
    <div className="min-h-screen relative w-full bg-black flex flex-col  overflow-hidden ">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="absolute">{children}</div>
    </div>
  );
}

export default SparklesFullPageWrapper;
