import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function ViewPurchase() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [purchase, setPurchase] = useState(null);

  const [items, setItems] = useState([]);

  const [supplierName, setSupplierName] = useState("");

  useEffect(() => {

    fetch(`http://127.0.0.1:8000/purchases/${id}`)
      .then(res => res.json())
      .then(data => {

        setPurchase(data.purchase);

        setItems(data.items);

        setSupplierName(data.supplier_name);

      });

  }, [id]);

  if (!purchase) {

    return (
      <MainLayout>
        <div style={{padding:40}}>Loading...</div>
      </MainLayout>
    );

  }

  return (

    <MainLayout>

      <div
        style={{
          maxWidth:"1200px",
          margin:"auto",
          padding:"30px"
        }}
      >

        <button
          onClick={()=>navigate("/purchases")}
          style={{
            background:"#1976d2",
            color:"white",
            border:"none",
            padding:"10px 20px",
            borderRadius:"8px",
            cursor:"pointer",
            marginBottom:"25px"
          }}
        >
          ← Back
        </button>

        <div
          style={{
            background:"white",
            borderRadius:"12px",
            padding:"30px",
            boxShadow:"0 5px 20px rgba(0,0,0,.12)"
          }}
        >

          <h1
            style={{
              marginTop:0,
              color:"#1976d2"
            }}
          >
            PURCHASE INVOICE
          </h1>

          <hr/>

          <div
            style={{
              display:"grid",
              gridTemplateColumns:"1fr 1fr",
              gap:"40px",
              marginTop:"25px",
              marginBottom:"25px"
            }}
          >

            <div>

              <h3>Supplier Details</h3>

              <p><b>Supplier :</b> {supplierName}</p>

            </div>

            <div>

              <h3>Invoice Details</h3>

              <p><b>Invoice No :</b> {purchase.invoice_number}</p>

              <p><b>Date :</b> {purchase.invoice_date}</p>

            </div>

          </div>

          <table
            style={{
              width:"100%",
              borderCollapse:"collapse",
              marginTop:"20px"
            }}
          >

            <thead
              style={{
                background:"#1976d2",
                color:"white"
              }}
            >

              <tr>

                <th style={{padding:"12px"}}>Product</th>

                <th>Qty</th>

                <th>Rate</th>

                <th>Disc %</th>

                <th>Disc ₹</th>

                <th>GST %</th>

                <th>Amount</th>

              </tr>

            </thead>

            <tbody>

              {items.map(item=>(

                <tr
                  key={item.id}
                  style={{
                    borderBottom:"1px solid #eee"
                  }}
                >

                  <td style={{padding:"10px"}}>
                    {item.product_name}
                  </td>

                  <td>{item.quantity}</td>

                  <td>
                    ₹{Number(item.rate).toFixed(2)}
                  </td>

                  <td>
                    {item.discount_percent}%
                  </td>

                  <td>
                    ₹{Number(item.discount_amount).toFixed(2)}
                  </td>

                  <td>
                    {item.gst}%
                  </td>

                  <td>
                    ₹{Number(item.amount).toFixed(2)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          <div
            style={{
              width:"350px",
              marginLeft:"auto",
              marginTop:"30px",
              background:"#f8fafc",
              padding:"20px",
              borderRadius:"10px"
            }}
          >

            <table style={{width:"100%"}}>

              <tbody>

                <tr>

                  <td><b>Subtotal</b></td>

                  <td style={{textAlign:"right"}}>

                    ₹{Number(purchase.subtotal).toFixed(2)}

                  </td>

                </tr>

                <tr>

                  <td><b>GST</b></td>

                  <td style={{textAlign:"right"}}>

                    ₹{Number(purchase.gst).toFixed(2)}

                  </td>

                </tr>

                <tr
                  style={{
                    fontSize:"22px",
                    color:"#1976d2",
                    fontWeight:"bold"
                  }}
                >

                  <td>Grand Total</td>

                  <td style={{textAlign:"right"}}>

                    ₹{Number(purchase.grand_total).toFixed(2)}

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </MainLayout>

  );

}

export default ViewPurchase;