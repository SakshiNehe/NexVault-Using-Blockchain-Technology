import React, { useState, useEffect } from 'react';
import './ContactUs.css';
import {
  Send,
  User,
  Mail,
  MessageSquare,
  ChevronDown,
  Clock,
  Headphones,
  Shield,
  Zap,
  Globe
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const faqData = [
    {
      question: 'How can I contact customer support?',
      answer: 'You can reach out to us through multiple channels including our contact form, direct email, phone support, or live chat. Our dedicated support team typically responds within 2-4 hours during business hours.',
      icon: React.createElement(Headphones, { className: 'w-5 h-5' })
    },
    {
      question: 'What are your business hours?',
      answer: 'We operate Monday through Friday from 9:00 AM to 6:00 PM IST. For urgent matters, our emergency support line is available 24/7 with premium response times.',
      icon: React.createElement(Clock, { className: 'w-5 h-5' })
    },
    {
      question: 'Do you offer support on weekends?',
      answer: 'Yes, we provide comprehensive weekend support via email and our support portal. Weekend inquiries receive priority handling with guaranteed response within 12 hours.',
      icon: React.createElement(Shield, { className: 'w-5 h-5' })
    },
    {
      question: 'Where are you located?',
      answer: 'Our headquarters are strategically located in Nashik, Maharashtra, India. We maintain global operations with remote teams serving clients across multiple time zones worldwide.',
      icon: React.createElement(Globe, { className: 'w-5 h-5' })
    },
    {
      question: 'How fast do you respond?',
      answer: 'Response times vary by channel: Live chat (immediate), Phone (under 2 minutes), Email (2-4 hours), Contact form (within 6 hours). Premium clients enjoy expedited response times.',
      icon: React.createElement(Zap, { className: 'w-5 h-5' })
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all required fields.');
      setTimeout(() => setErrorMessage(''), 4000);
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_o6tnov9',
        'template_8m9aqrb',
        {
          name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
        },
        'baeSQyRfXTUkFHg9J'
      );

      setSuccessMessage("Message sent successfully! We'll respond within 2–4 hours.");
      setErrorMessage('');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccessMessage(''), 6000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setErrorMessage('Failed to send message. Please try again or contact us directly.');
      setSuccessMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return React.createElement('div', { className: 'contact-page' },
    React.createElement('div', { className: 'contact-container' },
      React.createElement('div', { className: `hero-section ${isVisible ? 'animate-in' : ''}` },
        React.createElement('h1', { className: 'hero-title' }, 'Get in ', React.createElement('span', { className: 'gradient-text' }, 'Touch')),
        React.createElement('p', { className: 'hero-description' }, 'We are here to guide you through every step of your journey.')
      ),
      React.createElement('div', { className: 'main-grid' },
        // Left Form
        React.createElement('div', { className: `form-container ${isVisible ? 'animate-in-left' : ''}` },
          React.createElement('div', { className: 'form-card' },
            React.createElement('div', { className: 'form-header' },
              React.createElement('h2', { className: 'form-title' }, 'Send us a Message')
            ),
            React.createElement('div', { className: 'contact-form' },
              // Name
              React.createElement('div', { className: 'form-group' },
                React.createElement('label', { className: 'form-label' }, 'Full Name *'),
                React.createElement('div', { className: 'input-container' },
                  React.createElement(User, { className: 'input-icon' }),
                  React.createElement('input', {
                    type: 'text',
                    name: 'name',
                    value: formData.name,
                    onChange: handleChange,
                    placeholder: 'Enter your full name',
                    className: 'form-input',
                    required: true
                  })
                )
              ),
              // Email
              React.createElement('div', { className: 'form-group' },
                React.createElement('label', { className: 'form-label' }, 'Email Address *'),
                React.createElement('div', { className: 'input-container' },
                  React.createElement(Mail, { className: 'input-icon' }),
                  React.createElement('input', {
                    type: 'email',
                    name: 'email',
                    value: formData.email,
                    onChange: handleChange,
                    placeholder: 'Enter your email address',
                    className: 'form-input',
                    required: true
                  })
                )
              ),
              // Message
              React.createElement('div', { className: 'form-group' },
                React.createElement('label', { className: 'form-label' }, 'Message *'),
                React.createElement('div', { className: 'input-container' },
                  React.createElement(MessageSquare, { className: 'textarea-icon' }),
                  React.createElement('textarea', {
                    name: 'message',
                    value: formData.message,
                    onChange: handleChange,
                    placeholder: 'Send a Message...',
                    rows: 5,
                    className: 'form-textarea',
                    required: true
                  })
                )
              ),
              // Submit button
              React.createElement('button', {
                type: 'button',
                onClick: handleSubmit,
                disabled: isSubmitting,
                className: 'submit-button'
              },
                isSubmitting ?
                  React.createElement(React.Fragment, null,
                    React.createElement('div', { className: 'spinner' }),
                    'Sending Message...'
                  ) :
                  React.createElement(React.Fragment, null,
                    React.createElement(Send, { className: 'button-icon' }),
                    'Send Message'
                  )
              ),
              // Feedback messages
              successMessage && React.createElement('div', { className: 'message success-message' },
                React.createElement('div', { className: 'message-icon' }, '✓'),
                successMessage
              ),
              errorMessage && React.createElement('div', { className: 'message error-message' },
                React.createElement('div', { className: 'message-icon' }, '⚠'),
                errorMessage
              )
            )
          )
        ),
        // FAQ
        React.createElement('div', { className: `faq-container ${isVisible ? 'animate-in-right' : ''}` },
          React.createElement('div', { className: 'faq-card' },
            React.createElement('div', { className: 'faq-header' },
              React.createElement('h2', { className: 'faq-title' }, 'Frequently Asked Questions'),
              React.createElement('p', { className: 'faq-subtitle' }, 'Quick answers to help you get started faster')
            ),
            React.createElement('div', { className: 'faq-list' },
              faqData.map((faq, index) =>
                React.createElement('div', { key: index, className: 'faq-item' },
                  React.createElement('button', {
                    onClick: () => toggleFaq(index),
                    className: 'faq-button'
                  },
                    React.createElement('div', { className: 'faq-question-content' },
                      faq.icon,
                      React.createElement('span', { className: 'faq-question' }, faq.question)
                    ),
                    React.createElement(ChevronDown, {
                      className: `faq-chevron ${openFaqIndex === index ? 'rotated' : ''}`
                    })
                  ),
                  React.createElement('div', {
                    className: `faq-answer-container ${openFaqIndex === index ? 'expanded' : ''}`
                  },
                    React.createElement('div', { className: 'faq-answer' }, faq.answer)
                  )
                )
              )
            )
          )
        )
      )
    )
  );
};

export default ContactUs;
