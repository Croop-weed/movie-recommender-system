import pandas as pd
import pickle
from fastapi import FastAPI
import json
import requests

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def fetch_poster(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key=4a168018b1aee489e956c88137f63760&language=en-US"
    response = requests.get(url)
    data = response.json()
    print("https://image.tmdb.org/t/p/original/" + data["poster_path"])
    return "https://image.tmdb.org/t/p/original/" + data["poster_path"]


def recommend(movie):
    movie_index = movies[movies["title"] == movie].index[0]
    distances = similarity[movie_index]

    movie_list = sorted(
        list(enumerate(distances)),
        reverse=True,
        key=lambda x: x[1]
    )[1:6]

    recommended_movies = []
    recommended_posters = []

    for i in movie_list:
        recommended_movies.append(movies.iloc[i[0]].title)
        print(movies.iloc[i[0]].title)
        recommended_posters.append(fetch_poster(movies.iloc[i[0]].id))

    return {
        "movies": recommended_movies,
        "posters": recommended_posters
    }
        

movies_dict = pickle.load(open("./movie.pkl","rb"))
movies = pd.DataFrame(movies_dict)

similarity = pickle.load(open('recommendation.pkl','rb'))

@app.get("/movie_list")
def movie_list():
    return movies['title'].to_list()

@app.get("/movies_recommended/{movie}")
def movies_recommended(movie):
    return recommend(movie)
