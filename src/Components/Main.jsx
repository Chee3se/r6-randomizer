import Randomizer from "../Sections/Randomizer";
import Operators from "../Sections/Operators";
import React from "react";

export default function Main() {
    return (
        <div className="sections flex overflow-x-auto snap-x snap-mandatory h-screen">
            <div id="operators" className="flex-shrink-0 w-full h-full flex items-center justify-center">
                <Operators/>
            </div>
            <div id="randomizer" className="flex-shrink-0 w-full h-full flex items-center justify-center">
                <Randomizer/>
            </div>
        </div>
    );
}