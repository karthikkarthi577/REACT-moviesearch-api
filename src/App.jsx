import React, { Fragment, useState } from "react";
import Axios from "axios";
import "./App.css";
import Paginate from "./Paginate";

const App = () => {
  const [search, setSearch] = useState("");
  let [moviedata, setMoviedata] = useState([]);
  let [paginate, setPaginate] = useState([]);

  const handle = e => {
    console.log(e.target);
    setSearch(e.target.value);
  };

  const handleSubmit = async e => {
    console.log(search);
    e.preventDefault();
    let data = await Axios.get(
      `https://www.omdbapi.com/?s=${search}&apikey=eb739b3d `
    );
    setMoviedata(data.data.Search);
    setPaginate(data.data.Search.slice(0, 6));
    console.log(moviedata);
  };

  let PaginateFunction = number => {
    setPaginate(moviedata.slice(number * 6 - 6, number * 6));
  };


  // downlod file code

  let download = url => {
    fetch(url).then(response => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.png");
        document.body.appendChild(link);
        link.click();
      });
    });
  };

  return (
    <>
      <section className="navbar">
        <article>
          <div className="search">
            <form onSubmit={handleSubmit}>
              <div className="navContent">
                <div className="left">
                  <p style={{ color: "white", fontSize: "26px" }}>MovieAdda</p>
                </div>
                <div className="right">
                  <input
                    type="text"
                    name="search"
                    value={search}
                    onChange={handle}
                    placeholder="Search Movie"
                    style={{ width: "200px" }}
                  />
                  <input
                    type="submit"
                    value="search"
                    style={{ width: "70px" }}
                  />
                </div>
              </div>
            </form>
          </div>
        </article>
      </section>

      <section className="movieData">
        <article>
          <div className="mainContent">
            <>
              <main>
                {paginate.map(x => {
                  return (
                    <Fragment>
                      <div className="content">
                        <img src={x.Poster} alt={x.Title} />
                        <p style={{ fontWeight: "bold", padding: "10px" }}>
                          {x.Title}
                        </p>
                        <p style={{ padding: "10px" }}>{x.Year}</p>
                        <center>
                          <button>
                            <a
                              href={`http://www.imdb.com/title/${x.imdbID}`}
                              target="_blank"
                            >
                              WatchHere
                            </a>
                          </button>

                          <a
                            onClick={() => {
                              download(x.Poster);
                            }}
                            style={{
                              color: "white",
                              background: "red",
                              padding:"9px 5px 9px 5px",
                              width: "130px",
                              marginLeft: "10px",
                              borderRadius: "5px",
                              marginTop:"4px"
                            }}
                          >
                            Download Poster
                          </a>
                        </center>
                      </div>
                    </Fragment>
                  );
                })}
              </main>
            </>
          </div>
        </article>
      </section>
      <Paginate data={moviedata} page={PaginateFunction} />
    </>
  );
};

export default App;
