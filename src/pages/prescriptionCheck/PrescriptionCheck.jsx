import "./PrescriptionCheck.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { prescriptionRoute } from "../../utils/APIRoutes";

export default function PrescriptionList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(prescriptionRoute)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  }, []);

  const columns = [
    {
      field: "user",
      headerName: "user",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row._doc.user.firstname}
          </div>
        );
      },
    },
    {
      field: "product",
      headerName: "product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {params.row._doc.product.productname}
          </div>
        );
      },
    },
    {
      field: "prescriptions",
      headerName: "prescriptions",
      width: 350,
      renderCell: (params) => {
        return (
          <div className="productListItem">{params.row._doc.prescription}</div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              style={{ backgroundColor: "black" }}
              className="productListEdit"
            >
              ✖
            </button>
            <button
              style={{ backgroundColor: "black" }}
              className="productListEdit"
            >
              ✔
            </button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="productList">
          <h1 style={{ color: "darkblue" }}>Prescriptions</h1>
          <DataGrid
            rows={data}
            disableSelectionOnClick
            columns={columns}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
}
