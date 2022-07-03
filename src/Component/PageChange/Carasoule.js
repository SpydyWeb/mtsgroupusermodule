import React from "react";

const Carasoule = () => {
  const responsive = {
    0: { items: 2 },
    512: {
      items: 4,
    },
  };
  return (
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="/img/Banner3.png"
            class="d-block w-100 max-h-[500px]"
            alt="Banner1.png"
          />
        </div>
        <div class="carousel-item">
          <img
            src="/img/Banner2.png"
            class="d-block w-100 max-h-[500px]"
            alt="Banner1.jpg"
          />
        </div>
        <div class="carousel-item">
          <img
            src="/img/Banner1.png"
            class="d-block w-100 max-h-[500px]"
            alt="Banner1.jpg"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carasoule;
