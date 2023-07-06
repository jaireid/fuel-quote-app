import { useState } from "react";

const QuoteHistoryScreen = () => {
  const [gallons, setGallons] = useState(0);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [suggestedPrice, setSuggestedPrice] = useState(0);
  const [amountDue, setAmountDue] = useState(0);

  return (
    <div className="relative min-h-screen overflow-x-auto bg-gray-50 shadow-md sm:rounded-lg">
      <div className="flex flex-1 flex-col justify-center px-6 py-24 lg:px-8">
        <table className="w-full text-sm text-left text-gray-500">
          <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Your Quotes
            <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Browse a list of your previous quotes.
            </p>
          </caption>
          <thead className="text-s text-gray-700 bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Gallons Requested
              </th>
              <th scope="col" className="px-6 py-3">
                State
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Date
              </th>
              <th scope="col" className="px-6 py-3">
                Suggested Price
              </th>
              <th scope="col" className="px-6 py-3">
                Amount Due
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">500 gal</td>
              <td className="px-6 py-4">Texas</td>
              <td className="px-6 py-4">Houston</td>
              <td className="px-6 py-4">07/13/2023</td>
              <td className="px-6 py-4">$2.50</td>
              <td className="px-6 py-4">$1250</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuoteHistoryScreen;
