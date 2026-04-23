import User from "./usermodel.js";
import Book from "./bookmodel.js";

export { User, Book };
export default {
    User,
    Book,
};
// This file serves as an index for all the models in the application. It imports the user and book models and exports them as a single object, making it easier to manage and import models throughout the application.
// By using this index file, you can simply import the models from this file instead of importing each model individually in other parts of the application. For example, you can do:
// const { User, Book } = require('./data/models');