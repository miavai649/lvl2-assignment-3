const confirmationService = async (query: Record<string, unknown>) => {
  const { status } = query

  // Todo: must change the url with live link

  // check the status and return the appropriate HTML response
  if (status === 'success') {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Success</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f8ff;
            color: #333;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .container {
            background-color: #ffffff;
            padding: 20px 40px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          .container h1 {
            color: #28a745;
            font-size: 2.5rem;
            margin-bottom: 20px;
          }

          .container p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            line-height: 1.5;
          }

          .container .checkmark {
            font-size: 4rem;
            color: #28a745;
            margin-bottom: 20px;
          }

          .container .btn {
            display: inline-block;
            padding: 10px 20px;
            font-size: 1.1rem;
            color: #ffffff;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            transition: background-color 0.3s ease;
          }

          .container .btn:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="checkmark">&#10003;</div>
          <h1>Payment Successful!</h1>
          <p>Thank you for your payment. Your transaction has been completed successfully. You will receive a confirmation email shortly.</p>
          <a href="https://cleancarz.vercel.app" class="btn">Return to Home</a> 
        </div>
      </body>
      </html>
    `
  } else if (status === 'failed') {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Failed</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f8d7da;
            color: #333;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .container {
            background-color: #ffffff;
            padding: 20px 40px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
          }

          .container h1 {
            color: #dc3545;
            font-size: 2.5rem;
            margin-bottom: 20px;
          }

          .container p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            line-height: 1.5;
          }

          .container .crossmark {
            font-size: 4rem;
            color: #dc3545;
            margin-bottom: 20px;
          }

          .container .btn {
            display: inline-block;
            padding: 10px 20px;
            font-size: 1.1rem;
            color: #ffffff;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            transition: background-color 0.3s ease;
          }

          .container .btn:hover {
            background-color: #0056b3;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="crossmark">&#10060;</div>
          <h1>Payment Failed!</h1>
          <p>Unfortunately, your payment was not successful. Please try again or contact support if the issue persists.</p>
          <a href="https://cleancarz.vercel.app" class="btn">Return to Home</a> 
        </div>
      </body>
      </html>
    `
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Status</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f8ff;
          color: #333;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .container {
          background-color: #ffffff;
          padding: 20px 40px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .container p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          line-height: 1.5;
        }

        .container .btn {
          display: inline-block;
          padding: 10px 20px;
          font-size: 1.1rem;
          color: #ffffff;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }

        .container .btn:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p>Payment status is unclear. Please contact support.</p>
        <a href="https://cleancarz.vercel.app" class="btn">Return to Home</a> 
      </div>
    </body>
    </html>
  `
}

export const PaymentServices = {
  confirmationService
}
