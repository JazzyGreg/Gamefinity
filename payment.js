const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener("submit", payWithPaystack, false);

    function payWithPaystack(e) {
      e.preventDefault();

      const contestantName = document.getElementById("contestant-name").value;
      const amount = document.getElementById("amount").value * 100;

      let handler = PaystackPop.setup({
        key: 'pk_live_9dbebcb2980001585d537a0d03e5d3b7bc2cf5ef', // Replace with your public key
        email: "dummy@example.com", // Use a dummy email if not collecting one
        amount: amount,
        currency: "NGN",
        ref: '' + Math.floor((Math.random() * 1000000000) + 1), // Generate a pseudo-unique reference
        metadata: {
          custom_fields: [
            {
              display_name: "Contestant Name",
              variable_name: "contestant_name",
              value: contestantName
            }
          ]
        },
        onClose: function() {
          alert('Payment window closed.');
        },
        callback: function(response) {
          let message = 'Payment complete! Reference: ' + response.reference;
          alert(message);

          // Send data to your server or process further
          console.log(`Vote submitted for contestant: ${contestantName}`);
        }
      });

      handler.openIframe();
    }