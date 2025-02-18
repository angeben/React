import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailabilty, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: ID of the product
 *                      example: 1                 
 *                  name:
 *                      type: string
 *                      description: Name of the product
 *                      example: Curve Monitor
 *                  price:
 *                      type: number
 *                      description: Price of the product
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: Availability of the product
 *                      example: true
 */
const router = Router()

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of the products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by ID
 *          tags:
 *              - Products
 *          description: Return a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request
 *              404:
 *                  description: Not Found
 */
router.get('/:id', 
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new product
 *          tags:
 *              - Products
 *          description: Returns a new record added to the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Curved Monitor"
 *                              price:
 *                                  type: number
 *                                  example: 300
 *          responses:
 *              201:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid input data
 */
router.post('/',
    // Validation
    body('name')
        .notEmpty().withMessage('Product name must be provided'),
    body('price')
        .isNumeric().withMessage('Price must be a number')
        .custom(value => value > 0).withMessage('Price must be a positive number')
        .notEmpty().withMessage('Product price must be provided'),
    handleInputErrors,    
    createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates an existing product with user inout
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Curved Monitor"
 *                              price:
 *                                  type: number
 *                                  example: 300
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid input data
 *              404:
 *                  description: Product Not Found
 */
router.put('/:id', 
    // Validation
    param('id').isInt().withMessage('Invalid ID'),
    body('name')
        .notEmpty().withMessage('Product name must be provided'),
    body('price')
        .isNumeric().withMessage('Price must be a number')
        .custom(value => value > 0).withMessage('Price must be a positive number')
        .notEmpty().withMessage('Product price must be provided'),
    body('availability')
        .isBoolean().withMessage('Availability must be boolean'),
    handleInputErrors,
    updateProduct
)

// Patch will change availability of a product
/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update product availability
 *          tags:
 *              - Products
 *          description: Returns the product with updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to update
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found   
 */
router.patch('/:id', 
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    updateAvailabilty
)

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: Deletes a product by a given ID
 *          tags:
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Product was deleted'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found
 */
router.delete('/:id', 
    param('id').isInt().withMessage('Invalid ID'),
    handleInputErrors,
    deleteProduct
)

export default router