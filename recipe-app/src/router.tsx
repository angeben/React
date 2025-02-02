import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./layouts/Layout"
const IndexPage = lazy(() => import("./views/IndexPage"))
const FavouritesPage = lazy(() => import("./views/FavouritesPage"))

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout/>}>
                <Route path='/' element={
                  <Suspense fallback="Loading...">
                  <IndexPage/>
                </Suspense>
                } index/>
                <Route path='/favourites' element={
                  <Suspense fallback="Loading...">
                    <FavouritesPage/>
                  </Suspense>
                }/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
