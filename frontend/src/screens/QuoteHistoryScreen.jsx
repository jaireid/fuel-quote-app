import { useSelector } from "react-redux";
import { useQuotesQuery } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const QuoteHistoryScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: quotes,
    isLoading,
  } = useQuotesQuery(undefined, userInfo._id);

  return (
    <div className="relative min-h-screen overflow-x-auto bg-gray-50 shadow-md sm:rounded-lg">
      <div className="flex flex-1 flex-col justify-center px-6 py-24 lg:px-8">
        <table className="w-full text-sm text-left text-gray-500">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Your Quotes
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Browse a list of your previous quotes.
            </p>
            {isLoading && <Loader />}
          </caption>
          <thead className="text-s text-gray-700 bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Gallons Requested
              </th>
              <th scope="col" className="px-6 py-3">
                Suggested Price
              </th>
              <th scope="col" className="px-6 py-3">
                Amount Due
              </th>
              <th scope="col" className="px-6 py-3">
                Street Address
              </th>
              <th scope="col" className="px-6 py-3">
                City, State Zip Code
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Date
              </th>
            </tr>
          </thead>
          <tbody>
            {quotes?.map((quote) => (
              <tr
                className="bg-white border-b hover:bg-gray-50"
                key={quote._id}
              >
                <td className="px-6 py-4">{quote.gallons} gal</td>
                <td className="px-6 py-4">
                  ${quote.suggestedPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4">${quote.amountDue.toFixed(2)}</td>
                <td className="px-6 py-4">{quote.address}</td>
                <td className="px-6 py-4">
                  {quote.city}, {quote.state} {quote.zipcode}
                </td>
                <td className="px-6 py-4">
                  {new Date(quote.deliveryDate).toLocaleDateString("en-US")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuoteHistoryScreen;
