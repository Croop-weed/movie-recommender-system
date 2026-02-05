import { useState, useEffect } from "react";

function App() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/movie_list")
      .then(res => res.json())
      .then(data => setMovies(data));
  }, []);

  const getRecommendations = () => {

    if (!selectedMovie) {
      alert("Please select a movie");
      return;
    }

    fetch(`http://127.0.0.1:8000/movies_recommended/${encodeURIComponent(selectedMovie)}`)
      .then(res => res.json())
      .then(data => {
        setRecommendations(
          data.movies.map((m, i) => ({
            title: m,
            poster: data.posters[i]
          }))
        );
      });
  };

  return (
    <div style={styles.page}>

      <h1 style={styles.heading}>🎬 Movie Recommender</h1>

      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Search movie..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedMovie(e.target.value);
          }}
          style={styles.input}
        />

        <button style={styles.button} onClick={getRecommendations}>
          Recommend
        </button>
      </div>

      <div style={styles.suggestions}>
        {movies
          .filter(m => m.toLowerCase().includes(search.toLowerCase()))
          .slice(0, 6)
          .map((movie, index) => (
            <div
              key={index}
              style={styles.suggestionItem}
              onClick={() => {
                setSelectedMovie(movie);
                setSearch(movie);
              }}
            >
              {movie}
            </div>
          ))}
      </div>

      <div style={styles.grid}>
        {recommendations.map((m, index) => (
          <div key={index} style={styles.card}>
            <img src={m.poster} style={styles.poster} />
            <p style={styles.title}>{m.title}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    color: "white",
    padding: 40,
    textAlign: "center",
    fontFamily: "Arial"
  },

  heading: {
    fontSize: 42,
    marginBottom: 30
  },

  searchBox: {
    display: "flex",
    justifyContent: "center",
    gap: 10
  },

  input: {
    width: 300,
    padding: 12,
    borderRadius: 20,
    border: "none",
    outline: "none",
    fontSize: 16
  },

  button: {
    padding: "12px 20px",
    borderRadius: 20,
    border: "none",
    backgroundColor: "#ff9800",
    color: "black",
    fontWeight: "bold",
    cursor: "pointer"
  },

  suggestions: {
    marginTop: 10
  },

  suggestionItem: {
    background: "#ffffff22",
    padding: 8,
    margin: "auto",
    width: 300,
    cursor: "pointer",
    borderBottom: "1px solid #ffffff33"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))",
    gap: 25,
    marginTop: 40
  },

  card: {
    background: "#ffffff15",
    borderRadius: 15,
    padding: 15,
    transition: "transform 0.3s",
  },

  poster: {
    width: "100%",
    borderRadius: 12
  },

  title: {
    marginTop: 10,
    fontWeight: "bold"
  }
};

export default App;
