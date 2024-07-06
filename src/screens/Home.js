import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Box from '../components/Box'

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const loadData = async () => {
    let response = await fetch('http://localhost:5000/api/displaydata',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      })
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    //console.log(response[0], response[1]);
  };
  useEffect(() => { loadData(); }, []);


  return (
    <>
      <div><Navbar /></div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade">
                <div className="carousel-caption" style={{ zIndex: "10" }}>
                    <div className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        
                    </div>
                </div>
                <div className="carousel-inner" style={{"maxHeight":"500px"}}>
                    <div className="carousel-item active">
                        <img src="https://c4.wallpaperflare.com/wallpaper/850/627/639/fried-chicken-french-fries-ketchup-food-wallpaper-preview.jpg" className="d-block w-100" style={{ height: "600px", objectFit: "cover", filter: "brightness(30%)" }} alt=" " />
                    </div>
                    <div className="carousel-item">
                        <img src="https://c4.wallpaperflare.com/wallpaper/484/98/442/cake-sweets-food-wallpaper-preview.jpg" className="d-block w-100" style={{ height: "600px", objectFit: "cover", filter: "brightness(30%)" }} alt=" "/>
                    </div>
                    <div className="carousel-item">
                        <img src="https://c4.wallpaperflare.com/wallpaper/40/140/49/food-pasta-meat-still-life-wallpaper-preview.jpg" className="d-block w-100" style={{ height: "600px", objectFit: "cover", filter: "brightness(30%)" }} alt=" "  />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
      </div>
      <div className="container">
        {
          foodCat.length !== 0 ?
            foodCat.map((item) => {
              return (
                <div className="row mb-3">
                  <div key={item._id} className="fs-3 m-3">{item.CategoryName}</div>
                  <hr />
                  {foodItem.length!==0?
                  foodItem.filter((data)=>(data.CategoryName===item.CategoryName) && (data.name.toLowerCase().includes(search.toLowerCase()))).map((filterItem)=>{
                    return(
                  <div key={filterItem._id} className="col-12 col-md-6 col-lg-3" >
                    <Box foodItem={filterItem} options={filterItem.options[0]}> </Box>
                  </div>
                  )
                  }): <div>No such data found</div>}
                </div>
              )
            })
            : <div>No results !</div>
        }
      </div>
      <div><Footer /></div>
    </>
  )

}
