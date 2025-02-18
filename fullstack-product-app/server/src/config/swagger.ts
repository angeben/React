import swaggerJSDoc from "swagger-jsdoc"
import { SwaggerUiOptions } from "swagger-ui-express"

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations with products'
            }
        ],
        info: {
            title: 'REST API with Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },
    apis: ['./src/router.ts']
}
const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customSiteTitle: 'REST API Documentation',
    customCss: `
        .swagger-ui .topbar {
            background-color: #000080
        }
    `
}

export default swaggerSpec
export {swaggerUiOptions}