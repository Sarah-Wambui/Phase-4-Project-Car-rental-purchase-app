import React from 'react'

function ReviewItem({review, handleDelete}) {
    const {car_id, rating, comments, id} = review
  return (
    <div>
        <h1>{car_id}</h1>
        <p>{comments}</p>
        <p>{rating}</p>
        <button onClick={()=> handleDelete(id)} >Delete</button>
    </div>
  )
}

export default ReviewItem