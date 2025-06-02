const routes = {
  public: {
    home: "/",
    catalog: "/catalogo",
    rating: "/avaliacao",
  },
  guest: {
    auth: {
      login: "/auth/login",
      register: "/auth/register",
    },
  },
  private: {
    rate: "/avaliar",
  },
};

const publicRoutes = Object.values(routes.public);
const guestRoutes = Object.values(routes.guest);
const privateRoutes = Object.values(routes.private);

export { publicRoutes, guestRoutes, privateRoutes, routes };
