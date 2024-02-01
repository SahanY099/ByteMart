// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as BrowseImport } from './routes/_browse'

// Create Virtual Routes

const BrowseIndexLazyImport = createFileRoute('/_browse/')()
const BrowseAboutLazyImport = createFileRoute('/_browse/about')()

// Create/Update Routes

const BrowseRoute = BrowseImport.update({
  id: '/_browse',
  getParentRoute: () => rootRoute,
} as any)

const BrowseIndexLazyRoute = BrowseIndexLazyImport.update({
  path: '/',
  getParentRoute: () => BrowseRoute,
} as any).lazy(() => import('./routes/_browse/index.lazy').then((d) => d.Route))

const BrowseAboutLazyRoute = BrowseAboutLazyImport.update({
  path: '/about',
  getParentRoute: () => BrowseRoute,
} as any).lazy(() => import('./routes/_browse/about.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_browse': {
      preLoaderRoute: typeof BrowseImport
      parentRoute: typeof rootRoute
    }
    '/_browse/about': {
      preLoaderRoute: typeof BrowseAboutLazyImport
      parentRoute: typeof BrowseImport
    }
    '/_browse/': {
      preLoaderRoute: typeof BrowseIndexLazyImport
      parentRoute: typeof BrowseImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  BrowseRoute.addChildren([BrowseAboutLazyRoute, BrowseIndexLazyRoute]),
])
