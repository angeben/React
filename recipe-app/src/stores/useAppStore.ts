import { create } from "zustand"
import { createRecipeSlice, RecipesSliceType } from "./recipeSlice"
import { createFavouritesSlice, FavouritesSliceType } from "./favouritesSlice"
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice"

export const useAppStore = create<RecipesSliceType & FavouritesSliceType & NotificationSliceType>((...a) => ({
    ...createRecipeSlice(...a),
    ...createFavouritesSlice(...a),
    ...createNotificationSlice(...a)
}))