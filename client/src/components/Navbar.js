import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('');

  const handleScrollToSection = (sectionId) => {
    if (sectionId === 'home') {
      // Special handling for home - navigate to home and scroll to top
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Handle other sections
      if (location.pathname === '/') {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  // Track which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['services', 'contact'];
      const scrollPosition = window.scrollY + 100;

      // Check if we're at the top of the page (home section)
      if (scrollPosition < 200) { // Adjust this threshold as needed
        setActiveSection('home');
        return;
      }

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      setActiveSection('');
    };

    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
      // Set initial state
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setActiveSection(''); // Clear active section when not on home page
    }
  }, [location.pathname]);

  const navItems = [
    { to: '/', label: 'Home', sectionId: 'home' },
    { to: '/AboutUs', label: 'About' },
    { label: 'Services', sectionId: 'services' },
    { label: 'Contact Us', sectionId: 'contact' },
  ];

  return React.createElement(
    'nav',
    { className: 'custom-navbar' },
    React.createElement('div', { className: 'nav-brand' }, 'NexVault'),
    React.createElement('input', {
      type: 'checkbox',
      id: 'nav-toggle',
      className: 'nav-toggle',
    }),
    React.createElement(
      'label',
      { htmlFor: 'nav-toggle', className: 'hamburger' },
      '☰'
    ),
    React.createElement(
      'ul',
      { className: 'nav-menu' },
      ...navItems.map((item) =>
        React.createElement(
          'li',
          { key: item.label },
          item.sectionId
            ? React.createElement(
                'span',
                {
                  onClick: () => handleScrollToSection(item.sectionId),
                  className: `navbar-components ${
                    activeSection === item.sectionId ? 'active' : ''
                  }`,
                  style: { cursor: 'pointer' },
                },
                item.label
              )
            : React.createElement(
                NavLink,
                {
                  to: item.to,
                  className: ({ isActive }) =>
                    `navbar-components ${isActive ? 'active' : ''}`,
                },
                item.label
              )
        )
      )
    )
  );
};

export default Navbar;