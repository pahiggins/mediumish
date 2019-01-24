import React from 'react';

const AuthContext = React.createContext({
  status: '',
  toggleStatus: () => {},
});

export default AuthContext;
