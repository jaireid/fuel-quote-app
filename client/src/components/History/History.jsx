import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

export default function History() {
  const [fillData, setFillData] = useState({});

  useEffect(() => {
    fetch('http://localhost:3059/quotes/fill')
        .then(
            response => response.json()
        )
        .then(
            data => {
                setFillData(data);
        })
  }, []);

  return (
    <>
        <h1>Fuel Quote History</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Delivery Address</th>
                    <th>Delivery Date</th>
                    <th>Gallons Requested</th>
                    <th>Suggested Price/Gallon</th>
                    <th>Total Amount Paid</th>
                </tr>
            </thead>
            <tbody>
                {fillData.map((row, index) => (
                    <tr key={index}>
                        <td>{row.address}</td>
                        <td>{row.deliveryDate}</td>
                        <td>{row.gallons}</td>
                        <td>{row.price}</td>
                        <td>{row.due}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </>
  );
}
