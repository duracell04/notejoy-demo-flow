import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";

export const Header = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <Wordmark className="text-foreground" />
        </NavLink>
        
        <nav className="hidden md:flex items-center gap-6">
          <NavLink 
            to="/market" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-foreground font-medium"
          >
            Market
          </NavLink>
          <NavLink 
            to="/issuer" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-foreground font-medium"
          >
            Issuer
          </NavLink>
          <NavLink 
            to="/investor" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-foreground font-medium"
          >
            Investor
          </NavLink>
          <NavLink 
            to="/servicer" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-foreground font-medium"
          >
            Servicer
          </NavLink>
          <NavLink 
            to="/compliance" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            activeClassName="text-foreground font-medium"
          >
            Compliance
          </NavLink>
        </nav>

        <Button variant="outline" size="sm">
          Connect Wallet
        </Button>
      </div>
    </header>
  );
};
