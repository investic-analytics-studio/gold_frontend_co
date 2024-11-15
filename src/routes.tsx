import { createRouter, RootRoute, Route } from '@tanstack/react-router'
import LandingLayout from './LandingLayout'
import AuthenticatedLayout from './Layout'
import CryptoLitePage from './pages/CryptoLitePage'
import HomePage from './pages/landingpage/HomePage'

import { ampli } from './ampli'

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

const cryptoRoute = new Route({
  getParentRoute: () => authenticatedLayoutRoute,
  path: '/crypto',
  component: CryptoLitePage,
  beforeLoad: () => {
    ampli.viewCryptoStudioPage({ page_name: 'ViewCryptoLitePage' })
  },
})




const routeTree = rootRoute.addChildren([
  landingLayoutRoute.addChildren([indexRoute]),
  authenticatedLayoutRoute.addChildren([cryptoRoute,]),
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
