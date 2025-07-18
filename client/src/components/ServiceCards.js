import React from 'react';
import Slider from 'react-slick';
import Card from './ui/Card';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ServiceCards.css';

// Import images
import CardImage1 from '../assets/images/secure_data.jpg';
import CardImage2 from '../assets/images/chaining.jpeg';
import CardImage3 from '../assets/images/white_chain.jpg';
import CardImage4 from '../assets/images/isctock_blocks.jpg';
import CardImage5 from '../assets/images/blue_chain.jpg';

const ServiceCards = () => {
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

  const sliderSettings = {
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
      <h2 className="service-title">
        Explore NexVault Services
      </h2>
      
      <Slider {...sliderSettings} className="services-slider">
        {services.map((service, index) => (
          <div key={index} className="service-slide">
            <Card className="service-card" hover>
              <div className="service-image-section">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="service-image" 
                />
              </div>
              
              <div className="service-text-section">
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ServiceCards;