import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import "./AdminProduct.css";
import { Modal, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProduct() {
  const [deleteProductId, setDeleteProductId] = useState(null);

  let [ProductData, setProductData] = useState([]);

  async function AllProduct() {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/product/`);
      console.log("response data Productttttttttttttt", response.data.results);
      setProductData(response.data.results);
    } catch (error) {
      console.error("Error fetching Product:", error);
    }
  }
  async function deleteProduct(id) {
    try {
      await axios.get(`http://127.0.0.1:8000/api/panel/delproduct/${id}/`);
      toast.success("Product removed successfully");
      AllProduct();
    } catch (error) {
      console.error("Failed to delete Product", error);
      toast.error("Failed to remove Product");
    }
  }

  useEffect(() => {
    AllProduct();
  }, []);

  const handleDelete = async () => {
    await deleteProduct(deleteProductId);
    setDeleteProductId(null);
  };

  const confirmDelete = (id) => {
    setDeleteProductId(id);
  };

  const cancelDelete = () => {
    setDeleteProductId(null);
  };

  const handleAddToCartClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Modal show={deleteProductId !== null} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Product?</Modal.Body>
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
          <Link to={"/adminPanel/AdminProduct/addProduct"}>
            <button className="btn_add">+ ADD</button>
          </Link>
        </div>
        <div className="Table">
          <h3 className="my-3 text-center fw-bold">Products</h3>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029 " }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">ON Sale</TableCell>
                  <TableCell align="left">Stock</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Vendor</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {ProductData.map((row) => (
                  <TableRow
                    key={row.product.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.product.id}
                    </TableCell>
                    <TableCell align="left">{row.product.prodName}</TableCell>
                    <TableCell align="left">
                      {row.product.discounted_price}
                    </TableCell>
                    {/* <TableCell align="left">{row.product.prodOnSale}</TableCell> */}
                    <TableCell align="left">
                      {row.product.prodOnSale ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="left">{row.product.prodStock}</TableCell>
                    <TableCell align="left">
                      {row.product.prodDescription}
                    </TableCell>
                    <TableCell align="left">{row.vendor.shopname}</TableCell>
                    <TableCell align="left">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div onClick={handleAddToCartClick}>
                            <Link to={`updateProduct/${row.product.id}`}>
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
                              onClick={() => confirmDelete(row.product.id)}
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
