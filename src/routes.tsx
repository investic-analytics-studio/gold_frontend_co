import { createRouter, RootRoute, Route } from '@tanstack/react-router'
import LandingLayout from './LandingLayout'
import AuthenticatedLayout from './Layout'
import HomePage from './pages/landingpage/HomePage'
// import { ampli } from './ampli'
import GoldPage from './pages/GoldPage'
import GammaOiPage from './pages/GammaOi'
import InvesticWeightOiPage from './pages/InvesticWeightOi'
import TrendAndMomentumPage from './pages/TrendAndMomentum'

const rootRoute = new RootRoute()

const landingLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'landingLayout',
  component: LandingLayout,
})

const authenticatedLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'authenticatedLayout',
  component: AuthenticatedLayout,
})

const indexRoute = new Route({
  getParentRoute: () => landingLayoutRoute,
  path: '/',
  component: HomePage,
})

const goldRoute = new Route({
  getParentRoute: () => authenticatedLayoutRoute,
  path: '/gold',
  component: GoldPage,
})

const gammaOiRoute = new Route({
  getParentRoute: () => authenticatedLayoutRoute,
  path: '/gold/gamma-oi',
  component: GammaOiPage,
})

const investicWeightOiRoute = new Route({
  getParentRoute: () => authenticatedLayoutRoute,
  path: '/gold/investic-weight-oi',
  component: InvesticWeightOiPage,
})

const trendAndMomentumRoute = new Route({
  getParentRoute: () => authenticatedLayoutRoute,
  path: '/gold/trend-and-momentum',
  component: TrendAndMomentumPage,
})

const routeTree = rootRoute.addChildren([
  landingLayoutRoute.addChildren([indexRoute]),
  authenticatedLayoutRoute.addChildren([goldRoute, gammaOiRoute, investicWeightOiRoute, trendAndMomentumRoute]),
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
