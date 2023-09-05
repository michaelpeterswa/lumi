type Movie = {
    name: string;
    year: number;
  }
  
async function getMovies() {
    const res = await fetch(`${process.env.BACKEND_HOST_URL}/api/v1/movies`, {
      method: 'GET',
      cache: 'no-store',
    });
  
    return res.json();
  }

export default async function Movies() {
    const moviesData = getMovies();
    const movies: Movie[] = await moviesData;
    
    return (
    <div className="flex flex-col items-center justify-center h-screen">
        {movies.map((movie) => (
            <div className="collapse collapse-arrow bg-base-200 my-2">
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

