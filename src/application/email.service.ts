const { MailtrapClient } = require("mailtrap");
const TOKEN = "d7e52d658fc81ad4b161cc4f4ec60c8d";
const ENDPOINT = "https://send.api.mailtrap.io/";
interface item{
  product: {
    name: string;
  };
  unitPrice: number;
  quantity: number;
  total: number;
}
export class EmailService {
  private client;
  private sender;
  private recipients;

  constructor() {
    this.client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

    this.sender = {
      email: "mailtrap@demomailtrap.com",
      name: "Mailtrap Test",
    };
    this.recipients = [
      {
        email: "rumindukavishka14@gmail.com",
      }
    ];
  }
  sendEmail(orderInfoForEmail:any, items:item[], grandTotal:number) {
    this.client.send({
      from: this.sender,
      to: this.recipients,
      template_uuid: "7ee09d6e-9b62-4e64-b345-5a542ee69e9c",
      template_variables: {
        "orderId": orderInfoForEmail.id.toString(),
        "orderDate": orderInfoForEmail.createdAt.toString(),
        "orderStatus": "Test_OrderStatus",
        "street1": orderInfoForEmail.address_line1,
        "zip": orderInfoForEmail.zip_code,
        "fullName": `${orderInfoForEmail.first_name} ${orderInfoForEmail.last_name}`,
        "email": "rumindukavishka14@gmail.com",
        "items": items,
        "grandTotal": grandTotal.toFixed(2)
      }
      
    })
    .then(console.error);
  }
}