import React, { Component } from "react";
import axios from "axios";

class EmployeeTable extends Component {
  // set state 
  state = {
    data: [],
    filteredResults: [],
  };

  // load employee data when page loads
  componentDidMount() {
    this.employeeData();
  }

  // get request to api
  employeeData = () => {
    axios
      .get("https://randomuser.me/api/?results=40&nat=us")
      .then((response) => {
        console.log(response.data.results);
        this.setState({
          data: response.data.results,
          filteredResults: response.data.results,
        });
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  // handle function to update state
  // this.state.filter to filter 
  handleSearch = (event) => {
    event.preventDefault();
    let searchName = event.target.value;
    let newName = this.state.data.filter(
      (name) => name.name.first.indexOf(searchName) !== -1
    );
    this.setState({
      filteredResults: newName,
    });
  };


  handleSort = () => {
    alert("Sorted names alphabetically")
    let sortedData = this.state.data.sort((a, b) => {
      return a.name.first < b.name.first ? -1 : 1;
    });
    this.setState({
      filteredResults: sortedData,
    });
  };

  // render how the page will look
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="row header-row">
            <div className="col-sm-3" />
            <div className="col-sm-6 text-center">
              <h3>Search by first name or sort by clicking on 'Name'</h3>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row main-page">
            <div className="col-sm-1" />
            <div className="col-sm-10 text-center">
              <div className="search-bar row">
                <div className="col-sm-3" />
                <div className="col-sm-6 search-div">
                  <input
                    type="text"
                    class="form-control input-search"
                    onChange={this.handleSearch}
                    placeholder="Search for employee"
                    aria-describedby="inputGroup-sizing-default"
                  />
                </div>
                <div className="col-sm-3" />
              </div>

              <table className="table table-primary">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col" onClick={this.handleSort}>
                      Name
                    </th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Age</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.filteredResults.map((user) => {
                    // console.log(user);
                    return (
                      <tr>
                        <th scope="row">
                          <img src={user.picture.medium} />
                        </th>
                        <td key={user.login.uuid}>
                          {user.name.first + " " + user.name.last}
                        </td>
                        <td>{user.phone}</td>
                        <td>
                          <a href="">{user.email}</a>
                        </td>
                        <td>{user.dob.age}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EmployeeTable;
