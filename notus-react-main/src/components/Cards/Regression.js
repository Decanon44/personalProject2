import React from "react";

// components

import CardLineChartReg from "./CardLineChartReg";
//import CardPageVisits from "components/Cards/CardPageVisits.js";
//import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

export default function Regression() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChartReg />
        </div>
      </div>
    </>
  );
}

/*
<div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        
      </div>
<div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
*/
