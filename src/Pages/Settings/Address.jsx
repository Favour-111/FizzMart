import React, { useEffect, useState } from "react";
import { LiaTrashAlt } from "react-icons/lia";
import { MdEdit } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";
import axios from "axios";
import { io } from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
import AddressLoader from "../../components/AddressLoader/AdressLoader";
const Address = () => {
  const socket = io("https://fizzserver-1.onrender.com", {
    transports: ["websocket", "polling"], // allow fallback
    withCredentials: true, // optional, helps if you use cookies
  });

  const [addressModal, setAddressModal] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [delLoader, setDeleteLoader] = useState(null);
  const [fetchLoader, setFetchLoader] = useState(false);
  const [loader, setAddLoader] = useState(false);
  const [defaultLoader, setDefaultLoader] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [delivery, setFee] = useState(0);

  const [addressAdd, setAddressAdd] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    SparePhoneNumber: "",
    street: "",
    city: "",
    Region: "",
    Note: "",
    Fee: 0,
    isDefault: false,
  });

  const userId = localStorage.getItem("userId");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressAdd((prev) => ({ ...prev, [name]: value }));
  };
  const fetchAllAddress = async () => {
    try {
      setFetchLoader(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API}/address/${userId}`
      );
      if (response) {
        console.log(response.data);
        setAddressList(response.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setFetchLoader(false);
    }
  };
  useEffect(() => {
    fetchAllAddress();
  }, []);
  const [locations, setLocation] = useState({});
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/countries`
        );
        const locationsData = response.data.reduce((acc, location) => {
          acc[location.country] = {
            price: location.price,
            city: location.state,
          };
          return acc;
        }, {});

        setLocation(locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    socket.on("country-added", (newLocation) => {
      setLocation((prev) => [...prev, newLocation]);
    });
    fetchLocations();
  }, []);
  console.log(locations);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);
    setSelectedState(""); // Reset state selection

    setAddressAdd((prev) => ({
      ...prev,
      Region: location, // save selected region
      city: "", // reset city when region changes
    }));

    if (location) {
      const locationPrice = locations[location].price;
      setTotalPrice(locationPrice);
    } else {
      setTotalPrice(0);
    }
  };

  const handleStateChange = (e) => {
    const city = e.target.value;
    setSelectedState(city);

    setAddressAdd((prev) => ({
      ...prev,
      Region: selectedLocation,
      city, // ✅ set selected city
    }));

    if (city) {
      const statePrice = locations[selectedLocation].city[city];
      const locationPrice = locations[selectedLocation].price;
      setTotalPrice(locationPrice + statePrice);
    }
  };

  const handleAddAddress = async () => {
    if (
      !addressAdd.FirstName ||
      !addressAdd.LastName ||
      !addressAdd.PhoneNumber ||
      !addressAdd.city ||
      !addressAdd.street ||
      !addressAdd.Region
    ) {
      console.log(addressAdd);

      toast.error("All required fields must be filled");
      return;
    }

    try {
      setAddLoader(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API}/addAddress`,
        {
          ...addressAdd,
          Fee: 0,
          userId,
        }
      );
      if (response) {
        toast.success("Address added successfully");
        fetchAllAddress();

        // Reset form
        setAddressAdd({
          FirstName: "",
          LastName: "",
          PhoneNumber: "",
          SparePhoneNumber: "",
          street: "",
          city: "",
          Region: "",
          Note: "",
          Fee: 0,
          isDefault: false,
        });

        setAddressModal(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setAddLoader(false);
    }
  };
  const handleDeleteAddress = async (id) => {
    try {
      setDeleteLoader(id);
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/address/${id}`
      );

      if (response.status === 200) {
        toast.success(" address deleted successfully");

        // Update the AllAddress state by removing the deleted address
        fetchAllAddress();
      } else {
        toast.error("problem deleting address");
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setDeleteLoader(null);
    }
  };
  const setDefaultAddress = async (id) => {
    try {
      setDefaultLoader(true);
      const response = await axios.put(
        `${process.env.REACT_APP_API}/addresses/${id}/set-default`,
        { userId } // in case your backend needs userId
      );

      if (response.status === 200) {
        toast.success("Default address selected");

        // Update state: set the clicked address as default, others as false
        setAddressList((prev) =>
          prev.map((address) => ({
            ...address,
            isDefault: address._id === id,
          }))
        );
      }
    } catch (error) {
      console.error("Error updating default address:", error);
      toast.error(error.response?.data?.message || "Server error");
    } finally {
      setDefaultLoader(false);
    }
  };

  return (
    <div className="address-body">
      <div className="address-head">
        <div className="address-header">Address({addressList.length})</div>
        <button onClick={() => setAddressModal(true)}>Add a new Address</button>
      </div>
      {addressModal && (
        <div className="address-overlay">
          <div className="add-adress-modal">
            <div className="modal-head">New Delivery Address</div>
            <div className="modal-content">
              Add new delivery address for your order delivery
            </div>
            <div className="modal-input-flex">
              <div className="modal-flex-item">
                <label htmlFor="">First name</label>
                <input
                  value={addressAdd.FirstName}
                  onChange={handleInputChange}
                  name="FirstName"
                  type="text"
                  placeholder="First name"
                />
              </div>
              <div className="modal-flex-item">
                <label htmlFor="">Last name</label>
                <input
                  value={addressAdd.LastName}
                  onChange={handleInputChange}
                  name="LastName"
                  type="text"
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="modal-input-flex">
              <div className="modal-flex-item">
                <label htmlFor="">Phone number</label>
                <input
                  value={addressAdd.PhoneNumber}
                  onChange={handleInputChange}
                  name="PhoneNumber"
                  type="text"
                  placeholder="Prefix (+234)"
                />
              </div>
              <div className="modal-flex-item">
                <label htmlFor="">Additional Phone number</label>
                <input
                  value={addressAdd.SparePhoneNumber}
                  onChange={handleInputChange}
                  name="SparePhoneNumber"
                  type="text"
                  placeholder="Prefix (+234)"
                />
              </div>
            </div>
            <div className="modal-input-flex">
              <div className="modal-flex-item-lg">
                <label htmlFor="">Delivery Address</label>
                <input
                  value={addressAdd.street}
                  onChange={handleInputChange}
                  name="street"
                  type="text"
                  placeholder="Enter Delivery Address"
                />
              </div>
            </div>
            <div className="modal-input-flex">
              <div className="modal-flex-item-lg">
                <label htmlFor="">Additional Information</label>
                <input
                  value={addressAdd.Note}
                  onChange={handleInputChange}
                  name="Note"
                  type="text"
                  placeholder="Enter Additional Information"
                />
              </div>
            </div>
            <div className="modal-input-flex">
              <div className="modal-flex-item-select">
                <label htmlFor="">Region</label>
                <select
                  className="select"
                  onChange={handleLocationChange}
                  value={selectedLocation}
                >
                  <option value="">Select Region</option>
                  {Object.keys(locations).map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-flex-item-select">
                <label htmlFor="">City</label>
                <select
                  className="select"
                  onChange={handleStateChange}
                  value={selectedState}
                  disabled={!selectedLocation}
                >
                  <option value="">Select City</option>
                  {selectedLocation &&
                    Object.keys(locations[selectedLocation].city).map(
                      (city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      )
                    )}
                </select>
              </div>
            </div>

            <div className="d-flex align-items-center gap-1 checkBox mt-3">
              <div>
                <input
                  type="checkbox"
                  checked={addressAdd.isDefault}
                  onChange={(e) =>
                    setAddressAdd((prev) => ({
                      ...prev,
                      isDefault: e.target.checked,
                    }))
                  }
                />
              </div>
              <div className="mt-1">
                <label htmlFor="">Set as default</label>
              </div>
            </div>

            <div className="add-address-modal">
              <button onClick={handleAddAddress}>
                {loader ? "loading..." : "Add Address"}
              </button>
            </div>
            <div
              className="cancel-modal-btn"
              onClick={() => setAddressModal(false)}
            >
              <RiCloseLargeFill />
            </div>
          </div>
        </div>
      )}
      {fetchLoader ? (
        <div className="address-item-loader">
          <AddressLoader />
          <AddressLoader />
        </div>
      ) : addressList.length === 0 ? (
        <div className="empty-text">no address present add a new address</div>
      ) : (
        <div className="address-item-body">
          {addressList.map((item) => (
            <div className="address-item">
              <div className="address-top">
                <div className="address-name">
                  <span>{item.FirstName}</span> {"  "}
                  <span>{item.LastName}</span>
                </div>
                <div className="address-main-text">{item.Region}</div>
                <div className="address-main-text">{item.street}</div>
                <div className="address-main-text">{item.city}</div>
                <div className="address-number">{item.PhoneNumber}</div>
                <div className="address-number mt-2">
                  {item.SparePhoneNumber}
                </div>
                {item.isDefault ? (
                  <div className="default-name btn btn-outline-success">
                    Default Address
                  </div>
                ) : null}
              </div>
              <div className="address-line"></div>
              <div className="address-item-bottom">
                {item.isDefault ? (
                  <div className="default-text">Default Address</div>
                ) : (
                  <div
                    className="default-text-active"
                    onClick={() => setDefaultAddress(item._id)}
                    style={{ cursor: "pointer" }}
                  >
                    {defaultLoader ? "Updating..." : "Set as default"}
                  </div>
                )}

                <div className="d-flex align-items-center gap-2">
                  {delLoader === item._id ? (
                    <div className="bottom-address-icon">
                      <div
                        className="spinner-border spinner-border-sm"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleDeleteAddress(item._id)}
                      className="bottom-address-icon"
                    >
                      <LiaTrashAlt />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Address;
