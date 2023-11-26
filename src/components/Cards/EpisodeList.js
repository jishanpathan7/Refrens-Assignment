//* Packages Imports */
import React from "react";

const EpisodeList = ({ episodeNames }) => (
  <div className="input-group mb-3">
    <select className="form-select" id="Episodes">
      <option value="1">Episodes...</option>
      {episodeNames.map((episodeName, index) => (
        <option key={index}>{episodeName}</option>
      ))}
    </select>
  </div>
);

export default EpisodeList;
