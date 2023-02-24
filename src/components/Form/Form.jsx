import './Form.css';

export default function Form() {
  return(
      <div className="container">
          <section id="content">
              <form action="">
                  <h1>Fuel Quote Form</h1>
                  <div>
                      <label htmlFor="gallons">Gallons Requested: </label>
                      <input type="number" id="gallons" name="gallons" placeholder="Gallons" required />
                  </div>
                  <div>
                      <label htmlFor="deliveryAddress">Delivery Address:</label>
                      <input type="text" id="deliveryAddress" name="deliveryAddress" value="123 Main Street" readOnly={true} />
                  </div>
                  <div>
                      <label htmlFor="deliveryDate">Delivery Date: </label>
                      <input type="date" id="deliveryDate" name="deliveryDate" />
                  </div>
                  <div>
                      <label htmlFor="suggestedPrice">Suggested Price: </label>
                      <input type="number" id="suggestedPrice" name="suggestedPrice" value="4.50" readOnly={true} />
                  </div>
                  <div>
                      <label htmlFor="amount">Total Amount Due: </label>
                      <input type="number" id="amount" name="amount" value="90" readOnly={true} />
                  </div>
              </form>
          </section>
      </div>
  )
};