export default function CancelPage() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white shadow-md rounded-xl p-10 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
          <p className="text-gray-600">Your booking was not completed. Please try again later.</p>
        </div>
      </div>
    );
  }
  