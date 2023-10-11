
export default function Cart( ) {
  return (
    <div className="bg-white p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
        <p>Your cart is empty.</p>
        <ul>
              <div className="text-right">
                <button className="text-red-500 hover:text-red-700">Remove</button>
              </div>
        </ul>
    </div>
  );
}

