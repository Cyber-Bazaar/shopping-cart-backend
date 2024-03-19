import { Request, Response } from "express";
import { OrderService } from "../../application/order.service";
import { Injectable, Inject } from "../../presentation/utils/dIContainer";

@Injectable()
export class OrderController {
  constructor(
    @Inject("OrderService") private readonly orderService: OrderService
  ) {}

  async getOrderHistory(req: Request, res: Response) {
    try {
      const orderHistory = await this.orderService.getOrderHistory();
      res.status(200).json({ message: "success", data: orderHistory });
    } catch (error) {
      console.error("Error while fetching products:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

}
