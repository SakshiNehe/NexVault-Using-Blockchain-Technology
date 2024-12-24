import React, { useState } from 'react';
import './ContactUs.css';
import nameIcon from '../assets/images/person_icon.png';
import emailIcon from '../assets/images/mail_icon.png';
import messageIcon from '../assets/images/msg_icon.png';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null); // Track which FAQ is open
  const [formData, setFormData] = useState({ name: '', email: '', message: '' }); // Track form input
  const [successMessage, setSuccessMessage] = useState(''); // Track success message
  const [errorMessage, setErrorMessage] = useState(''); // Track error message

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index); // Toggle individual FAQ answer
  };

  const faqData = [
    {
      question: 'How can I contact customer support?',
      answer: 'You can reach out to us by sending your message via Contact Us',
    },
    {
      question: 'What are your business hours?',
      answer: 'We are available from Monday to Friday, 9:00 AM to 5:00 PM.',
    },
    {
      question: 'Do you offer support on weekends?',
      answer: 'Yes, we provide limited support on weekends via email.',
    },
    {
      question: 'Where are you located?',
      answer: 'We are located at Nashik.',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Update form data
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
  
    // Send email using EmailJS with correct Service ID, Template ID, and User ID
    emailjs.send(
      'service_o6tnov9',  // Your EmailJS Service ID
      'template_8m9aqrb', // Your EmailJS Template ID
      {
        name: formData.name,  // Map 'from_name' to name in formData
        from_email: formData.email,  // Map 'from_email' to email in formData
        message: formData.message,  // Map 'message' to message in formData
        reply_to: formData.email,
      },
      'baeSQyRfXTUkFHg9J'  // Your EmailJS Public Key (User ID)
    )
      .then(() => {
        setSuccessMessage('Your message has been sent successfully!');
        setErrorMessage('');
        setFormData({ name: '', email: '', message: '' }); // Reset form data
  
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 1000);
      })
      .catch((error) => {
        setErrorMessage('Failed to send your message. Please try again later.');
        setSuccessMessage('');
      });
  };
  

    return (
      <>
    <div className="contact-page">
      {/* Contact Form and FAQ side by side */}
      <div className="contact-faq-wrapper">
        <div className="contact-card">
          <div className="contact-header">
            <h1 class-name="contact-title">Contact Us</h1>
            <p>We'd love to hear from you! Reach out for any queries or suggestions.</p>
          </div>

          <div className="contact-content">
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <img src={nameIcon} alt="Name Icon" className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <img src={emailIcon} alt="Email Icon" className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <img src={messageIcon} alt="Message Icon" className="input-icon" />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit">Send Message</button>
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
              </form>
            </div>
          </div>
        </div>

        {/* FAQ section NEXT to Contact Us */}
        <div className="faq-content">
          <h2>Frequently Asked Questions</h2>
          <ul>
            {faqData.map((faq, index) => (
              <li key={index} className={`faq-item ${openFaqIndex === index ? 'open' : ''}`} onClick={() => toggleFaq(index)}>
                <strong>{faq.question}</strong>
                {openFaqIndex === index && <p>{faq.answer}</p>}
              </li>
            ))}
          </ul>
        </div>
          </div>
      </div>
      <footer>
      <p>&copy; 2024 NexVault. All rights reserved.</p>
      <p>
        <a href="#services" className="bold-text">Services</a> | <a href="#why-choose-us" className="bold-text">Why Choose Us</a> |{' '}
        <a href="#testimonials" className="bold-text">Testimonials</a>
      </p>
    </footer>
      </>
  );
};

export default ContactUs;
