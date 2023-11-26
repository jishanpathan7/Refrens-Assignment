//* Packages Imports */
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

//* Components Imports */
import Search from "./Search/Search";
import Filters from "./Filters/Filters";
import Cards from "./Cards/Cards";

const Home = () => {
  let [pageNumber, setPageNumber] = useState(1);
  let [search, setSearch] = useState("");
  let [status, setStatus] = useState("");
  let [gender, setGender] = useState("");
  let [species, setSpecies] = useState("");
  const [fetchedData, updateFetchedData] = useState({ info: {}, results: [] });
  const [loading, setLoading] = useState(false);

  //* API url
  const api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`;

  //* Fetching Characters From with Query
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetch(api).then((res) => res.json());
      updateFetchedData((prevData) => ({
        info: data.info,
        results:
          search !== prevData.search ||
          status !== prevData.status ||
          gender !== prevData.gender ||
          species !== prevData.species
            ? [...data.results]
            : [...prevData.results, ...data.results],
        pageNumber,
        search,
        status,
        gender,
        species,
      }));
      setLoading(false);
    };

    fetchData();
  }, [api, pageNumber, search, status, gender, species]);

  return (
    <div className="App">
      <h1 className="text-center mb-3">Rick & Morty Characters</h1>
      <Search setPageNumber={setPageNumber} setSearch={setSearch} placeholder="Search Characters..." />
      <div className="container">
        <div className="d-flex row align-items-start gap-4">
          <Filters
            setSpecies={setSpecies}
            setGender={setGender}
            setStatus={setStatus}
            setPageNumber={setPageNumber}
          />
          <InfiniteScroll
            dataLength={fetchedData.results.length}
            next={() => setPageNumber((prevPage) => prevPage + 1)}
            hasMore={fetchedData.info.next !== null}
            loader={<h4>Loading...</h4>}
            className={`infiniteContainer`}
          >
            {loading && search ? (
              <div className="spinner-border text-success" role="status">
              <span className="visually-hidden text-success">Loading...</span>
            </div>
            ) : (
              <Cards page="/" results={fetchedData.results} />
            )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Home;
