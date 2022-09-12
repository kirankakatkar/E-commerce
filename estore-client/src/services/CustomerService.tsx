import ProductModel from "../shared/models/ProductModel";

import { API, endpoints } from "../api";
import CustomerModel from "../shared/models/CustomerModel";

class CustomerService {
  static createCustomer(cust: CustomerModel) {
    return API.post(endpoints.api.customer.create, cust);
  }

  static updateCustomer(id: string, cust: CustomerModel) {
    return API.put(`${endpoints.api.customer.update}${id}`, cust);
  }

  static deleteCustomer(id: string) {
    return API.delete(`${endpoints.api.customer.delete}${id}`);
  }

  static fetchOneCustomer(id?: string) {
    if(!id) return Promise.reject('Invalid id, try again!')
    return API.get(`${endpoints.api.customer.fetchOne}${id}`);
  }

  static fetchAllCustomer(query?: string) {
    let url = endpoints.api.customer.fetchAll;
    if (query) url += query;
    return API.get(url);
  }
}

export default CustomerService;
