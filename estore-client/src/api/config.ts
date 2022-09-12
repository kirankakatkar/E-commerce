export default {
  serverBaseURL: "http://127.0.0.1:8888",
  api: {
    user: {
      create: "/users",
      update: "/users/",
      delete: "/users/",
      fetchOne: "/users/",
      fetchAll: "/users",
    },
    category: {
      create: "/categories",
      update: "/categories/",
      delete: "/categories/",
      fetchOne: "/categories/",
      fetchAll: "/categories",
    },
    product: {
      create: "/products",
      update: "/products/",
      delete: "/products/",
      fetchOne: "/products/",
      fetchAll: "/products",
    },
    customer: {
      create: "/customers",
      update: "/customers/",
      delete: "/customers/",
      fetchOne: "/customers/",
      fetchAll: "/customers",
    },
    auth: {
      adminLogin: "/auth",
      validateToken: "/auth/validate-token",
      refreshToken: "/auth/refresh-token",
    },
  },
};
