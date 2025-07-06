import './Card.css';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'medium',
  hover = false,
  onClick 
}) => {
  const cardClass = `card card--${variant} card--${padding} ${hover ? 'card--hover' : ''} ${className}`.trim();

  return (
    <div className={cardClass} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;