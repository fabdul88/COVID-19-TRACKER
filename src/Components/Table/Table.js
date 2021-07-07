import React from "react";

const Table = ({ countries }) => {
  return (
    <div className="table">
      <table>
        <tbody>
          {countries.map(({ country, cases }, index) => (
            <tr key={index}>
              <td>{country}</td>
              <td>{cases}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
