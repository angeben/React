import { ActionFunctionArgs, Link, useActionData, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { Form } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { getProductById, updateProduct } from "../services/ProductServce"
import { Product } from "../types"
import ProductForm from "../components/ProductForm"

export async function loader({params} : LoaderFunctionArgs) {
    if(params.id !== undefined){
        const product = await getProductById(+params.id)
        if(!product) {
            throw new Response('', {status: 404, statusText: 'Not Found'})
        }
        return product
    }
    return {}
}

export async function action({request, params} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if(Object.values(data).includes('')){
        error = 'All fields must be completed'
    }
    if(error.length){
        return error
    }

    if(params.id !== undefined){
        await updateProduct(data, +params.id)
        return redirect('/')
    }
    return {}
}

const availabilityOptions = [
    { name: 'Available', value: true},
    { name: 'Not Available', value: false}
 ]

export default function EditProduct() {

    const product = useLoaderData() as Product
    const error = useActionData() as string
    
    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Edit Product</h2>
                <Link 
                    to={"/"} 
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white
                    shadow-sm hover:bg-indigo-500"
                >
                    Return to products
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form 
                className="mt-10"
                method="POST"
            >
                <ProductForm product={product}/>
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Availability:</label>
                    <select 
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                    {availabilityOptions.map(option => (
                        <option key={option.name} value={option.value.toString()}>{option.name}</option>
                    ))}
                    </select>
                </div>
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded uppercase"
                    value="Save changes"
                />
            </Form>
        </>
      )
}
