import {
  OrderModel,
  WarehouseModel,
  VehicleModel,
  UnitModel,
  TransequipmentModel,
  CategoryModel,
  PackageModel,
  ProductModel,
  UserModel,
} from "../models/index.js";
import { ROLE_DRIVER, ROLE_USER, ROLE_CUSTOMER } from "../constants/index.js";
export default {
  Query: {
    orders: async () => {
      const orders = await OrderModel.find({ typeInput: "Nhập hàng" });
      return orders;
    },
    order: async (parent, { id }) => {
      console.log("id", id);
      const order = await OrderModel.findOne({ _id: id });
      console.log("order", order);
      return order;
    },
    orderNew: async (parent, { id }) => {
      console.log("id", id);
      const order = await OrderModel.findOne({ _id: id });
      console.log("order", order);
      return order;
    },
    orderOutputs: async () => {
      const orders = await OrderModel.find({ typeInput: "Xuất hàng" });
      return orders;
    },
    orderByWarehouse: async (parent, { userId }) => {
      const orders = await OrderModel.find({
        "warehouse.userId": userId,
      });
      return orders;
    },
    statistical: async () => {
      const orderInputs = await OrderModel.find({ typeInput: "Nhập hàng" }, [
        "orderInput",
      ]);
      const orderOutputs = await OrderModel.find({ typeInput: "Xuất hàng" });
      const customers = await UserModel.find({ role: ROLE_CUSTOMER });
      const employee = await UserModel.find({ role: ROLE_USER });
      let products = [];
      orderInputs.map((x) =>
        x.orderInput.containers.map((y) => products.push(y.products))
      );
      console.log("orderInputs", products);
      for (let i = 0; i < orderInputs.length; i++) {
        for (let j = 0; j < orderInputs[i].orderInput.containers.length; j++) {
          for (
            let k = 0;
            k < orderInputs[i].orderInput.containers[j].products.length;
            k++
          ) {
            products.push(orderInputs[i].orderInput.containers[j].products[k]);
          }
        }
      }
      // console.log("BE", products);
      let statistical = {
        numberInput: orderInputs.length,
        numberOutput: orderOutputs.length,
        totalCustomer: customers.length,
        totalProduct: employee.length,
      };
      return statistical;
    },
  },
  Order: {
    warehouse: async (parent, args) => {
      const warehouseId = parent.warehouseId;
      const warehouses = await WarehouseModel.find();
      return warehouses.find((warehouse) => warehouse.id === warehouseId);
    },
    vehicle: async (parent, args) => {
      const vehicleId = parent.vehicleId;
      const vehicles = await VehicleModel.find();
      return vehicles.find((vehicle) => vehicle.id === vehicleId);
    },
    driver: async (parent, args) => {
      const userId = parent.driverId;
      const users = await UserModel.find({ role: ROLE_DRIVER });
      return users.find((user) => user.id === userId);
    },
    customer: async (parent, args) => {
      console.log("parent", parent);
      const userId = parent.customerId;
      const users = await UserModel.find({ role: ROLE_CUSTOMER });
      return users.find((user) => user.id === userId);
    },
    transequipment: async (parent, args) => {
      const transequipmentId = parent.transequipmentId;
      const transequipments = await TransequipmentModel.find();
      return transequipments.find(
        (transequipment) => transequipment.id === transequipmentId
      );
    },

    // orderInput: async (parent, args) => {
    //   console.log("resolver", parent);
    // },
  },
  OrderNew: {
    warehouse: async (parent, args) => {
      const warehouseId = parent.warehouseId;
      const warehouses = await WarehouseModel.find();
      return warehouses.find((warehouse) => warehouse.id === warehouseId);
    },
    vehicle: async (parent, args) => {
      const vehicleId = parent.vehicleId;
      const vehicles = await VehicleModel.find();
      return vehicles.find((vehicle) => vehicle.id === vehicleId);
    },
    driver: async (parent, args) => {
      const userId = parent.driverId;
      const users = await UserModel.find({ role: ROLE_DRIVER });
      return users.find((user) => user.id === userId);
    },
    customer: async (parent, args) => {
      console.log("parent", parent);
      const userId = parent.customerId;
      const users = await UserModel.find({ role: ROLE_CUSTOMER });
      return users.find((user) => user.id === userId);
    },
    transequipment: async (parent, args) => {
      const transequipmentId = parent.transequipmentId;
      const transequipments = await TransequipmentModel.find();
      return transequipments.find(
        (transequipment) => transequipment.id === transequipmentId
      );
    },

    // orderInput: async (parent, args) => {
    //   console.log("resolver", parent);
    // },
  },
  Mutation: {
    //Order
    addOrder: async (parent, args) => {
      const newOrder = new OrderModel(args);
      await newOrder.save();
      return newOrder;
    },
    addOrderNew: async (parent, args) => {
      const newOrder = new OrderModel(args);
      await newOrder.save();
      return newOrder;
    },
    deleteOrder: async (parent, args) => {
      console.log("args", args);
      let OrderId = args._id;

      const result = await OrderModel.deleteOne({ _id: OrderId });
      if (result.deletedCount == 1) {
        return true;
      }
      return false;
    },
    updateOrder: async (parent, args) => {
      const OrderId = args._id;
      console.log("args", args);
      const result = await OrderModel.findByIdAndUpdate(OrderId, {
        typeInput: args.typeInput,
        shipTo: args.shipTo,
        customerId: args.customerId,
      });
      const users = await OrderModel.findOne({ _id: OrderId });
      console.log("re", users);
      return users;
    },
  },
};
