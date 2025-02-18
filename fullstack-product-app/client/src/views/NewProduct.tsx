import { ActionFunctionArgs, Link, useActionData, redirect } from "react-router-dom"
import { Form } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductServce"
import ProductForm from "../components/ProductForm"

export async function action({request} : ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData())
    let error = ''
    if(Object.values(data).includes('')){
        error = 'All fields must be completed'
    }
    if(error.length){
        return error
    }

    await addProduct(data)

    return redirect('/')
}

export default function NewProduct() {

    const error = useActionData() as string

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Add Product</h2>
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
                <ProductForm />
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded uppercase"
                    value="Add new product"
                />
            </Form>
        </>
      )
}
