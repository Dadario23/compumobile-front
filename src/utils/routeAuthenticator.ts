const authenticateRoute = (url: string) => {
  const userRoutes = ["/home", "/register"];
  const adminRoutes = ["/dashboard"];
  const isUserRoute = userRoutes.some((sbs) => url.includes(sbs));
  const isAdminRoute = adminRoutes.some((sbs) => url.includes(sbs));
  return { isAdminRoute, isUserRoute };
};

export default authenticateRoute;
