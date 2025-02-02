import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"

export type FavouritesSliceType = {
    favourites: Recipe[]
    favouriteExists: (id: Recipe['idDrink']) => boolean
    handleClickFavourite: (recipe : Recipe) => void
    loadFromStorage: () => void
}

export const createFavouritesSlice : StateCreator<FavouritesSliceType & NotificationSliceType, [], [], FavouritesSliceType> = (set, get, api) => ({
    favourites: [],
    favouriteExists: (id) => {
        return get().favourites.some(favourite => favourite.idDrink === id)
    },
    handleClickFavourite: (recipe) => {
        if(get().favouriteExists(recipe.idDrink)){
            set((state) => ({
                favourites: state.favourites.filter(favourite => favourite.idDrink !== recipe.idDrink)
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'The recipe was deleted from favourites',
                error: false
            })
        } else {
            set((state) => ({
                favourites: [...state.favourites, recipe]
            }))
            createNotificationSlice(set, get, api).showNotification({
                text: 'The recipe was added to favourites',
                error: false
            })
        }
        localStorage.setItem('favourites', JSON.stringify(get().favourites))
    },
    loadFromStorage:() => {
        const storedFavourites = localStorage.getItem('favourites')
        if(storedFavourites){
            set({
                favourites: JSON.parse(storedFavourites)
            })
        }
    }
})
