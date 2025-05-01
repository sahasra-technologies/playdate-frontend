import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HomePage from "./HomePage";
import BottomOverlay from "../BottomOverlay/BottomOverlay";

function Home () {
    return (
        <div>
           <Navbar/>
           <HomePage/>
           <BottomOverlay/>
        </div>
    )
}
export default Home;