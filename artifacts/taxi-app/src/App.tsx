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
import FlughafentransferEssen from "@/pages/FlughafentransferEssen";
import KrankenfahrtenEssen from "@/pages/KrankenfahrtenEssen";
import GrossraumtaxiEssen from "@/pages/GrossraumtaxiEssen";
import DialysefahrtenEssen from "@/pages/DialsyefahrtenEssen";
import KurierdienstEssen from "@/pages/KurierdienstEssen";
import TaxiEssenHbf from "@/pages/TaxiEssenHbf";
import TaxiHolsterhausen from "@/pages/TaxiHolsterhausen";
import TaxiRuettenscheid from "@/pages/TaxiRuettenscheid";
import TaxiFrohnhausen from "@/pages/TaxiFrohnhausen";
import TaxiSuedviertel from "@/pages/TaxiSuedviertel";

import { useLenis } from "@/hooks/useLenis";
import { getLenis } from "@/lib/lenis";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
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
      <Route path="/flughafentransfer-essen-duesseldorf" component={FlughafentransferEssen} />
      <Route path="/krankenfahrten-essen" component={KrankenfahrtenEssen} />
      <Route path="/grossraumtaxi-essen" component={GrossraumtaxiEssen} />
      <Route path="/dialysefahrten-essen" component={DialysefahrtenEssen} />
      <Route path="/kurierdienst-essen" component={KurierdienstEssen} />
      <Route path="/taxi-essen-hbf" component={TaxiEssenHbf} />
      <Route path="/taxi-essen-holsterhausen" component={TaxiHolsterhausen} />
      <Route path="/taxi-essen-ruettenscheid" component={TaxiRuettenscheid} />
      <Route path="/taxi-essen-frohnhausen" component={TaxiFrohnhausen} />
      <Route path="/taxi-essen-suedviertel" component={TaxiSuedviertel} />

      <Route component={NotFound} />
    </Switch>
    </>
  );
}

function AppInner() {
  useLenis();
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AppInner />
          <Toaster />
          <CookieBanner />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
