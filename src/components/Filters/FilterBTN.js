//* Packages Imports */
import React from "react";

const FilterBTN = ({ input, task, updatePageNumber, index, name }) =>  (
    <div>
      <style>
        {`
          .form-check-input:checked + label {
            background-color: #198754;
            color: white;
          }
          input[type="radio"] {
            display: none;
          }
        `}
      </style>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name={name}
          id={`${name}-${index}`}
        />
        <label
          onClick={(x) => {
            task(input);
            updatePageNumber(1);
          }}
          className="btn btn-outline-success"
          for={`${name}-${index}`}
        >
          {input}
        </label>
      </div>
    </div>
  );

export default FilterBTN;
