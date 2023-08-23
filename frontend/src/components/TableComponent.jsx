import React,{useState} from "react";
import Table from "react-bootstrap/Table";
import Form from 'react-bootstrap/Form';

const TableComponent = ({ users }) => {
  
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Form>
      <Form.Group className="mt-3" controlId="exampleForm.ControlInput1">
        
        <Form.Control style={{width:"500px"}} value={searchQuery} type="text" placeholder="Search" onChange={handleSearch} />
      </Form.Group>
    </Form>
    <br/>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>SL NO</th>
          <th>NAME</th>
          <th>EMAIL</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  
    </>
  );
};

export default TableComponent;