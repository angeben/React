import { useMemo } from "react"
import DrinkCard from "../components/DrinkCard"
import { useAppStore } from "../stores/useAppStore"

export default function FavouritesPage() {

  const favourites = useAppStore((state) => state.favourites)
  const hasFavourites = useMemo(() => favourites.length ,[favourites])
  const categories = useAppStore((state) => state.categories)
  

  return (
    <>
      <h1 className="text-6xl font-extrabold">Favourite Recipes</h1>
      {categories.drinks.length == 0 && <p className="italic my-5 text-red-500">There is a problem with the connection to the drink database, your favourite recipes
        may not be displayed correctly. Please, try again later.</p>}
      {hasFavourites ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
        {favourites.map((drink) => (
          <DrinkCard
            key={drink.idDrink}
            drink={drink}
          />
        ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl">Your favourite recipes will be shown here</p>
      )}
    </>
  )
}
