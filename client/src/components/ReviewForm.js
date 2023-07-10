import React,{useState, useEffect} from 'react'
import ReviewItem from './ReviewItem'


function ReviewForm() {
  const [reviews, setReviews] = useState([])
  const [formData, setFormData] = useState({
    car_id: 0,
    rating: 0,
    comments: "",
  })

  // console.log(reviews)


  useEffect(()=>{
    fetch("/reviews")
    .then((r) => r.json())
    .then(reviews => setReviews(reviews))

  },[])

  
  function handleSubmit(e){
    e.preventDefault()
    const post ={
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    } 
    fetch("/reviews", post)
    .then(resp => resp.json())
    .then(data => console.log(data))
  }

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name] : event.target.value,
    })
  }
  function handleDelete(id){
    fetch(`/reviews/${id}`, {
      method: "DELETE",
    })
    .then(resp => resp.json())
    .then(() => {
      const updatedReviews = reviews.filter((review) => review.id !== id)
      setReviews(updatedReviews)
    })
  }
 


  return (
    <div>
      <form onSubmit={handleSubmit} id="review-form">
        <h2>Review Form</h2>
        <div id="add-review">
          <label htmlFor="car_id">Car ID:</label>
          <input type="text" id="car_id" name="car_id" value={formData.car_id} onChange={handleChange}/>
          <label htmlFor="rating">Rating:</label>
          <input type="text" id="rating" name="rating" value={formData.rating} onChange={handleChange}/>
          <label htmlFor="comments">Comments:</label>
          <input type="text" id="comments" name="comments" value={formData.comments} onChange={handleChange}/>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div id="reviews">
      {reviews.map((review) =>{
        return  <ReviewItem  key={review.id} review={review} handleDelete={handleDelete} />
      })}

      </div>

     

    </div>
  )
}

export default ReviewForm
