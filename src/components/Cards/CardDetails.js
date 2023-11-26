//* Packages Imports */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//* Components Imports */
import EpisodeList from "./EpisodeList";

//* Styles Imports */
import styles from "./Card.module.scss"

const CardDetails = () => {
  let { id } = useParams();

  let [fetchedData, updateFetchedData] = useState([]);
  let { name, location, origin, gender, image, status, species, episode } =
    fetchedData;

    //* API url for Characters by Id
  let api = `https://rickandmortyapi.com/api/character/${id}`;

  //* Handler to Fetch Characters 
  useEffect(() => {
    const fetchData = async () => {
      let data = await fetch(api).then((res) => res.json());
      updateFetchedData(data);
    };

    fetchData();
  }, [api]);

  //* Handler for Fetching Episodes by Character
  useEffect(() => {
    if (episode && episode.length) {
      const fetchEpisodeData = async () => {
        let episodeNames = await Promise.all(
          episode.map((episodeUrl) =>
            fetch(episodeUrl).then((res) => res.json())
          )
        );

        updateFetchedData((prevData) => ({ ...prevData, episodeNames }));
      };

      fetchEpisodeData();
    }
  }, [episode]);

  //* Mapper for Episode Names
  const epiNames = fetchedData?.episodeNames?.map((episode, index) => (
    <div key={index}>{episode.name}</div>
  ));

  return (
    <div className="container d-flex justify-content-center mb-5 gap-3">
      <div
        className={`${styles.cards} d-flex flex-column gap-3`}
       >
            <img
              src={image}
              alt={name}
              className={` ${styles.img} img-fluid`}
            />
        {(() => {
          if (status === "Dead") {
            return <div className="badge bg-danger fs-5 m-2">{status}</div>;
          } else if (status === "Alive") {
            return <div className="badge bg-success fs-5 m-2">{status}</div>;
          } else {
            return <div className="badge bg-secondary fs-5 m-2">{status}</div>;
          }
        })()}
        <div className="content m-2">
          <div className="">
            <span className="fw-bold">Name : </span>
            {name}
          </div>
          <div className="">
            <span className="fw-bold">Gender : </span>
            {gender}
          </div>
          <div className="">
            <span className="fw-bold"> Current Location: </span>
            {location?.name}
          </div>
          <div className="">
            <span className="fw-bold">Origin: </span>
            {origin?.name}
          </div>
          <div className="">
            <span className="fw-bold">Species: </span>
            {species}
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-12 mb-4">
        {fetchedData.episodeNames && episode.length > 0 && (
          <EpisodeList episodeNames={epiNames} />
        )}
      </div>
    </div>
  );
};

export default CardDetails;
