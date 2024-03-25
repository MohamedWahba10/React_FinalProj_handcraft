import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import "./AdminUser.css";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function AdminUser() {
  const [deleteUserId, setDeleteUserId] = useState(null);

  let [userData, setUserData] = useState([]);

  async function AllUser() {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/allUser/`, {
            headers: {
              Authorization: `Token ${localStorage.getItem("userToken")}`,
            },
          }
      );
      console.log("response data", response);
      setUserData(response.data.Users);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  }
  async function deleteUser(id) {
    try {
      await axios.get(`http://127.0.0.1:8000/api/panel/delUser/${id}/`);
      toast.success("Category removed successfully");
      AllUser();
    } catch (error) {
      console.error("Failed to delete Category", error);
      toast.error("Failed to remove Category");
    }
  }

  useEffect(() => {
    AllUser();
  }, []);

  const handleDelete = async () => {
    await deleteUser(deleteUserId);
    setDeleteUserId(null);
  };

  const confirmDelete = (id) => {
    setDeleteUserId(id);
  };

  const cancelDelete = () => {
    setDeleteUserId(null);
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Modal show={deleteUserId !== null} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this User?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="mx-5 my-5">
        <div className="d-flex justify-content-end align-items-end">
             <Link to={'/adminPanel/AdminUser/addUser'}>
              <button className="btn_add">
                + ADD
              </button>
             </Link>
        </div>
        <div className="Table">
          <h3 className="my-3 text-center fw-bold">Users</h3>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029 " }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="left">Last Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Phone</TableCell>
                  <TableCell align="left">Address</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {userData.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.first_name}</TableCell>
                    <TableCell align="left">{row.last_name}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div onClick={handleAddToCartClick}>
                            <Link to={`updateUser/${row.id}`}>
                              <button className={`button_style update`}>
                                <i class="fa-solid fa-pen-to-square"></i>{" "}
                              </button>
                            </Link>
                          </div>
                        </div>
                        <div>
                          <div onClick={handleAddToCartClick}>
                            <button
                              className={`button_style delete`}
                              onClick={() => confirmDelete(row.id)}
                            >
                              <i class="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>{" "}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
