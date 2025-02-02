import { StateCreator } from "zustand"
import { getCategories, getRecipes, getRecipeById } from "../Services/RecipeService"
import type { Categories, Drinks, Drink, SearchFilter, Recipe } from "../types"

export type RecipesSliceType = {
    categories: Categories,
    drinks: Drinks,
    selectedRecipe: Recipe,
    modal: boolean,
    fetchCategories: () => Promise<void>,
    searchRecipes: (searchFilters : SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

export const createRecipeSlice : StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()
        set({categories})
    },
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)
        set({drinks})
    },
    selectRecipe: async (id) => {
        const selectedRecipe = await getRecipeById(id)
        set({selectedRecipe, modal: true})
    },
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
})