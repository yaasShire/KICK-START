const generateHTMLContent = (data) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Venue Booking Info</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
                margin: 0;
            }
            .container {
                width: 100%;
                border: 1px solid #ddd;
                padding: 15px;
                border-radius: 5px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            .venueCourtNamesWrapper {
                display: flex;
                align-items: center;
            }
            .dot {
                width: 5px;
                height: 5px;
                background-color: #000;
                border-radius: 50%;
                margin: 0 5px;
            }
            .cardContent {
                padding: 10px 0;
            }
            .row1, .row2 {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
                flex-wrap: wrap;
            }
            .imagesInfoWrapper {
                display: flex;
                align-items: center;
                flex: 1;
                min-width: 0; /* Prevent overflow */
            }
            .avatar {
    width: 100%; /* Make the image responsive */
    max-width: 50px; /* Set a maximum width */
    height: auto; /* Maintain aspect ratio */
    border-radius: 50%;
    margin-right: 10px;
}
            .dateWrapper, .matchTimeWrapper {
                padding: 5px;
                background-color: #000;
                color: #fff;
                border-radius: 5px;
                text-align: center;
                flex: 1; /* Allow equal space distribution */
            }
            .actionsWrapper {
                display: flex;
                gap: 10px;
                flex-wrap: wrap; /* Allow wrapping on smaller screens */
            }
            .actionsWrapper a {
                text-decoration: none;
                color: inherit;
            }
            .divider {
                height: 1px;
                background-color: #ddd;
                margin: 10px 0;
            }
            @media (max-width: 600px) {
                .container {
                    padding: 10px;
                }
                .row1, .row2 {
                    flex-direction: column;
                    align-items: flex-start;
                }
                .dateWrapper, .matchTimeWrapper {
                    width: 100%;
                    margin-bottom: 5px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                    <span>Booking Receipt</span>
                <div class="venueCourtNamesWrapper">
                    <span>${data?.venueName}</span>
                    <div class="dot"></div>
                    <span>${data?.courtName}</span>
                </div>
            </div>

            <div class="cardContent">
                <div class="row1">
                  <div class="imagesInfoWrapper">
    <img src="${data?.image}" alt="Venue Image" class="avatar" />
    <div>
        <span>${data?.venueName}</span><br>
        <span>Booked Date: ${data?.bookingDate}</span>
    </div>
</div>

                    <span>${data?.status}</span>
                    <span>$${data?.totalPrice}</span>
                </div>
                <div class="divider"></div>
                <div class="row2">
                    <div class="dateWrapper">Match Date: ${data?.matchDate}</div>
                    <div class="matchTimeWrapper">${data?.startTime} - ${data?.endTime}</div>
                    <div class="actionsWrapper">
                        ${data?.status === "Pending" ?
            `<a href="tel:*712*612518368*${data?.totalPrice}#">
                Pay <img src="https://example.com/online-wallet-icon.png" alt="Pay" style="width: 40px; height: 40px;">
            </a>` : ''
        }
                        <a href="tel:${data?.venuePhoneNumber}">
                           call <img src="https://example.com/phone-icon.png" alt="Call" style="width: 40px; height: 40px;">
                        </a>
                        <a href="http://api.whatsapp.com/send?phone=252${data?.venuePhoneNumber}">
                           message <img style="width: 40px; height: 40px;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeHq-vaUK8MlOy8sPlCE5cHlSF9w7jUJ6YDQ&s" alt="WhatsApp">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;
};

export default generateHTMLContent;
