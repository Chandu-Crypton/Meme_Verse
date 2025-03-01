const NotFound = () => {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-4">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="text-blue-600 hover:underline">
          Go back to Home
        </a>
      </div>
    );
  };
  
  export default NotFound;
  