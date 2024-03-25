import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import "./AdminCategory.css";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function AdminCategory() {
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  let [categoryData, setCategoryData] = useState([]);

  async function AllCategory() {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/product/category/`
      );
      console.log("response data", response.data.data);
      setCategoryData(response.data.data);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  }
  async function deleteCategory(id) {
    try {
      await axios.get(`http://127.0.0.1:8000/api/panel/delcategory/${id}/`);
      toast.success("Category removed successfully");
      AllCategory();
    } catch (error) {
      console.error("Failed to delete Category", error);
      toast.error("Failed to remove Category");
    }
  }

  useEffect(() => {
    AllCategory();
  }, []);

  const handleDelete = async () => {
    await deleteCategory(deleteCategoryId);
    setDeleteCategoryId(null);
  };

  const confirmDelete = (id) => {
    setDeleteCategoryId(id);
  };

  const cancelDelete = () => {
    setDeleteCategoryId(null);
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Modal show={deleteCategoryId !== null} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
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
             <Link to={'/adminPanel/adminCategory/addCategory'}>
              <button className="btn_add">
                + ADD
              </button>
             </Link>
        </div>
        <div className="Table">
          <h3 className="my-3 text-center fw-bold">Category</h3>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029 " }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Category Name</TableCell>
                  <TableCell align="left">Category Description</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {categoryData.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.cateName}</TableCell>
                    <TableCell align="left">{row.cateDescription}</TableCell>
                    <TableCell align="left">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div onClick={handleAddToCartClick}>
                            <Link to={`updateCategory/${row.id}`}>
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
