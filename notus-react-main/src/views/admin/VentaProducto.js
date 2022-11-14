import React from "react";

// components

import CardVenta from "components/Cards/CardVenta.js";
import CardProfile from "components/Cards/CardProfile.js";

export default function VentaProducto() {
  return (
    <>-
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/15 px-4">
          <CardVenta />
        </div>
        
      </div>
    </>
  );
}



/*
<div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
*/