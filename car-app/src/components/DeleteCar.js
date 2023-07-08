import React from "react";

function DeleteCar({ carId, onDeleteCar }) {
  const handleDelete = () => {
    fetch(`http://localhost:4500/cars/${carId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((deletedCar) => {
        onDeleteCar(deletedCar);
      })
      .catch((error) => {
        console.error("Error deleting car:", error);
      });
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Car</button>
    </div>
  );
}

export default DeleteCar;
