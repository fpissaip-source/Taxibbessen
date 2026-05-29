import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { CookieBanner } from "@/components/CookieBanner";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Book from "@/pages/Book";
import Confirmation from "@/pages/Confirmation";
import Admin from "@/pages/Admin";
import Impressum from "@/pages/Impressum";
import AGB from "@/pages/AGB";
import Datenschutz from "@/pages/Datenschutz";
import Fahrzeuge from "@/pages/Fahrzeuge";
import UeberUns from "@/pages/UeberUns";
import Fahrtstatus from "@/pages/Fahrtstatus";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/book" component={Book} />
      <Route path="/confirmation" component={Confirmation} />
      <Route path="/admin" component={Admin} />
      <Route path="/impressum" component={Impressum} />
      <Route path="/agb" component={AGB} />
      <Route path="/datenschutz" component={Datenschutz} />
      <Route path="/fahrzeuge" component={Fahrzeuge} />
      <Route path="/ueber-uns" component={UeberUns} />
      <Route path="/fahrtstatus" component={Fahrtstatus} />
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
          <CookieBanner />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
