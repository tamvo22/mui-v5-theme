import Navbar from '@/com/ui/Navbar';
import ThemeToggler from '@/com/themes/ThemeToggler';
import { AppBar, Toolbar, Logo, HeaderOffset } from './styled';

export default function Header() {
  return (
    <>
      <AppBar>
        <Toolbar component="div">
          <Logo>My Logo</Logo>
          <Navbar />
          <ThemeToggler />
        </Toolbar>
      </AppBar>
      <HeaderOffset />
    </>
  );
}
