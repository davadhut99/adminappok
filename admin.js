
//form input
const pPrice = document.getElementById("productprice");
const pName = document.getElementById("productname");
const pCategory = document.getElementById("productcategory");

//add to cart button
const addProductButton = document.getElementById("addproduct");


// Select category id
const elctronicsItems = document.getElementById('electronics');
const foodItems = document.getElementById('food');
const skincareItems = document.getElementById('skincare');

const endPoint = '755e52d1f15a49beaef03445497ff99e';

addProductButton.addEventListener("click", function (e) {
  e.preventDefault();
  let Order = {
    productprice: pPrice.value,
    productname: pName.value,
    productcategory: pCategory.value
  };
 
  addToCart(Order);
  console.log(Order);
  // Clear fields
  pPrice.value = '';
  pName.value = '';
});


function addToCart(order) {
  axios
    .post(
      `https://crudcrud.com/api/${endPoint}/restapp`, order
    )
    .then((response) => {
      console.log(order);
      showcategoryWithCart(response.data);
      //console.log(response);
    })
    .catch((err) => {
      document.body.innerHTML =
        document.body.innerHTML + "<h4> Something went wrong! </h4>";
      console.log(err);
    });
};


window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      `https://crudcrud.com/api/${endPoint}/restapp`
    )
    .then((response) => {
      console.log(response);
      for (let i = 0; i < response.data.length; i++) {
        //console.log(response.data[i])
        showcategoryWithCart(response.data[i]);

      }
    })
    .catch((err) => {
      console.log(err);
    });
});


function showcategoryWithCart(ele) {
  // console.log(ele.productcategory)
  // console.log(electronics)
  if (ele.productcategory == productcategory[0].value) {
    const parentNode = document.getElementById("electronicsitems");
    childHTML = `<li id=${ele._id}> ${ele.productprice} - ${ele.productname} - ${ele.productcategory}
    <button onclick= "deleteCart('${ele._id}','${ele.productcategory}')"> Delete </button></li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
  }
  else if (ele.productcategory == productcategory[1].value) {
    const parentNode = document.getElementById("fooditems");
    childHTML = `<li id=${ele._id}> ${ele.productprice} - ${ele.productname} - ${ele.productcategory}
    <button onclick= "deleteCart('${ele._id}','${ele.productcategory}')"> Delete </button></li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;

  } else if (ele.productcategory == productcategory[2].value) {
    const parentNode = document.getElementById("skincareitems");
    childHTML = `<li id=${ele._id}> ${ele.productprice} - ${ele.productname} - ${ele.productcategory}
    <button onclick= "deleteCart('${ele._id}','${ele.productcategory}')"> Delete </button></li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;

  }
}

function deleteCart(eleId, productcategory) {
  axios
    .delete(
      `https://crudcrud.com/api/${endPoint}/restapp/${eleId}`
    )
    .then((response) => {
      console.log(response);
      removeCartFromScreen(eleId, productcategory);
    })
    .catch((err) => {
      console.log(err);
    });
}

function removeCartFromScreen(eleId, productcategory) {
  console.log(eleId);
  let childNodeToBeDeleted = document.getElementById(eleId);
  if (elctronicsItems.value == productcategory) {
    const parentNode = document.getElementById("electronicsitems");
    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
  }
  else if (foodItems.value == productcategory) {
    const parentNode = document.getElementById("fooditems");
    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
  } else if (skincareItems.value == productcategory) {
    const parentNode = document.getElementById("skincareitems");
    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
  }
}