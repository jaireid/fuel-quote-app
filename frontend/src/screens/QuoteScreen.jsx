import { useState } from "react";

const QuoteScreen = () => {
  const [gallons, setGallons] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString());
  const [suggestedPrice, setSuggestedPrice] = useState(0);
  const [amountDue, setAmountDue] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50">
      <div className="flex flex-1 flex-col justify-center px-6 py-20 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Fuel Quote Form
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="gallons"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gallons Requested
              </label>
              <div className="mt-2">
                <input
                  id="gallons"
                  name="gallons"
                  type="number"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  min="0"
                  value={gallons}
                  onChange={(e) => setGallons(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="deliveryDate"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Delivery Date
              </label>
              <div className="mt-2">
                <input
                  id="deliveryDate"
                  name="deliveryDate"
                  type="date"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  min={new Date().toISOString().split("T")[0]}
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="suggestedPrice"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Suggested Price Per Gallon
              </label>
              <div className="mt-2">
                <input
                  id="suggestedPrice"
                  name="suggestedPrice"
                  type="number"
                  required
                  readOnly
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  value={suggestedPrice}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="amountDue"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Amount Due
              </label>
              <div className="mt-2">
                <input
                  id="amountDue"
                  name="amountDue"
                  type="number"
                  required
                  readOnly
                  disabled
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  value={amountDue}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Request Quote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuoteScreen;
