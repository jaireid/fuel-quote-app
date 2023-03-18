import Table from 'react-bootstrap/Table';

function BasicExample() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Gallons Requested</th>
          <th>Delivery Address</th>
          <th>Delivery Date</th>
         <th>Suggested Price/Gallon</th>
         <th>Total Amount Paid</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>10</td>
          <td>123 Main St</td>
          <td>2022-02-20</td>
          <td>$4.50</td>
          <td>$45.00</td>
        </tr>
        <tr>
          <td>20</td>
          <td>456 Fake St</td>
          <td>2022-01-25</td>
          <td>$4.50</td>
          <td>$90.00</td>
        </tr>
        <tr>
          <td>100</td>
          <td>789 Real St</td>
          <td>2021-12-23</td>
          <td>$4.50</td>
          <td>$450.00</td>
        </tr>
        <tr>
          <td>1500</td>
          <td>1234 True St</td>
          <td>2021-11-27</td>
          <td>$4.50</td>
          <td>$6750.00</td>
        </tr>
      </tbody>
  </Table>
  );
}

export default BasicExample;
