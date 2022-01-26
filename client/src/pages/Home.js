import React from "react";
// import '../../index.css';

const Home = () => (
<div>
   <section className="hero is-medium has-background-primary-light	">
    <div className="hero-body">
      <p className="title has-text-primary-dark	">
        Jennifer Renken
      </p>
      <p className="subtitle">
        Professional Portfolio
      </p>
    </div>
    <figure className="image is-3by1">
    <img src={require("../../assets/pic_ocean.png")} />

    </figure>
   </section>
</div>
);

export default Home;