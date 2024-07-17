import React from 'react';
import clsx from 'clsx';
import { Nav } from 'react-bootstrap';

interface DesktopItemProps {
  label: string;
  icon: React.ElementType; // Ensure icon is correctly typed as a React component
  href?: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({
  label,
  href = '#',
  icon: Icon,
  active = false,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault(); // Prevent default link behavior if onClick is provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <Nav.Item>
      <Nav.Link
        href={href}
        onClick={handleClick}
        className={`nav-link d-flex just-fy-content-cneter align-items-center flex-column ps-4 pe-3 py-2 text-sm font-weight-bold text-gray-500 
          ${active ? 'active' : ''}
          ${active ? 'bg-gray-100 text-black' : ''}
          ${active ? 'dark-mode bg-lightgray text-gray-200' : ''}`}
      >
        <Icon size="28" className={`mb-2 ${active ? 'custom-icon-active' : 'custom-icon'}`} aria-hidden="true" />
        <small className='text-extra-small'>{label}</small>
      </Nav.Link>
    </Nav.Item>
  );
};

export default DesktopItem;
