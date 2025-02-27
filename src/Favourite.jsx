import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FavouritePage = () => {
  const [favourite, setFavourite] = useState(null);
  const navigate = useNavigate();

  const addnotify = () => {
        toast.success('Package Removed Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    
    }

   

  useEffect(() => {
    const storedFavourite = localStorage.getItem("favouritePackage");
    if (storedFavourite) {
      setFavourite(JSON.parse(storedFavourite));
    }
  }, []);

  const handleAddFavorite = () => {
    navigate("/add-favorite");
  };

  const handleRemoveFavourite = () => {
    localStorage.removeItem("favouritePackage");
    setFavourite(null); 
    addnotify();
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center w-96">
        {favourite ? (
          <div className="text-left">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Favourite Package Details
            </h1>
            <div className="border p-4 rounded-md mb-4">
              <h2 className="text-lg font-semibold text-gray-700"> <strong>Package Name: </strong>{favourite.name}</h2>
              <p className="text-gray-600 mt-2"> <strong>Description: </strong>{favourite.description}</p>
              <div className="mt-4">
                <a
                  href={favourite.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline block"
                >
                  Homepage
                </a>
                <a
                  href={favourite.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline block mt-2"
                >
                  NPM Link
                </a>
              </div>
              <p className="text-gray-500 mt-4">
                <strong>Reason:</strong> {favourite.reason}
              </p>
            </div>
            <button
              onClick={handleRemoveFavourite}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg mt-4"
            >
              Remove Favourite
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome to Favourite NPM Packages
            </h1>
            <p className="text-gray-500 mb-6">You don’t have any favourites yet.</p>
          </>
        )}
        <button
          onClick={handleAddFavorite}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4"
        >
          Add Favourite
        </button>
      </div>
    </div>
  );
};

export default FavouritePage;
