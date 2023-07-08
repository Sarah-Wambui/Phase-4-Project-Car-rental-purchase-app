import React from "react";

function NavBar({ onCategoryClick, cars, onSearch, onAddCarClick }) {
    const handleCategoryClick = (category) => {
        onCategoryClick(category);
    };

    function handleSearch(event) {
        event.preventDefault();
        const searchValue = event.target.search.value.toLowerCase();

        // Filter cars based on search query
        const filteredCars = cars.filter((car) => {
            const lowerCaseTitle = car.title.toLowerCase();
            const lowerCaseLocation = car.location.toLowerCase();

            return (
                lowerCaseTitle.includes(searchValue) ||
                lowerCaseLocation.includes(searchValue)
            );
        });

        onSearch(filteredCars);
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <button id="category" onClick={() => handleCategoryClick("sale")}>
                    For Sale
                </button>
                <button id="category" onClick={() => handleCategoryClick("rental")}>
                    For Rent
                </button>
                <button id="category" onClick={() => onAddCarClick()}>
                    Add Car
                </button>
            </div>

            <form onSubmit={handleSearch} className="search-form">
                <input type="text" name="search" placeholder="Search Cars" />
                <button id="category" type="submit">
                    Search
                </button>
            </form>
        </nav>
    );
}

export default NavBar;