
import './Footer.css'
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();
  const footerLinks = [
    { href: '#services', label: 'Services' },
    { href: '#why-choose-us', label: 'Why Choose Us' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#about', label: 'About Us' },
    { href: '#contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: '#', label: 'LinkedIn', icon: <FaLinkedin /> },
    { href: '#', label: 'Twitter', icon: <FaTwitter /> },
    { href: '#', label: 'Facebook', icon: <FaFacebook /> },
    { href: '#', label: 'Instagram', icon: <FaInstagram /> },
  ];

  const quickLinks = [
    { href: '#privacy', label: 'Privacy Policy' },
    { href: '#terms', label: 'Terms of Service' },
    { href: '#security', label: 'Security' },
    { href: '#support', label: 'Support' },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Animated background elements */}
        <div className="bg-animation">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>

        {/* Main footer content */}
        <div className="footer-main">
          <div className="footer-section brand-section">
            <h3 className="footer-title">NexVault</h3>
            <p className="footer-description">
              Secure your digital assets with cutting-edge encryption technology.
              Your data protection is our priority, delivering enterprise-grade
              security solutions for modern businesses worldwide.
            </p>
            <div className="social-links">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} className="social-link" title={link.label}>
                  <span className="social-icon">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h4 className="section-title">Quick Links</h4>
            <div className="footer-links">
              {footerLinks.map((link) => (
                <a key={link.label} href={link.href} className="footer-link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h4 className="section-title">Legal & Support</h4>
            <div className="footer-links">
              {quickLinks.map((link) => (
                <a key={link.label} href={link.href} className="footer-link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section contact-section">
            <h4 className="section-title">Get In Touch</h4>
            <div className="contact-info">
              <p className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>nexvault.secure.system@gmail.com</span>
              </p>
              <p className="contact-item">
                <FaPhoneAlt className="contact-icon" />
                <span>+91 9322616376</span>
              </p>
              <p className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Nashik City, India</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p className="copyright">&copy; {year} NexVault. All rights reserved.</p>
            <p className="tagline">Building Trust Through Security Excellence</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
