import React from "react";

function Header() {
    const websiteName = "CarMarket";
    const slogan = "Ride in Style, Rent with Confidence";
    return (
        <header className="header">
            <div className="header-background"></div>
            <div className="logo">

                <h1>{websiteName}</h1>
            </div>
            <div id="slogan">
                <h3>{slogan}</h3>
            </div>
        </header>
    );
}

export default Header;