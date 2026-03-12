react-router-dom
./context/AuthContext
./Pages/AuthPage
./Pages/HomePage
./Pages/RestaurantPage
./Pages/CartPage
./Pages/CheckoutPage
./Pages/OrdersPage
./Pages/OrderTrackingPage
./Pages/FavouritesPage
./Pages/ProfilePage
./Pages/SearchPage
./Pages/CategoryPage
./Components/Layout/AppLayou
function Guard({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" replace />;
}
function Public({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Public><AuthPage /></Public>} />
      <Route path="/" element={<Guard><AppLayout /></Guard>}>
        <Route index                   element={<HomePage />} />
        <Route path="search"           element={<SearchPage />} />
        <Route path="category/:slug"   element={<CategoryPage />} />
        <Route path="restaurant/:id"   element={<RestaurantPage />} />
        <Route path="cart"             element={<CartPage />} />
        <Route path="checkout"         element={<CheckoutPage />} />
        <Route path="orders"           element={<OrdersPage />} />
        <Route path="orders/:id/track" element={<OrderTrackingPage />} />
        <Route path="favourites"       element={<FavouritesPage />} />
        <Route path="profile"          element={<ProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
