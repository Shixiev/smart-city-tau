import { Link, useLocation } from 'react-router-dom';
import { MapPin, Leaf, Bell, User, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const location = useLocation();
  const { t, language, setLanguage } = useLanguage();

  const navItems = [
    { path: '/', label: t.nav.home, icon: null },
    { path: '/map', label: t.nav.map, icon: MapPin },
    { path: '/ecology', label: t.nav.ecology, icon: Leaf },
    { path: '/alerts', label: t.nav.news, icon: Bell },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-eco flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-eco bg-clip-text text-transparent">
            Smart Aktau
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                isActive(item.path)
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'hover:bg-secondary text-foreground'
              }`}
            >
              {item.icon && <item.icon className="w-4 h-4" />}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Globe className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('ru')}>
                <span className={language === 'ru' ? 'font-semibold' : ''}>Русский</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('kk')}>
                <span className={language === 'kk' ? 'font-semibold' : ''}>Қазақша</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/profile">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-full ${isActive('/profile') ? 'bg-primary text-primary-foreground' : ''}`}
            >
              <User className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 py-2 flex justify-around">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                isActive(item.path)
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.icon && <item.icon className="w-5 h-5" />}
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
