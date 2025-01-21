function generateReceipt() {
    //hide form data
    $("formData").hide();

    //reset error div
    document.getElementById("error").innerHTML = '';
    let error = [];

    // Get values from the form
    const phoneQuantity = parseInt(document.getElementById('phone').value) || 0;
    const tabletQuantity = parseInt(document.getElementById('tablets').value) || 0;
    const watchQuantity = parseInt(document.getElementById('watch').value) || 0;
    const customerName = document.getElementById('name').value;
    const customerEmail = document.getElementById('email').value;
    const customerPhone = document.getElementById('number').value;
    const deliveryOption = document.querySelector('input[name="delivery"]:checked').value;

    if(phoneQuantity < 0) {
        error.push("Please enter valid number for Smart Phone!");
    }

    if(tabletQuantity < 0) {
        error.push("Please enter valid number forTablets!");
    }

    if(watchQuantity < 0) {
        error.push("Please enter valid number for Smart Watch!");
    }

    let emailReg = /^[A-Za-z0-9]+\@[A-Za-z]+\.[A-za-z]+\.?[A-Za-z]{2,}?$/;
    if(!emailReg.test(customerEmail)) {
        error.push("Invalid email address.");
    }

    let phoneReg =  /^\(\d{3}\)-\d{3}-\d{4}$/;
    if(!phoneReg.test(customerPhone)) {
        error.push("Invalid Phone number.");
    }

    if (error.length > 0) {
        $("#error").show();
        error.forEach(err => {
            document.getElementById("error").innerHTML += `<p>${err}</p>`
        });
        return false;
    }
    
    // Item prices
    const phonePrice = 699.00;
    const tabletPrice = 499.00;
    const watchPrice = 199.00;
    const taxRate = 0.13;
  
    // Calculate subtotal
    const phoneTotal = phoneQuantity * phonePrice;
    const tabletTotal = tabletQuantity * tabletPrice;
    const watchTotal = watchQuantity * watchPrice;
    let subtotal = phoneTotal + tabletTotal + watchTotal;
  
    // check for delivery charge
    let deliveryCharge = 0;
    if (subtotal > 100) {
      deliveryCharge = 0; 
    } else if (deliveryOption.includes("Standard")) {
      deliveryCharge = 10.00;
    } else if (deliveryOption.includes("Express")) {
      deliveryCharge = 20.00;
    }
  
    // Calculate tax and total
    const tax = subtotal * taxRate;
    const total = subtotal + tax + deliveryCharge;
  
    // Update the receipt
    const receiptDiv = document.getElementById('receipt');
    receiptDiv.innerHTML = `
      <h2>Invoice</h2>
      <p>Customer Name: ${customerName}</p>
      <p>Email: ${customerEmail}</p>
      <p>Phone: ${customerPhone}</p>
      <center><table style="border:1px;">
        <tr><th>Item</th><th>Quantity</th><th>Unit Price</th><th>Total Price</th></tr>
        ${phoneQuantity > 0 ? `<tr><td>Smartphone</td><td>${phoneQuantity}</td><td>$${phonePrice.toFixed(2)}</td><td>$${phoneTotal.toFixed(2)}</td></tr>` : ''}
        ${tabletQuantity > 0 ? `<tr><td>Tablet</td><td>${tabletQuantity}</td><td>$${tabletPrice.toFixed(2)}</td><td>$${tabletTotal.toFixed(2)}</td></tr>` : ''}
        ${watchQuantity > 0 ? `<tr><td>Smartwatch</td><td>${watchQuantity}</td><td>$${watchPrice.toFixed(2)}</td><td>$${watchTotal.toFixed(2)}</td></tr>` : ''}
      </table></center>
      <p>Subtotal: $${subtotal.toFixed(2)}</p>
      <p>Tax (13%): $${tax.toFixed(2)}</p>
      <p>Delivery Charge: $${deliveryCharge.toFixed(2)}</p>
      <p><strong>Total: $${total.toFixed(2)}</strong></p>
    `;
  
    // Show the receipt
    $("#receipt").show();
    
    // Prevent form submission
    return false;
  }
  