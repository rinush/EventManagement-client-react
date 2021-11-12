import React from "react";
import PrimarySearchAppBar from "./utils/navBar"
import CarouselComp from "./landing-page/carouselComp";
import Recommendations from "./landing-page/recommendations";

const Home= ()=> {

    return(
        <div>
            <PrimarySearchAppBar/>
            <CarouselComp/>
            <Recommendations/>
        </div>
        )
}

export default Home;
