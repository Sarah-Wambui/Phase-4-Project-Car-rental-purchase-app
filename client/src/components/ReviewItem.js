import React from 'react'

function ReviewItem({review, handleDelete}) {
    const {car_id, rating, comments, id} = review
  return (
    <div >
        <h1>Car Id: {car_id}</h1>
        <p>Comments: {comments}</p>
        <p>Rating: {rating}</p>
        <button onClick={()=> handleDelete(id)} >Delete</button>
    </div>
  )
}

export default ReviewItem