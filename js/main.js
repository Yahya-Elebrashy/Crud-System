
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var inputs = document.getElementsByClassName("inputs");
var btnAdd = document.getElementById("btnAdd");
var PNameAlert = document.getElementById("PNameAlert");
var PPriceAlert = document.getElementById("PPriceAlert");
var PCategoryAlert = document.getElementById("PCategoryAlert");
var PDescriptionAlert = document.getElementById("PDescriptionAlert")
var products;
var currentIndex = 0;
if (localStorage.getItem("productList") == null) {
    products = [];
}
else {
    products = JSON.parse(localStorage.getItem("productList"));
    displayProducts();
    console.log(products)
}
btnAdd.onclick = function () {
    if (
        productNameInput.value == "" ||
        productCategoryInput.value == "" ||
        productPriceInput.value == "" ||
        productDescriptionInput.value == ""
    ) {

        document.getElementById("empty-input-alert").innerHTML = "Please Fill In Required Info and Try Again!";
        document.getElementById("display-table-href").removeAttribute("href");
    }
    else if (btnAdd.innerHTML == "Update product") {
        updateProducts();
    }
    else {
        addProducts();

    }

    displayProducts();
    clearProducts();
}
function addProducts() {
    if (
        validateProductName() == true &&
        validateProductCategory() == true &&
        validateProductPrice() == true &&
        validateProductDescription() == true
    ) {
        var product = {
            Name: productNameInput.value,
            Price: productPriceInput.value,
            Category: productCategoryInput.value,
            Description: productDescriptionInput.value
        }
        products.push(product);
        localStorage.setItem("productList", JSON.stringify(products));
    }
}
function displayProducts() {
    var productDisplay = "";
    for (var i = 0; i < products.length; i++) {
        productDisplay += `<tr>
                           <td>${products[i].Name}</td>
                           <td>${products[i].Price}</td>
                           <td>${products[i].Category}</td>
                           <td>${products[i].Description}</td>
                           <td><button class="btn btn-danger" onclick="deleteProducts(${i})">Delete</button></td>
                           <td><button class="btn btn-primary" onclick="getProductInfo(${i})">Update</button></td>
                           </tr>`
    }
    document.getElementById("tbody").innerHTML = productDisplay
}
function clearProducts() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = ""
    }
}
function deleteProducts(index) {
    products.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(products));
    displayProducts()

}
function searchProduct(searchText) {
    var productDisplay = "";
    for (var i = 0; i < products.length; i++) {
        if (products[i].Name.includes(searchText))
            productDisplay += `<tr>
                           <td>${products[i].Name}</td>
                           <td>${products[i].Price}</td>
                           <td>${products[i].Category}</td>
                           <td>${products[i].Description}</td>
                           <td><button class="btn btn-danger" onclick="deleteProducts(${i})">Delete</button></td>
                           <td><button class="btn btn-primary" onclick="getProductInfo(${i})">Update</button></td>
                           </tr>`
    }

    document.getElementById("tbody").innerHTML = productDisplay
}
function getProductInfo(index) {
    currentIndex = index;
    var product = products[index];
    productNameInput.value = product.Name;
    productPriceInput.value = product.Price;
    productCategoryInput.value = product.Category;
    productDescriptionInput.value = product.Description;
    btnAdd.innerHTML = "Update product";
}
function updateProducts() {
    if (
        validateProductName() == true &&
        validateProductCategory() == true &&
        validateProductPrice() == true &&
        validateProductDescription() == true
    ) {
        var product = {
            Name: productNameInput.value,
            Price: productPriceInput.value,
            Category: productCategoryInput.value,
            Description: productDescriptionInput.value
        }
        products[currentIndex].Name = product.Name;
        products[currentIndex].Price = product.Price;
        products[currentIndex].Category = product.Category;
        products[currentIndex].Description = product.Description;
    }
}

function validateProductName() {

    var regex = /^[A-Z][a-z A-z 0-9]{2,}$/;

    if (regex.test(productNameInput.value) == true) {

        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        PNameAlert.classList.add("d-none");
        PNameAlert.classList.remove("d-block");
        btnAdd.disabled = false;
        return true;

    } else {
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        PNameAlert.classList.add("d-block");
        PNameAlert.classList.remove("d-none");
        btnAdd.disabled = true;

        return false;
    }
};
function checkDuplicatedNames() {

    for (var i = 0; i < products.length; i++) {
        if (productNameInput.value == products[i].Name) {
            productNameInput.classList.add("is-invalid");
            productNameInput.classList.remove("is-valid");
            PNameAlert.classList.add("d-block");
            PNameAlert.classList.remove("d-none");
            PNameAlert.innerHTML = "Product Name Already Exists";
            btnAdd.disabled = true;
        }
    }
};
productNameInput.addEventListener("keyup", validateProductName);
productNameInput.addEventListener("blur", checkDuplicatedNames);

function validateProductCategory() {

    var regex = /^[a-z A-Z 0-9]{5,}$/;

    if (regex.test(productCategory.value) == true) {

        productCategoryInput.classList.add("is-valid");
        productCategoryInput.classList.remove("is-invalid");
        PCategoryAlert.classList.add("d-none");
        PCategoryAlert.classList.remove("d-block");
        btnAdd.disabled = false;
        return true;

    } else {
        productCategoryInput.classList.add("is-invalid");
        productCategoryInput.classList.remove("is-valid");
        PCategoryAlert.classList.add("d-block");
        PCategoryAlert.classList.remove("d-none");
        btnAdd.disabled = true;

        return false;
    }
};

productCategoryInput.addEventListener("keyup", validateProductCategory);



function validateProductPrice() {

    var regex = /^([1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]|10000)$/;

    if (regex.test(productPrice.value) == true) {

        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        PPriceAlert.classList.add("d-none");
        PPriceAlert.classList.remove("d-block");
        btnAdd.disabled = false;

        return true;

    } else {
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        PPriceAlert.classList.add("d-block");
        PPriceAlert.classList.remove("d-none");
        btnAdd.disabled = true;

        return false;
    }
};

productPriceInput.addEventListener("keyup", validateProductPrice);



function validateProductDescription() {

    var regex = /^[a-z A-Z 0-9]{3,}$/;

    if (regex.test(productDescription.value) == true) {

        productDescriptionInput.classList.add("is-valid");
        productDescriptionInput.classList.remove("is-invalid");
        PDescriptionAlert.classList.add("d-none");
        PDescriptionAlert.classList.remove("d-block");
        btnAdd.disabled = false;

        return true;

    } else {
        productDescriptionInput.classList.add("is-invalid");
        productDescriptionInput.classList.remove("is-valid");
        PDescriptionAlert.classList.add("d-block");
        PDescriptionAlert.classList.remove("d-none");
        btnAdd.disabled = true;

        return false;
    }
};
productDescriptionInput.addEventListener("keyup", validateProductDescription);