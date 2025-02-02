import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';

export default function Modal() {
  
  const modal = useAppStore((state) => state.modal)
  const closeModal = useAppStore((state) => state.closeModal)
  const selectedRecipe = useAppStore((state) => state.selectedRecipe)
  const handleClickFavourite = useAppStore((state) => state.handleClickFavourite)
  const favouriteExists = useAppStore((state) => state.favouriteExists)

  const renderIngredients = () => {
    const ingredients : JSX.Element[] = []
    for(let i = 1; i <= 6; ++i){
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe]
      const quantity = selectedRecipe[`strMeasure${i}` as keyof Recipe]
      if(ingredient && quantity){
        ingredients.push(
          <li key={i} className='text-lg font-normal mx-7'>
            {ingredient} - {quantity}
        </li>)
      }
    }
    return (<div>{ingredients}</div>)
  }

  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-brightness-50"/>
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                  <DialogTitle as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                      {selectedRecipe.strDrink}
                  </DialogTitle>
                  <img src={selectedRecipe.strDrinkThumb}
                        alt={`${selectedRecipe.strDrink} Image`}
                        className='mx-auto w-96 shadow-lg rounded'
                  />
                  <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Ingredients
                  </DialogTitle>
                  {renderIngredients()}             
                  <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                    Instructions
                  </DialogTitle>
                  <p className='text-lg'>{selectedRecipe.strInstructions}</p>
                  <div className='mt-5 flex justify-between gap-4'>
                    <button
                      type="button"
                      className='w-full rounded bg-gray-600 p-3 font-bold uppercase text-white shadow
                      hover:bg-gray-500'
                      onClick={closeModal}
                    >Close</button>
                    <button
                      type="button"
                      className='w-full rounded bg-orange-600 p-3 font-bold uppercase text-white shadow
                      hover:bg-orange-500'
                      onClick={() => {
                        handleClickFavourite(selectedRecipe)
                        closeModal()
                      }}
                    >{favouriteExists(selectedRecipe.idDrink) ? 'Remove from favourites' : 'Add to Favourites' }</button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}