import { createRouter, RootRoute, Route } from "@tanstack/react-router";
import LandingLayout from "./LandingLayout";
import AuthenticatedLayout from "./Layout";
import HomePage from "./pages/landingpage/HomePage";
// import { ampli } from './ampli'
import GoldPage from "./pages/GoldPage";
// import GammaOiPage from './pages/GammaOi'
import InvesticWeightOiPage from "./pages/InvesticWeightOi";
import TrendAndMomentumPage from "./pages/TrendAndMomentum";
import RetailSentimentPage from "./pages/Retailsentmient";
import ProtectedSubscribeRoute from "./components/auth/ProtectedSubscribeRoute";

const rootRoute = new RootRoute();

const landingLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "landingLayout",
  component: LandingLayout,
});

const authenticatedLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: "authenticatedLayout",
  component: AuthenticatedLayout,
});

const indexRoute = new Route({
  getParentRoute: () => landingLayoutRoute,
  path: "/",
  component: HomePage,
});

const goldRoute = new Route({
  getParentRoute: () => authenticatedLayoutRoute,
  path: "/gold",
  component: () => <ProtectedSubscribeRoute component={GoldPage} />,
});

const retailSentimentRoute = new Route({
  getParentRoute: () => authenticatedLayoutRoute,
  path: "/gold/retail-sentiment",
  component: () => <ProtectedSubscribeRoute component={RetailSentimentPage} />,
});

// const gammaOiRoute = new Route({
//   getParentRoute: () => authenticatedLayoutRoute,
//   path: '/gold/gamma-oi',
//   component: GammaOiPage,
// })

const investicWeightOiRoute = new Route({
  getParentRoute: () => authenticatedLayoutRoute,
  path: "/gold/investic-weight-oi",
  component: () => <ProtectedSubscribeRoute component={InvesticWeightOiPage} />,
});

const trendAndMomentumRoute = new Route({
  getParentRoute: () => authenticatedLayoutRoute,
  path: "/gold/trend-and-momentum",
  component: () => <ProtectedSubscribeRoute component={TrendAndMomentumPage} />,
});

const routeTree = rootRoute.addChildren([
  landingLayoutRoute.addChildren([indexRoute]),
  authenticatedLayoutRoute.addChildren([
    goldRoute,
    investicWeightOiRoute,
    trendAndMomentumRoute,
    retailSentimentRoute,
  ]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
