# 🎬 Movie Recommendation System

A content-based Movie Recommendation System built using Machine Learning, FastAPI, and React (Vite).  
The system suggests similar movies based on user selection and displays posters using TMDB API.

---

## 🚀 Features

- Search movies with autocomplete  
- Get top 5 similar movie recommendations  
- Fetch movie posters using TMDB API  
- FastAPI backend  
- React frontend  
- Pickle-based ML model  

---

## 🧠 Tech Stack

### Backend
- Python  
- FastAPI  
- Pandas  
- Scikit-learn  
- Pickle  
- Requests  

### Frontend
- React (Vite)  
- JavaScript  
- HTML  
- CSS  

---

## 📁 Project Structure

movie-recommender-system  
├── app.py  
├── movie.pkl  
├── recommendation.pkl  
├── movie-frontend  
│   ├── src  
│   └── ...  
├── myenv  
└── README.md  

---

## ⚙️ Backend Setup

Create virtual environment:

python -m venv myenv  

Activate:

myenv\Scripts\activate  

Install dependencies:

pip install fastapi uvicorn pandas scikit-learn requests  

Run server:

uvicorn app:app --reload  

Server runs at:

http://127.0.0.1:8000  

---

## 💻 Frontend Setup

cd movie-frontend  
npm install  
npm run dev  

Open browser:

http://localhost:5173  

---

## 🔗 API Endpoints

Get movie list:

GET /movie_list  

Get recommendations:

GET /movies_recommended/{movie_name}  

---

## 📌 Future Improvements

- Deploy on cloud  
- Better UI  
- User authentication  
- Collaborative filtering  
- Genre-based filtering  

---

## 👨‍💻 Author

Harshit  

---

⭐ If you like this project, consider giving it a star!
