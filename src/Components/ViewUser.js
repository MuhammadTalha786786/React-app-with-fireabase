import React from "react";
import { db } from "./firebase";

class ViewUser extends React.Component {
  state = {
    users: null,
  };
  componentDidMount() {
    console.log("render");
    db.collection("users")
      .get()
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((user) => {
          const data = user.data();
          users.push(data);
        });
        this.setState({ users: users });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <>
        <h3 className="text-center text-primary">Added Users</h3>

        <br />

        <div class="table-responsive-sm">
          <table class="table table-responsive table-hover table-bordered table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Cell Number</th>
                <th scope="col">Age</th>
              </tr>
            </thead>

            {this.state.users &&
              this.state.users.map((user) => {
                return (
                  <tbody>
                    <tr>
                      <th>{user.name}</th>
                      <td>{user.Email}</td>
                      <td>{user.Cellnumber}</td>
                      <td>{user.age}</td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </>
    );
  }
}
export default ViewUser;
