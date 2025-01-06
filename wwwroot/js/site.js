    function startPayment() {

        // Get the amount from the input field
        const amount = document.getElementById("amount").value;
        const description = document.getElementById("description").value;
        const id = document.getElementById("id").value;
        const name = document.getElementById("name").value;
        const offer = document.getElementById("offer").value;

        // Create the payment request object
        const paymentRequest = {
            amount: parseFloat(amount),// Ensure amount is a decimal value
            description: description,
            id: id,
            name: name,
            offer:offer
        };


        fetch('/Payment/CreateOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            //body: JSON.stringify({ amount: 500 }) // Specify the amount in INR
            body: JSON.stringify(paymentRequest) // Specify the amount in INR
        })
            .then(response => response.json())
            .then(data => {
                if (data.orderId) {
                    // Open Razorpay payment interface
                    var options = {
                        "key": "rzp_test_3sZCoJBpCJ3GYu", // Replace with your Razorpay Key ID
                        "amount": data.amount * 100, // Convert to paise
                        "currency": "INR",
                        "name": "Dharavi Leathers",
                        "description": "Test Transaction",
                        "order_id": data.orderId,
                        "handler": function (response) {
                            alert("Payment successful: " + response.razorpay_payment_id);
                        },
                        "prefill": {
                            "name": "John Doe",
                            "email": "john.doe@example.com",
                            "contact": "9999999999"
                        },
                        "theme": {
                            "color": "#3399cc"
                        }
                    };
                    var rzp1 = new Razorpay(options);
                    rzp1.open();
                } else {
                    alert("Failed to create order.");
                }
            })
            .catch(error => console.error('Error:', error));
}









function startPayment(amount, description, id, name, offer, quantity) {


    const companyName = document.getElementById('companyName').getAttribute('data-company');


    // Get the amount from the input field

    // Create the payment request object
    const paymentRequest = {
        amount: parseFloat(amount) * parseFloat(quantity),// Ensure amount is a decimal value
        description: description,
        id: id,
        name: name,
        offer: offer,
        quantity: quantity
    };


    fetch('/Payment/CreateOrder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify({ amount: 500 }) // Specify the amount in INR
        body: JSON.stringify(paymentRequest) // Specify the amount in INR
    })
        .then(response => response.json())
        .then(data => {
            if (data.orderId) {
                // Open Razorpay payment interface
                var options = {
                    "key": "rzp_test_3sZCoJBpCJ3GYu", // Replace with your Razorpay Key ID
                    "amount": data.amount * 100, // Convert to paise
                    "currency": "INR",
                    "name": companyName,
                    "description": "Test Transaction",
                    "order_id": data.orderId,
                    "handler": function (response) {
                        //alert("Payment successful: " + response.razorpay_payment_id);
                        // Call ASP.NET Core action with all required data
                        const paymentRequest1 = {
                            amount: parseFloat(amount) * parseFloat(quantity),// Ensure amount is a decimal value
                            description: description,
                            id: id,
                            name: name,
                            offer: offer,
                            quantity: quantity,
                            OrderId: response.razorpay_payment_id
                        }

                        sendPaymentDetailsToServer(paymentRequest1);

                    },
                    "prefill": {
                        "name": "John Doe",
                        "email": "john.doe@example.com",
                        "contact": "9999999999"
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };
                var rzp1 = new Razorpay(options);
                rzp1.open();
            } else {
                alert("Failed to create order.");
            }
        })
        .catch(error => console.error('Error:', error));
}









// Function to send payment details to the server
function sendPaymentDetailsToServer(data) {
    // Create a form element
    var form = document.createElement('form');
    form.method = 'POST';
    form.action = '/Payment/ConfirmPayment'; // Set the endpoint

    // Append hidden input fields to the form
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;  // Name must match the parameter name in the controller
            input.value = data[key];
            form.appendChild(input);
        }
    }

    // Append the form to the document and submit it
    document.body.appendChild(form);
    form.submit();
}

