import axios from "axios";
import baseURL from "../assets/common/baseURL";


const orderService = {
  placeOrder : async (ordersData) => {
    try {
      axios.post(`${baseURL}order/add`, ordersData);
    } catch (error) {
      console.log(error);
    }
  },
}

export default orderService;