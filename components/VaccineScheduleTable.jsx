import React from 'react'

const VaccineScheduleTable = ({ vaccineSchedule, vacItems }) => {
    return (
      <table border="1">
        <thead>
          <tr>
            <th>Vaccine Name</th>
            <th>First Dose Date</th>
            <th>Second Dose Date</th>
            <th>Third Dose Date</th>
            <th>Fourth Dose Date</th>
            <th>Fifth Dose Date</th>
          </tr>
        </thead>
        <tbody>
          {vacItems.map(vacItem => (
            <tr key={vacItem.id}>
              <td>{vacItem.name}</td>
              {vaccineSchedule[vacItem.id].map((date, index) => (
                <td key={index}>{date}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

export default VaccineScheduleTable