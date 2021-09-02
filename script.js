/*
function getdata() {

    fetch(url)
        .then((result) => result.json())
        .then((data) => (console.log(data)))
}
getdata();
*/

//JSON fro  API
var url = 'http://makeup-api.herokuapp.com/api/v1/products.json'

//Populate search dropdowns
async function filldropdown() {
  var products = [];
  var productType = [];
  var category = [];
  var brand = [];
  const errorMSG = "<p>Items currently not in stock</p>";
  await fetch(url, {
    method: 'GET', mode: 'cors'
  })
    .then(response => response.json())
    .then(data => products = data)
    .catch(_ => cards.push(errorMSG));

  if (products.length > 0) {

    for (const index in products) {
      var product = products[index];

      var productType = product.product_type;
      var category = product.category;
      var brand = product.brand;

      var prod_string = `<option>${productType}</option>`;
      var cat_string = `<option>${category}</option>`;
      var brand_string = `<option>${brand}</option>`;

      productType.push(prod_string);
      category.push(cat_string);
      brand.push(brand_string);
    }
  }
  document.getElementById('dd-prod').innerHTML = productType;
  document.getElementById('dd-cat').innerHTML = category;
  document.getElementById('dd-brand').innerHTML = brand;
  console.log(productType);
  console.log(category);
  console.log(brand);
}

//calling the dropdown function
filldropdown();


//Populate products upon clicking the Search button
async function fecthprod() {
  var products = [];
  var cards = [];
  const errorMSG = "<p>Items currently not in stock</p>";
  await fetch(url, {
    method: 'GET', mode: 'cors'
  })
    .then(response => response.json())
    .then(data => products = data)
    .catch(_ => cards.push(errorMSG));

  if (products.length > 0 && cards.length < 1) {
    for (const index in products) {
      var product = products[index];
      var productID = product.id;
      var itemName = product.name;
      var brandName = product.brand;
      var category = product.category;
      var productType = product.product_type;
      var productImageURL = product.image_link;
      var productPrice = product.price;
      var productDescription = product.description;
      var productLink = product.product_link;

      var card = `<div class="prod-container" id=${productID}>
                    <div class="card">
                        <img class="card-img-top" src=${productImageURL} alt="Product Image" style="width:100%">
                        <h1 class="card-title">${itemName}</h1>
                        <h4 class="card-title">${brandName}</h4>
                        <p class="price"><strong>Price: $</strong> ${productPrice}</p>
                        <p class="card-text">${productDescription}</p>
                        <p <button><a href="${productLink}"></a></button></p>
                    </div>
                </div>`;

      cards.push(card);
    }
  } else if (products.length < 1 && cards.length < 1) {
    cards.push(errorMSG);
  }
  document.getElementById("prodcont").innerHTML = cards;
  //return cards;
  //console.log(cards);
}

