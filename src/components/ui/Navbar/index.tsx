import * as React from 'react';
import { Toolbar, Stack, Link } from './styled';

const MenuItems = [
  { id: 'home', label: 'Home', url: '/' },
  { id: 'about', label: 'About', url: '/about' },
];

function Navbar() {
  return (
    <Toolbar component="nav" aria-labelledby="navbar">
      <Stack direction="row" spacing={0}>
        {MenuItems.map((item) => (
          <Link key={item.id} href={item.url}>
            {item.label}
          </Link>
        ))}
      </Stack>
    </Toolbar>
  );
}

export default Navbar;
