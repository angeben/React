
## About the repository
This repository contains various projects developed with _React_ and _Vite_, mainly using _TypeScript_. Throughout the projects, different _React_ tools have been used. The first projects listed below use the more simple tools like _useState_ and _useEffect_ and the later projects use more complex ones like _useReducer_, _useContext_ or _React Router Dom_.  

## Project descriptions

Below you will be able to find a description of every project in this repository, which will include the tools used and the functionality of the applications.

<details>
  <summary>Project list</summary>
  <ol>
    <li> <a href="#guitar-shop">Guitar Shop</a></li>
    <li><a href="#order-calculator">Order Calculator</a></li>
    <li><a href="#calorie-tracker">Calorie Tracker</a></li>
    <li><a href="#expense-planner">Expense Planner</a></li>
    <li><a href="#patient-monitoring">Patient Monitoring</a></li>
    <li><a href="#climate-checker">Climate Checker</a></li>
    <li><a href="#crypto-state">Crypto State</a></li>
    <li><a href="#recipe-app">Recipe App</a></li>
  </ol>
</details>

### Guitar Shop
This is the most simple project in the repository, which consists of a web application that simulates an online shop where you have a collection of guitars that you can add or remove from your cart. This first version of the project (_guitar-shop_) is developed with _JavaScipt_ and uses the tools _useState_ and _useEffect_.
 - Project _guitar-shop-custom-hook_ is the second version of the project, where instead of using _useState_ and _useEffect_ a custom hook provides the functionality.
 - Project _guitar-shop-ts_ follows the previous version, but adding _TypeScript_ code instead of _JavaScript_
 - Project _guitar-shop-reducer_ replaces the custom hook with _useReducer_

<a href="https://angeben-guitar-shop.netlify.app/">View Demo</a>

### Order Calculator
This project (_order-calculator_) consists of a web application that simulates the process of taking an order in a restaurant, being able to click on the different options to add them to the order and select a tip amount. It is developed with _TypeScript_, using a custom hook.
- Project _order-calculator-reducer_ is the version of the project that implements _useReducer_

<a href="https://angeben-order-calculator.netlify.app/">View Demo</a>

### Calorie Tracker
Web app that simulates a tracker for calories involved in food or exercise. There is a form where the user inputs the type of activity (exercise/food) and the amount of calories involved. The app keeps track of the calories to shoe the user a summary, as well as the list of activities registered. It is developed with _TypeScript_, using _React_'s _useReducer_.
- Project _calorie-tracker-contextAPI_ is the version of the project that is implemented with _useContext_

<a href="https://angeben-calorie-tracker.netlify.app/">View Demo</a>

### Expense Planner
Web app that simulates a planner for expenses under a budget. The user submits a form with the information of a new expense, mainly its category and cost. The app saves the list of expenses to show graphically the percentage of the budget that has been spent. It is implemented with _TypeScript_, using context API (_useContext_).

<a href="https://angeben-expense-planner.netlify.app/">View Demo</a>

### Patient Monitoring
Web app to monitor information about patients. The user submits a form with information of the patient, which is stored and can be viewed in the app until the user decides to delete it. It is implemented with _TypeScript_, using _Zustand_ to manage the global state of the app.

<a href="https://angeben-patient-monitoring.netlify.app/">View Demo</a>

### Climate Checker
Web app that reads an API to provide weather information. The user can search for a city from a list of countries to retrieve its weather. It is implemented with _TypeScript_, using _Zustand_ for the global state of the app and _Axios_ and _Zod_ for the API management

<a href="https://angeben-climate-checker.netlify.app/">View Demo</a>

### Crypto State
Web app that reads an API to provide information about the most relevant cryptocurrencies. It is implemented with _TypeScript_, using _Zustand_ for the global state and _Axios_ and _Zod_ for the API management

<a href="https://angeben-crypto-prices.netlify.app/">View Demo</a>

### Recipe App
Web app that reads an API to get information about drink recipes. The user can mark a recipe as a _favourite_, which will be saved in the _Favourites_ page. This project has a home page to search for recipes and a favourites page, with the drinks saved by the user. It is implemented with _TypeScript_ and uses _React Router Dom_ to manage the different pages of the app. _Zustand_ controls the global state of the app and _Axios_ and _Zod_ are the tools used for the API management

<a href="https://angeben-recipe-search.netlify.app/">View Demo</a>

## Contact

Ángel Benítez Gómez  - benitezgomezan@gmail.com

LinkedIn profile: [https://www.linkedin.com/in/angel-benitez-gomez/](https://www.linkedin.com/in/angel-benitez-gomez/)
