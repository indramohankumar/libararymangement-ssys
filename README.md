# 📚 Library Management System (Backend)

A simple and efficient **Library Management System API** built using **Node.js** and **Express.js**.
This project allows you to manage users and books with basic CRUD operations.

---

## 🚀 Features

* 👤 Manage Users (Create, Read, Update, Delete)
* 📖 Manage Books (Create, Read, Update, Delete)
* 🔍 Fetch user/book by ID
* ⚡ Fast and lightweight REST API
* 🧩 Modular route structure

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **JavaScript (ES6 / CommonJS)**
* **MONGODB (for data storage)

---

## 📁 Project Structure

```
├── controllers/        # Business logic
├── data/               # (Deprecated - previously JSON storage)
├── dto/                # Data Transfer Objects
├── routes/             # API routes
├── databaseconnection.js  # MongoDB connection setup
├── index.js            # Entry point
├── package.json
```

---

## ⚙️ Installation & Setup

1. Clone the repository:

```
git clone https://github.com/indramohankumar/libararymangement-ssys.git
```

2. Navigate to the project folder:

```
cd libararymangement-ssys
```

3. Install dependencies:

```
npm install
```

4. Start the server:

```
npm start
```

or (for development):

```
npx nodemon index.js
```

---

## 🌐 API Endpoints

### 👤 Users

| Method | Endpoint   | Description     |
| ------ | ---------- | --------------- |
| GET    | /users     | Get all users   |
| GET    | /users/:id | Get user by ID  |
| POST   | /users     | Create new user |
| PUT    | /users/:id | Update user     |
| DELETE | /users/:id | Delete user     |

---

### 📖 Books

| Method | Endpoint   | Description    |
| ------ | ---------- | -------------- |
| GET    | /books     | Get all books  |
| GET    | /books/:id | Get book by ID |
| POST   | /books     | Add new book   |
| PUT    | /books/:id | Update book    |
| DELETE | /books/:id | Delete book    |

---

## 🧪 Example Request

### Create User

```
POST /users
```

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

## ⚠️ Limitations

* Data is stored in Mongoose database 
* Authentication implemented
* production-ready (for learning purposes)

---

## 🎯 Future Improvements

* 📊 Implementation of mern security and auth


---

## 🤝 Contributing

Feel free to fork this repository and contribute improvements!

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---

## 👨‍💻 Author

**Indramohan Kumar**
mongodb+srv://Mohan:<db_password>@cluster0.flckklh.mongodb.net/?appName=Cluster0

## MVC Architecture
  >>m:Model (structure of our mongodb)
  >>v:view(frontend)
  >>c:controller(brain/logic of the route)

  ## DTO (data transfer object)

