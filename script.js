//JSON fro  API
var url = 'https://makeup-api.herokuapp.com/api/v1/products.json'

//Populate search dropdowns
async function filldropdown() {
  //to store json response
  var products = [];

  //to store unique Values
  var productType = [];
  var category = [];
  var brand = [];

  //unique value with html option tag
  var prod_string = [];
  var cat_string = [];
  var brand_string = [];
  const errorMSG = "<p>Data currently not available</p>";

  await fetch(url, {
    method: 'GET'
    //, mode: 'cors'
  }).then(response => response.json()).then(data => products = data)

  //get unique values for product, category and brand
  var uniqueProdType = products.map(item => item.product_type)
    .filter((value, index, self) => self.indexOf(value) === index)

  var uniqueCategory = products.map(item => item.category)
    .filter((value, index, self) => self.indexOf(value) === index)
    .filter(function (el) { return el != null; });

  var uniqueBrand = products.map(item => item.brand)
    .filter((value, index, self) => self.indexOf(value) === index)

  if (uniqueProdType.length > 0) {
    for (i = 0; i < uniqueProdType.length; i++) {
      prod_string = `<option value="${uniqueProdType[i]}">${uniqueProdType[i]}</option>`;
      productType.push(prod_string);
    }
  } else if (uniqueProdType.length < 1) {
    productType.push(errorMSG);
  }

  if (uniqueCategory.length > 0) {
    for (i = 0; i < uniqueCategory.length; i++) {
      cat_string = `<option value="${uniqueCategory[i]}">${uniqueCategory[i]}</option>`;
      category.push(cat_string);
    }
  } else if (uniqueCategory.length < 1) {
    category.push(errorMSG);
  }

  if (uniqueBrand.length > 0) {
    for (i = 0; i < uniqueBrand.length; i++) {
      brand_string = `<option value="${uniqueBrand[i]}">${uniqueBrand[i]}</option>`;
      brand.push(brand_string);
    }
  } else if (uniqueBrand.length < 1) {
    brand.push(errorMSG);
  }

  //sort dropdown choices
  productType = productType.sort();
  category = category.sort().filter(entry => entry.trim() != '');
  brand = brand.sort();

  //append default dropdrown option tag with disabled condition
  productType = '<option value="" selected disabled>Product</option>' + productType
  category = '<option value="" selected disabled>Category</option>' + category
  brand = '<option value="" selected disabled>Brand</option>' + brand

  //insert options into dropdown element
  document.getElementById('dd-prod').innerHTML = productType;
  document.getElementById('dd-cat').innerHTML = category;
  document.getElementById('dd-brand').innerHTML = brand;
  /*
    console.log(productType);
    console.log(category);
    console.log(brand);
  */

}

//calling the dropdown function
filldropdown();

//Populate products upon clicking the Search button
async function fecthprod() {

  //read choices selected by user
  var ui_prod = document.getElementById("dd-prod").value;
  var ui_cat = document.getElementById("dd-cat").value;
  var ui_brand = document.getElementById("dd-brand").value;

  //console.log(ui_prod + ' ' + ui_cat + ' ' + ui_brand);

  var products = [];
  var cards = [];
  const errorMSG = '<p style="font-size:2rem;padding: 1rem 0rem 0rem 1rem">Items currently not in stock</p>';
  await fetch(url, {
    method: 'GET'
    //, mode: 'cors'
  }).then(response => response.json()).then(data => products = data).catch(_ => cards.push(errorMSG));

  //localStorage.setItem('products', JSON.stringify(products));
  //var local_products = localStorage.getItem('products');
  //console.log(local_products);

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
                        <button><a href=${productLink}>VIEW DETAILS</a></button>
                    </div>
                </div>`;

      cards.push(card);
    }
  } else if (products.length < 1 && cards.length < 1) {
    cards.push(errorMSG);
  }

  //console.log(cards);
  document.getElementById("prodcont").innerHTML = cards;
  //return cards;

}

//to retain header and search section stick to top
window.onscroll = function () { myFunction() };
var navbar = document.getElementById("fixed-container");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

//on clicking back button on browser, show previous results page
function handleMyBackButton() {
  if (canGoBack) {
    window.back();
  }
}


