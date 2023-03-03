import { useState,useEffect } from "react";
import "./ShowsForm.css";

// TODO: imports added on --- v 
import { getOneShow, updateShow } from "../../api/fetch";
import { useParams, useNavigate } from "react-router-dom";


// <Link to={`/shows/${id}/edit`}>
// <button>Edit</button> 
// </Link>

export default function ShowsForm() {
  const [show, setShow] = useState({
    type: "",
    title: "",
    country: "",
    dateAdded: "",
    description: "",
    duration: "",
    listedIn: "",
    rating: "",
    releaseYear: "",
  });
  // console.log(useParams)

  // * deconstructing the object info
  const { id } = useParams()
  let navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()

    // * updating show with proper id & show by fetching the info/ navigating to it ---v
    updateShow(id, show)
      .then((response) => {
        // navigate(`/shows/${response.id}`) -> this can work too
        navigate(`/shows/${id}`)

      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(()=>{
    getOneShow(id)
    .then((response)=> {
      setShow(response)
    })
    .catch((error) =>{
      console.log(error)
    })
  },[id])

  function handleTextChange(event) {
    setShow({
      ...show,
      [event.target.id]: event.target.value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={show.title}
        onChange={handleTextChange}
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={show.description}
        onChange={handleTextChange}
      />

      <label htmlFor="type">Type</label>
      <input
        type="text"
        id="type"
        value={show.type}
        onChange={handleTextChange}
      />

      <label htmlFor="rating">Rating:</label>
      <input
        type="text"
        id="rating"
        value={show.rating}
        onChange={handleTextChange}
      />

      <label htmlFor="listedIn">Listed in</label>
      <input
        type="text"
        id="listedIn"
        value={show.listedIn}
        onChange={handleTextChange}
      />

      <label htmlFor="duration">Duration</label>
      <input
        type="text"
        id="duration"
        value={show.duration}
        onChange={handleTextChange}
      />

      <label htmlFor="releaseYear">Release Year</label>
      <input
        type="text"
        id="releaseYear"
        value={show.releaseYear}
        onChange={handleTextChange}
      />

      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        value={show.country}
        onChange={handleTextChange}
      />

      <label htmlFor="dateAdded">Date added:</label>
      <input
        type="text"
        id="dateAdded"
        value={show.dateAdded}
        onChange={handleTextChange}
      />

      <br />

      <input type="submit" />
    </form>
  );
}
