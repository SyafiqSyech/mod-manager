import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface NavBarProps {
  onPage: string;
}

const NavBar: React.FC<NavBarProps> = ({ onPage }) => {
  const [modsCount, setModsCount] = useState(0);

  useEffect(() => {
    const updateModsCount = () => {
      try {
        const mods = JSON.parse(localStorage.getItem('mods') || '[]');
        setModsCount(Array.isArray(mods) ? mods.length : 0);
      } catch {
        setModsCount(0);
      }
    };

    updateModsCount();

    window.addEventListener('storage', updateModsCount);

    window.addEventListener('modsUpdated', updateModsCount);

    return () => {
      window.removeEventListener('storage', updateModsCount);
      window.removeEventListener('modsUpdated', updateModsCount);
    };
  }, []);

  return (
    <div className='fixed top-0 left-0 w-full border-b-2 bg-bg-primary/50 backdrop-blur-xl border-bg-secondary-muted p-2 flex justify-center items-center gap-4'>
      <Link to="/" className={`text-contrast hover:text-accent transition-all ` + (onPage === 'search' ? 'underline' : '')}>
        Search
      </Link>
      <Link to="/List" className='text-contrast group flex items-center gap-1'>
        <div className={`group-hover:text-accent transition-all ` + (onPage === 'list' ? 'underline' : '')}>List</div>
        <div className='px-2 bg-accent-muted rounded-full text-xs'>{modsCount}</div>
      </Link>
    </div>
  )
}

export default NavBar