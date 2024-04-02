import { Request, Response, NextFunction } from "express";
import { OrderService } from "../../application/order.service";
import { Injectable, Inject } from "../../presentation/utils/dIContainer";
import jwt from "jsonwebtoken";
interface ExpressRequest extends Request {
  tokenPayload?: jwt.JwtPayload;
}
@Injectable()
export class OrderController {
  constructor(
    @Inject("OrderService") private readonly orderService: OrderService
  ) { }

  async getOrderHistory(req: ExpressRequest, res: Response) {
    if (req.tokenPayload) {
      try {
        const orderHistory = await this.orderService.getOrderHistory(req.tokenPayload.sub);
        res.status(200).json({ message: "success", data: orderHistory });
      } catch (error) {
        console.error("Error while fetching order History:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
    else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

  async createOrder(req: ExpressRequest, res: Response) {
    if (req.tokenPayload && req.tokenPayload.sub) {
      try {
        await this.orderService.createOrder(req.body, req.tokenPayload.sub);
        res.status(200).json({ message: "successfully inserted" });
      } catch (error) {
        console.error("Error while checkout:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
    else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
}
