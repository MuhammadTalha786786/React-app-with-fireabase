import React from 'react';
import { db } from '../../../Components/firebase';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import '../../../Styles/StyleGuide.css';
import { StyleGuide } from '../../../Components/StyleGuide';

class ViewUser extends React.Component {
  state = {
    users: null,
  };
  componentDidMount() {
    console.log('render');
    db.collection('users')
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
        <h3
          className='text-center fontFamily'
          style={{ color: StyleGuide.color.color1 }}
        >
          Added Users
        </h3>

        <br />

        <div class='table-responsive-lg mt-3'>
          <table class='table table-responsive table-hover table-bordered table-striped table-light'>
            <thead>
              <tr className='fontFamily'>
                <th scope='col'>Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Cell Number</th>
                <th scope='col'>Ages</th>
                <th scope='col'>Delete</th>
              </tr>
            </thead>

            {this.state.users &&
              this.state.users.map((user) => {
                return (
                  <tbody className='fontFamily'>
                    <tr>
                      <th>{user.name}</th>
                      <td>{user.Email}</td>
                      <td>{user.Cellnumber}</td>
                      <td>{user.age}</td>
                      <td>
                        <IconButton aria-label='delete'>
                          <DeleteIcon />
                        </IconButton>
                      </td>
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
