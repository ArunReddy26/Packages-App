import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddFavourite() {

  const navigate=useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(true);
    const [loading, setLoading] = useState(false);
    const [reason, setReason] = useState("");

    async function fetchpackages(query) {
        try {
            const response = await fetch(`https://api.npms.io/v2/search?q=${query}`);
            const data = await response.json();
            console.log("data", data.results);
            setPackages(data.results);
        } catch (error) {
            console.error("Error fetching packages:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (searchTerm) {
            setLoading(true);
            fetchpackages(searchTerm);
        }
    }, [searchTerm]);

    const handleSubmit = () => {
      if (!selectedPackage) {
        alert("Please select a package.");
        return;
      }
    
      if (!reason.trim()) {
        alert("Please select the package and provide a reason.");
        return;
      }
    
      const selectedPkgDetails = packages.find(
        (pkg) => pkg.package.name === selectedPackage
      );
    
      if (selectedPkgDetails) {
        const { name, description, links } = selectedPkgDetails.package;
        const favourite = {
          name,
          description,
          homepage: links.homepage,
          npm: links.npm,
          reason,
        };
    
        // Store the favorite package in localStorage
        localStorage.setItem("favouritePackage", JSON.stringify(favourite));
    
        console.log("Favourite Package Stored:", favourite);
        alert(`Successfully added: ${name}`);
    
        // Navigate back to the FavouritePage
        navigate("/");
      } else {
        alert("Error storing the package details. Please try again.");
      }
    };

    return (
        <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1>Favourite NPM Packages</h1>
            <input
                type="text"
                placeholder="Search for NPM packages..."
                style={{
                    width: "300px",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {loading && <p>Loading...</p>}
            {!loading && packages.length > 0 && (
                <ul style={{ listStyleType: "none", padding: 0, marginTop: "20px" }}>
                    {packages.map((pkg) => (
                        <li
                            key={pkg.package.name}
                            style={{
                                marginBottom: "10px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <input
                                type="radio"
                                name="npmPackage"
                                value={pkg.package.name}
                                checked={selectedPackage === pkg.package.name}
                                onChange={() => setSelectedPackage(pkg.package.name)}
                                style={{ marginRight: "10px" }}
                            />
                            <h3>{pkg.package.name}</h3>
                        </li>
                    ))}
                </ul>
            )}

            {selectedPackage && (
                <div style={{ marginTop: "20px" }}>
                    <textarea
                        placeholder="Why is this your favorite?"
                        style={{
                            width: "100%",
                            minHeight: "100px",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            resize: "none",
                        }}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                    />
                    <button
                        onClick={handleSubmit}
                        style={{
                            marginTop: "10px",
                            float: "right",
                            padding: "10px 20px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}

export default AddFavourite;
