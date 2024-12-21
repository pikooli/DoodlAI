import { useState } from 'react';
import './App.css';
import { Drawing, Home, Error } from './component/pages';
import { PageContext } from './context';

const PageDisplay = ({ page }) => {
  switch (page) {
    case '/':
      return <Home />;
    case '/drawing':
      return <Drawing />;
    default:
      return <Error />;
  }
};

function App() {
  const [page, setPage] = useState('/');

  return (
    <PageContext.Provider value={{ page, setPage }}>
      <PageDisplay page={page} />
    </PageContext.Provider>
  );
}

export default App;
