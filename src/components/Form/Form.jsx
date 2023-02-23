import './Form.css';

export default function Form() {
  return(
      <div class="container">
          <section id="content">
              <form action="">
                  <h1>Fuel Quote Form</h1>
                  <div>
                      <label for="gallons">Gallons Requested: </label>
                      <input type="number" id="gallons" name="gallons" placeholder="Gallons" required />
                  </div>
                  <div>
                      <label for="deliveryAddress">Delivery Address:</label>
                      <input type="text" id="deliveryAddressy" name="deliveryAddress" value="123 Main Street" readonly />
                  </div>
                  <div>
                      <label for="deliveryDate">Delivery Date: </label>
                      <input type="date" id="deliveryDate" name="deliveryDate" />
                  </div>
                  <div>
                      <label for="suggestedPrice">Suggested Price: </label>
                      <input type="number" id="suggestedPrice" name="suggestedPrice" value="4.50" readonly />
                  </div>
                  <div>
                      <label for="amount">Total Amount Due: </label>
                      <input type="number" id="amount" name="amount" value="90" readonly />
                  </div>
              </form>
          </section>
      </div>
  )
};