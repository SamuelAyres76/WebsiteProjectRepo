/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
--- My Products + Prices ---
---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
const productNames = 
[
  'Bottle',
  'Pacifier',
  'Monitor',
  'Bear',
  'Gate',
  'Toys',
  'Journal',
  'Formula',
  'Clothes',
  'Crib',
  'Food Maker',
  'Play mat'
];

const productPrices = 
[
  499, // Baby Bottle - €4.99
  299, // Baby pacifier - €2.99
  2499, // Baby Monitor - €24.99
  899, // Teddy Bear - €8.99
  2299, // Baby Gate - €22.99
  799, // Block Toys - €7.99
  1099, // Baby Journal - €10.99
  499, // Baby Formula - €4.99
  1399, // Baby Clothes - €13.99
  3499, // Baby Crib - €34.99
  2199, // Food Maker - €21.99
  1799  // Play mat - €17.99
];

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
--- The Product Display ---
---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// Variables
let productsCount = 0;
const totalProducts = 12;

// To load additional products in store.html!
function loadMore() 
{
  const productsContainer = document.getElementById('products');

  for (let i = productsCount; i < Math.min(productsCount + 4, totalProducts); i++) 
  {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    // Get the product name (if no name send an error)
    const productName = productNames[i] ? productNames[i] : 'Name error';
    
    // Get the price from the productPrices array.
    const productPrice = productPrices[i] ? productPrices[i] : 0;
    const price = `${(productPrice / 100).toFixed(2)}`;

    // Display all information in a container.
    productDiv.innerHTML = 
    `
      <div class="product-info">
        <h3>${productName}</h3>
        <img src="images/Products/product${i + 1}.jpg" alt="${productName} - Description or Name">
        <p class="description">Lorem ipsum dolor ${productName}, consectetur adipiscing.</p>
        <p>€${price}</p>
        <button onclick="addToCart('${productName}', ${productPrice})">Add to Cart</button>
      </div>
    `;

    productsContainer.appendChild(productDiv);
  }

  productsCount += 4;

  // When all of the products are shown, remove the button.
  if (productsCount >= totalProducts) 
  {
    document.querySelector('.load-more-btn').style.display = 'none';
  }
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
--- The Carousel ---
---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// Code Source: Lab submissions for CSS.
$(document).ready(function() 
{
  var slickOptions = 
  {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    // Scroll automatically every 2 seconds.
    autoplay: true,
    autoplaySpeed: 2000,
    // No arrows.
    arrows: false,
    
    // Change the amount shown per row depending on screen size.
    responsive: 
    [
      {
        breakpoint: 1000,
        settings: 
        {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: 
        {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  var $carousel = $('.carousel');

  // Pausing the autoscroll when a product is hovered...
  $carousel.on('mouseenter', '.product', function() 
  {
    $carousel.slick('slickPause');
  });

  // And resume when they scroll away!
  $carousel.on('mouseleave', '.product', function() 
  {
    $carousel.slick('slickPlay');
  });

  $carousel.slick(slickOptions);
});

// Adding items to the carousel.
function populateCarousel() 
{
  const carouselItems = document.querySelectorAll('.carousel .product');

  carouselItems.forEach((item) => 
  {
    // Generate a random number between 0 and 11.
    // The carousel is populated by random.
    const randomNumber = Math.floor(Math.random() * totalProducts);

    // Grab the name and price from the arrays.
    const productName = productNames[randomNumber] ? productNames[randomNumber] : 'Name error';
    const productPrice = productPrices[randomNumber] ? productPrices[randomNumber] : 0;

    // And display the information in the carousel! (image, name, price, description, buy button.)
    item.innerHTML = 
    `
      <h3>${productName}</h3>
      <img src="images/Products/product${randomNumber + 1}.jpg" alt="${productName} - Description or Name">
      <p class="description">Lorem ipsum dolor ${productName}, consectetur adipiscing.</p>
      <p>€${(productPrice / 100).toFixed(2)}</p>
      <button onclick="addToCart('${productName}', ${productPrice})">Add to Cart</button>
    `;
  });
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
--- The buying process ---
---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

// Retrieve the products the user wishes to buy via local storage.
function getCartItems() 
{
  const cartItems = localStorage.getItem('cart');
  return cartItems ? JSON.parse(cartItems) : [];
}

// Update the cart items in localStorage.
function updateCartItems(cart) 
{
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add items to the cart.
function addToCart(productName, productPrice) 
{
  const cart = getCartItems();

  cart.push({ name: productName, price: productPrice });

  // Update the cart in localStorage.
  updateCartItems(cart);

  console.log('Updated Cart:', getCartItems());

  // Tell user their item is in the cart!
  alert(`Added "${productName}" to cart for €${(productPrice / 100).toFixed(2)}`);
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
--- The Cart ---
---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

 // Display the items in the cart.
 function displayCartItems() 
 {
    // Variables
    const cart = getCartItems();
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item) => 
    {
      const cartItemDiv = document.createElement('div');
      cartItemDiv.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'justify-content-between', 'align-items-center');

      // Display the details for items in the cart.
      const productName = item.name;
      const productPrice = item.price;
      totalPrice += productPrice;

      cartItemDiv.innerHTML = 
      `
          <div>
              <h5 class="mb-1">${productName}</h5>
              <span>€${(productPrice / 100).toFixed(2)}</span>
          </div>
      `;

      cartItemsContainer.appendChild(cartItemDiv);
    });

    // Display the total price.
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `€${(totalPrice / 100).toFixed(2)}`;

    // To show or hide certain things depending on if items are in the cart.
    const clearCartBtn = document.getElementById('clearCartBtn');
    const emptyCartMessage = document.getElementById('emptyCartMessage');
    const totalPriceText = document.getElementById('totalPriceText');

    // When the cart is empty hide the clear cart button, total price text and add text telling the user it's empty 
    if (cart.length > 0) 
    {
        clearCartBtn.classList.remove('d-none');
        emptyCartMessage.classList.add('d-none');
        totalPriceText.classList.remove('d-none');
    } 
    // If there are items we can show the clear cart button + total price.
    else 
    {
        clearCartBtn.classList.add('d-none');
        emptyCartMessage.classList.remove('d-none');
        totalPriceText.classList.add('d-none');
    }
  }

  // Clearing the cart (only appears IF there are items to clear)
  function clearCart() 
  {
    localStorage.removeItem('cart');
    displayCartItems(); // Clear cart items from display
    document.getElementById('totalPrice').textContent = ''; // Clear total price
  }

  // Call displayCartItems when the page loads.
  document.addEventListener('DOMContentLoaded', displayCartItems);

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
--- Account ---
---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", function() 
{
  // Check if the current page URL contains "account.html".
  // Without this all pages will display the account information.
  if (window.location.href.includes("account.html")) 
  {
      checkLoggedIn();
  }
});

// Logging out the user.
function logoutUser() 
{
  localStorage.removeItem("loggedInUser");
  // Send them back to the login/signup page
  displayLoginForm();
}

//
function checkLoggedIn() 
{
  const user = localStorage.getItem("loggedInUser");

  if (user) 
  {
      const userDetails = JSON.parse(user);
      const storedUser = localStorage.getItem('user_' + userDetails.accountName);

      if (storedUser) 
      {
          const storedUserData = JSON.parse(storedUser);
          const firstName = storedUserData.firstName;

          // If all goes according to plan the user is successfully logged in!
          if (firstName) 
          {
              displayWelcome(firstName);
          } 
          
          // error handling.
          else 
          {
              displayLoginForm();
          }
      }
      
      else 
      {
          displayLoginForm();
      }
  } 
  
  else 
  {
      displayLoginForm();
  }
}

// Getting the users information to log them in
function displayLoginForm() 
{
  // Just getting the account name and password.
  // They can also select forgot password or sign up.
  const loginFormHTML = `
      <h2>Login</h2>
      <form id="loginForm">
          <label for="accountName">Account Name</label>
          <input type="text" id="accountName" name="accountName" required>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
          <br/>
          <button type="submit">Log In</button>
          <button type="button" onclick="displaySignupForm()">Sign Up</button>
          <br/>
          <a href="#" onclick="forgotPassword()">Forgot Password?</a>
      </form>
  `;
  document.querySelector(".content-area").innerHTML = loginFormHTML;

  document.getElementById("loginForm").addEventListener("submit", function(event) 
  {
    event.preventDefault();

    // Grab the information entered.
    const accountName = document.getElementById('accountName').value;
    const password = document.getElementById('password').value;

    // make objects for the information.
    const user = 
    {
        accountName: accountName,
        password: password
    };

    // Call the log in user function to let them in.
    loginUser(user);
});
}

// The form to Sign Up.
function displaySignupForm() 
{
  const signupFormHTML = `
      <h2>Sign Up</h2>
      <form id="signupForm">
          <div class="form-group">
          <label for="accountName">Account Name</label>
          <input type="text" class="form-control" id="accountName" name="accountName" required>
          </div>  
          <div class="form-group">
              <label for="firstName">First Name</label>
              <input type="text" class="form-control" id="firstName" name="firstName" required>
          </div>
          <div class="form-group">
              <label for="lastName">Last Name</label>
              <input type="text" class="form-control" id="lastName" name="lastName" required>
          </div>
          <div class="form-group">
              <label for="dateOfBirth">Date of Birth</label>
              <input type="date" class="form-control" id="dateOfBirth" name="dateOfBirth" required>
          </div>
          <div class="form-group">
              <label for="Email">Email</label>
              <input type="email" class="form-control" id="Email" name="Email" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" placeholder="Please enter a valid email address">
          </div>
          <div class="form-group">
              <label for="mobileNumber">Mobile Number</label>
              <input type="tel" class="form-control" id="mobileNumber" name="mobileNumber" required>
          </div>
          <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" name="password" required>
          </div>
          <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" required>
          </div>
          <div class="form-check">
              <input type="checkbox" class="form-check-input" id="receiveEmails" name="receiveEmails">
              <label class="form-check-label" for="receiveEmails">Receive Emails</label>
          </div>
          <div class="form-check">
              <input type="checkbox" class="form-check-input" id="receiveMobileMessages" name="receiveMobileMessages">
              <label class="form-check-label" for="receiveMobileMessages">Receive Mobile Messages</label>
          </div>
          <div class="form-check">
              <input type="checkbox" class="form-check-input" id="dataProtection" name="dataProtection" required>
              <label class="form-check-label" for="dataProtection">I agree to the Data Protection Policy</label>
          </div>
          <div class="form-group">
              <label for="addressLine1">Address Line 1</label>
              <input type="text" class="form-control" id="addressLine1" name="addressLine1" required>
          </div>
          <div class="form-group">
              <label for="addressLine2">Address Line 2</label>
              <input type="text" class="form-control" id="addressLine2" name="addressLine2" required>
          </div>
          <div class="form-group">
              <label for="addressLine3">Address Line 3 (Optional)</label>
              <input type="text" class="form-control" id="addressLine3" name="addressLine3">
          </div>
          <button type="submit" class="btn btn-primary mt-3">Sign Up</button>
      </form>
  `;
  document.querySelector(".content-area").innerHTML = signupFormHTML;

  document.getElementById("signupForm").addEventListener("submit", function(event) 
  {
      event.preventDefault();
      signUpUser();
  });
}

// Saving the information recieved by the form.
function signUpUser() 
{
  // Retrieve form data
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const dateOfBirth = document.getElementById('dateOfBirth').value;
  const email = document.getElementById('Email').value;
  const mobileNumber = document.getElementById('mobileNumber').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const receiveEmails = document.getElementById('receiveEmails').checked;
  const receiveMobileMessages = document.getElementById('receiveMobileMessages').checked;
  const dataProtection = document.getElementById('dataProtection').checked;
  const addressLine1 = document.getElementById('addressLine1').value;
  const addressLine2 = document.getElementById('addressLine2').value;
  const addressLine3 = document.getElementById('addressLine3').value; // Can be null.
  const accountName = document.getElementById('accountName').value;

  /* Log the form data
  console.log('First Name:', firstName);
  console.log('Last Name:', lastName);
  console.log('Date of Birth:', dateOfBirth);
  console.log('Email:', email);
  console.log('Mobile Number:', mobileNumber);
  console.log('Password:', password);
  console.log('Confirm Password:', confirmPassword);
  console.log('Receive Emails:', receiveEmails);
  console.log('Receive Mobile Messages:', receiveMobileMessages);
  console.log('Data Protection Agreement:', dataProtection);
  console.log('Address Line 1:', addressLine1);
  console.log('Address Line 2:', addressLine2);
  console.log('Address Line 3:', addressLine3);
  console.log('Account Name:', accountName);
  */

  // Ensure the passwords match!
  if (password !== confirmPassword) 
  {
      alert("Passwords do not match");
      return;
  }

  // Create an object to represent the user.
  const user = 
  {
      accountName: accountName,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      email: email,
      mobileNumber: mobileNumber,
      password: password,
      receiveEmails: receiveEmails,
      receiveMobileMessages: receiveMobileMessages,
      dataProtection: dataProtection,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      addressLine3: addressLine3,
  };

  // Store the user object in localStorage.
  localStorage.setItem('user_' + accountName, JSON.stringify(user));

  // Tell user they have successfully signed up.
  alert('Signed up successfully!');
  
  checkLoggedIn();
}

// Log in / Sign up Logic.
function loginUser(user) 
{
  // Retrieve the user details from localStorage based on the provided accountName.
  const storedUser = localStorage.getItem('user_' + user.accountName);

  // If the user exists + the password was correct...
  if (storedUser) 
  {
      const storedUserData = JSON.parse(storedUser);
      
      // Check if the entered password matches the accounts password.
      if (user.password === storedUserData.password) 
      {
          // The user has been successfully logged in and brought back to the functuon to check if they were successful.
          localStorage.setItem('loggedInUser', JSON.stringify({ accountName: storedUserData.accountName }));
          checkLoggedIn();
      } 
      
      else 
      {
          alert('Invalid password. Please try again.');
      }
  } 
  // if no account was found.
  else 
  {
      alert('Invalid account name. Please try again.');
  }
}

// If the user forgot their password...
function forgotPassword() 
{
  // get the account they wish to reset the password of.
  const accountName = prompt("Enter your account name:");
  const storedUser = localStorage.getItem('user_' + accountName);

  // Now, usually you would get an email for this to confirm you really are who you say.
  // But, for demonstration purposes i'll just allow you to reset the password.
  if (storedUser) 
  {
    const newPassword = prompt("Enter your new password:");
    const confirmPassword = prompt("Confirm your new password:");

    if (newPassword === confirmPassword && newPassword !== null && newPassword !== "") 
    {
      const storedUserData = JSON.parse(storedUser);
      storedUserData.password = newPassword;
      localStorage.setItem('user_' + accountName, JSON.stringify(storedUserData));
      alert("Password reset successfully!");
    } 
    
    else 
    {
      alert("Passwords do not match or are empty.");
    }
  } 
  
  else 
  {
    alert("Account not found. Please enter a valid account name.");
  }
}

// Display a welcome message.
function displayWelcome(firstName) {
  const welcomeHTML = `
    <h2>Welcome, ${firstName}!</h2>
    <h5>What would you like to do?</h5>
    <hr/><br/>
    <button onclick="proceedToCheckout()">Proceed to Checkout</button>
    <button onclick="logoutUser()">Logout</button>
  `;
  document.querySelector(".content-area").innerHTML = welcomeHTML;
}

// Function to handle "Proceed to Checkout" button click
function proceedToCheckout() {
  // Redirect the user to checkout.html
  window.location.href = "checkout.html";
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------
--- Checkout Form Validation ---
---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
function processPayment(event) 
{
  event.preventDefault();

  // Perform validation and payment processing logic here.
  const cardNumber = document.getElementById('cardNumber').value;
  const cvc = document.getElementById('cvc').value;

  // Validate the card number and the cvc length.
  if (cardNumber.length !== 16 || cvc.length !== 3) 
  {
      alert('Invalid card details. Please check and try again.');
      return;
  }

  // If the payment is successful...
  alert('Payment successful!');
  
  // Redirect to index.html!
  window.location.href = 'index.html';

  // Also clear the cart.
  localStorage.removeItem('cart');
}

// Auto-fill the billing address.
function autoFillBillingAddress() 
{
  // Get the logged-in user's account details from localStorage.
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (loggedInUser) 
  {
      // Retrieve user's account details based on accountName
      const storedUser = localStorage.getItem('user_' + loggedInUser.accountName);

      if (storedUser) 
      {
          const user = JSON.parse(storedUser);

          // Fill in the billing address fields with the user's address details.
          document.getElementById('billingAddress').value = user.addressLine1 || '';
          document.getElementById('billingAddress2').value = user.addressLine2 || '';
          document.getElementById('billingAddress3').value = user.addressLine3 || '';
      }
  }
}

// Call autoFillBillingAddress when the page loads.
document.addEventListener('DOMContentLoaded', autoFillBillingAddress);