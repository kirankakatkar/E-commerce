import ProductModel from "../shared/models/ProductModel";

import { API, endpoints } from "../api";

class ProductService {
  static createProduct(prod: ProductModel) {
    return API.post(endpoints.api.product.create, prod);
  }

  static updateProduct(id: string, prod: ProductModel) {
    return API.put(`${endpoints.api.product.update}${id}`, prod);
  }

  static deleteProduct(id: string) {
    return API.delete(`${endpoints.api.product.delete}${id}`);
  }

  static fetchOneProduct(id?: string) {
    if(!id) return Promise.reject('Invalid id, try again!')
    return API.get(`${endpoints.api.product.fetchOne}${id}`);
  }

  static fetchAllProduct(query?: string) {
    let url = endpoints.api.product.fetchAll;
    if (query) url += query;
    return API.get(url);
  }
}

export default ProductService;
