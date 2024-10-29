const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('amadeusToken');
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  
  // In your router setup
  <Route 
    path="/account" 
    element={
      <ProtectedRoute>
        <AccountPage />
      </ProtectedRoute>
    } 
  />
  