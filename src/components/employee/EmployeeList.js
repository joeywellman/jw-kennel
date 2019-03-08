import React, { Component } from 'react';
import EmployeeIcon from './EmployeeIcon.png';
import './Employee.css';
import AnimalCard from '../animal/AnimalCard';

export default class EmployeeList extends Component {
  render() {
    return (
      //         return (
      //             <section className="employees">
      //             {
      //                 this.props.employees.map(employee =>
      //                     <div key={employee.id}>
      //                         {employee.name}
      //                     </div>
      //                 )
      //             }
      //             </section>
// .map loops through list of employees
    <section className="employee">
    <h3><u>Employees</u></h3>
      <div className="employees">
        {this.props.employees.map(employee => (
          <div key={employee.id} className="card-employee">
            <div className="card-body-employee">
              <div className="card-title-employee">
                <img src={EmployeeIcon} className="EmployeeIcon" alt="Employee Icon" />
                <h5>Name:</h5>
                <h4 className="bold-name">{employee.name}</h4>
                <h6>(EEID: #0000{employee.id})</h6>
                <button className=""><a href = "true" onClick={() => this.props.deleteEmployee(employee.id)} className="employeeBtnDelete">Fire Employee!!!</a></button>
              </div>
              <br></br>
              <h6 className="card-subtitle mb-2 text-muted"><u>Caretaker for:</u></h6>
              </div>
              <div className="animals-caretaker">
                {this.props.animals
                  // this .filter() returns an array of all items where this condition is true
                  .filter(anml => anml.employeeId === employee.id)
                  //this .map() loops over the new array (made from the above .filter()) of the animals who match the employee ID and re-renders our reusable component (to make the cards)
                  .map(anml => (
                    <AnimalCard key={anml.id} animal={anml} {...this.props} />
                  ))}
              </div>
          </div>
        ))}
      </div>
    </section>
    );
  }
}

// export default EmployeeList


//               <h5>Name:</h5>
//               <h4 className="bold-name">{animal.name}</h4>
//               <h6 >Breed:</h6>
//               <h6 className="bold-name">{animal.breed}</h6>
//               <button className="cardBtnDelete" onClick={() => this.props.deleteAnimal(animal.id)
//                 .then(() => this.props.history.push("/animals"))}>Delete / <br></br>Discharge</button>
//               </div>
//             </div>
//           </div>
//       </section>
//     );
//   }
// }

// // export default class AnimalDetail