import React from 'react';
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import './ServiceCards.css'; 
import CardImage1 from '../assets/images/secure_data.jpg'; 
import CardImage2 from '../assets/images/chaining.jpeg' ;
import CardImage3 from '../assets/images/white_chain.jpg';
import CardImage4 from '../assets/images/isctock_blocks.jpg';
import CardImage5 from '../assets/images/blue_chain.jpg';

export default function ServiceCards() {
  const services = [
    {
      title: 'Secure Data Management',
      description: 'Tamper-proof data storage and verification using blockchain.',
      image: CardImage1,
    },
    {
      title: 'Smart Contracts',
      description: 'Automate transactions with transparency and efficiency.',
      image: CardImage2,
    },
    {
      title: 'Supply Chain Transparency',
      description: 'Real-time product tracking and authentication.',
      image: CardImage3,
    },
    {
      title: 'Digital Identity',
      description: 'Secure digital identities to reduce fraud.',
      image: CardImage4,
    },
    {
      title: 'Blockchain Analytics',
      description: 'Insights into blockchain data to optimize operations.',
      image: CardImage5,
    },
  ];

  const settings = {
    dots: true,          
    infinite: true,       
    speed: 1000,         
    slidesToShow: 3,       
    slidesToScroll: 1,     
    autoplay: true,
    autoplaySpeed: 3000,   
    centerMode: true,     
    centerPadding: '0px',  
    focusOnSelect: true,   
    responsive: [          
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="service-cards-container">
      <h1 className="service-text">
        Explore NexVault Services
      </h1>
      <Slider {...settings} className="slider">
        {services.map((service, i) => (
          <div key={i} className="slider-card-container">
            <div className="slider-card">
              {/* Image Section */}
              <div className="image-section">
                <img src={service.image} alt={service.title} className="card-image" />
              </div>
              {/* Text Section */}
              <div className="text-section">
                <h3>{service.title}</h3>
                <p className="card-description">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
