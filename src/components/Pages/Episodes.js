//* Packages Imports */
import React, { useState, useEffect } from "react";

//* Components Imports */
import Cards from "../Cards/Cards";
import InputGroup from "../Filters/Category/InputGroup";


const Episodes = () => {
  let [id, setId] = useState(1);
  let [info, setInfo] = useState([]);
  let { air_date, name } = info;
  let [results, setResults] = useState([]);

  // API url of episodes 
  let api = `https://rickandmortyapi.com/api/episode/${id}`;

  //* Handler to fetch Episodes By Character Id
  useEffect(() => {
    (async function () {
      const data = await fetch(api).then((res) => res.json());
      setInfo(data);
      const dataCharacters = await Promise.all(
        data.characters.map((ele) => {
          return fetch(ele).then((res) => res.json());
        })
      );
      setResults(dataCharacters);
    })();
  }, [api]);

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center mb-3">
          Episode name :{" "}
          <span className="text-success">{name === "" ? "Unknown" : name}</span>
        </h1>
        <h5 className="text-center mb-4">Air Date {air_date}</h5>
      </div>
         <div className="row d-flex justify-content-center">
        <div className="col-lg-3 col-12 mb-4">
          <h4 className="text-center mb-4">Pick Location</h4>
          <InputGroup name="Location" changeID={setId} total={126} />
        </div>
        <div className="row d-flex justify-content-center gap-4">
          <div className="col-lg-8 col-12">
            <div className="row">
              <Cards page="/location/" results={results} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episodes;
