type Movie = {
    name: string;
    year: number;
  }
  
async function getMovies() {
    const res = await fetch(`http://localhost:8080/api/v1/movies`, {
      method: 'GET',
      cache: 'no-store',
    });
  
    return res.json();
  }

export default async function Movies() {
    const moviesData = getMovies();
    const movies: Movie[] = await moviesData;

    console.log(movies[0].name);

    return (
    <div className="flex flex-col items-center justify-center h-screen">
        {movies.map((movie) => (
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2"/> 
                    <div className="collapse-title text-xl font-medium">
                    {movie.name}
                    </div>
                <div className="collapse-content"> 
                    <p>Year of Production: {movie.year}</p>
                </div>
          </div>
        ))}
    </div>
    )
  }

