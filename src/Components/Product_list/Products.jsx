import React, { useEffect, useState } from "react";
import Product from "../Product/Product"
import "./Products.css";
import {getdatafromlocalstorage} from '../../Utils/Utils'

const Products = () => {
  const [productsList, setProductsList] = useState(getdatafromlocalstorage());

  const handlesubmit = (event) => {
    event.preventDefault();
    const inputValues = {};
    const elementValues = [...event.target.elements];

    elementValues.map((item) => {
      if (item.tagName !== "BUTTON") {
        if (item.type === "radio" && item.checked) {
          inputValues[item.name] = item.value;
          item.checked = false;
        } else if (item.type === "checkbox" && item.checked) {
          inputValues[item.name] = item.value;
          item.checked = false;
        } else if (item.type !== "radio" && item.type !== "checkbox") {
          inputValues[item.name] = item.value;
        }
      }
    });




    const compareTo = productsList.reduce((acc, current) => {
      acc.push(current.clothId);
      return acc;
    }, []);

    if(!isNaN(parseFloat(inputValues.clothName))){
      alert(`invalid clothName`)
      return
    }

    if (compareTo.includes(inputValues.clothId)) {
      return alert("You have to provide unique cloth Id Number");
    }


    if (inputValues.clothPrice < 0 || inputValues.clothPrice > 9999) {
      alert(`Price range is 0 to 9999 you can't add more or less`);
      return;
    }

    if (inputValues.clothQuantity < 0 || inputValues.clothQuantity > 15) {
      alert(`Limit is up to 15`);
      return;
    }

    //set all clothList to productList state
    setProductsList([...productsList, inputValues]);
    console.log(event.target.input);
    event.target.reset();
  };

  //remove all clothList
  const removeAllHandler = () => {
    setProductsList([]);
  };

  //delete single clothList
  const singlelDeleteHandler = (id) => {
    const filteredList = productsList.filter((item) => item.clothId !== id);
    setProductsList(filteredList);
  };

  //setItem to localStorage
  useEffect(() => {
    localStorage.setItem("clothList", JSON.stringify(productsList))
  }, [productsList])

  return (
    <div className="form_wrapper">
      <div>
        <form onSubmit={handlesubmit}>
          <label htmlFor="clothName">Cloth Name:</label>
          <input
            type="text "
            id="clothName"
            name="clothName"
            placeholder="Cloth Name here"
            required
          />

          <label htmlFor="clothId">Cloth Id:</label>
          <input
            type="number"
            name="clothId"
            id="clothId"
            placeholder="Cloth Id here"
            required
          />

          <label htmlFor="clothPrice">Cloth Price:</label>
          <input
            type="number"
            id="clothPrice"
            name="clothPrice"
            placeholder="Cloth Price"
            required
          />

          <label htmlFor="clothQuantity">Quantity:</label>
          <input
            type="number"
            id="clothQuantity"
            name="clothQuantity"
            placeholder="Quantity"
            required
          />

          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" rows="5"></textarea>

          <label>
            Color:
            <select name="color" id="" required>
              <option value=""></option>
              <option value="Tomato">tomato</option>
              <option value="Lightgreen">lightgreen</option>
              <option value="Salmon">salmon</option>
              <option value="Orange">orange</option>
              <option value="Lightgray">lightgray</option>
            </select>
          </label>

          <label htmlFor="Date">Date:</label>
          <input type="date" name="date" id="Date" required />

          <div className="size_input">
            <h4>Choose size:</h4>
            <label>S</label>
            <input type="radio" name="clothSize" id="radio" value={"S"} />

            <label>M</label>
            <input type="radio" name="clothSize" id="radio" value={"M"} />

            <label>L</label>

            <input type="radio" name="clothSize" id="radio" value={"L"} />
          </div>

          <label htmlFor="check">
            <input
              type="checkbox"
              name="check"
              id="check"
              value={"agreed"}
              required
            />
            Terms & Conditions
          </label>

          <button type="submit">Add Product</button>
        </form>
      </div>

      <div className="table_wapper">
        {productsList.length > 0 ? (
          <>
            <div className="table_container">
              <table>
                <tbody>
                  <tr>
                    <th>Cloth Name</th>
                    <th>Cloth Id</th>
                    <th>Cloth Price</th>
                    <th>Quantity</th>
                    <th>description</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Terms</th>
                    <th>Date</th>
                  </tr>
                  {productsList.map((product, index) => (
                    <Product
                      key={index}
                      item={product}
                      handledelete={singlelDeleteHandler}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="removeall-btn-container">
              <button className="removeAll_btn" onClick={removeAllHandler}>
                Remove all
              </button>
            </div>
          </>
        ) : (
          <div className="noCloths">
            <h1>
              <i>No cloth have been added yet</i>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
