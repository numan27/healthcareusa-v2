// import React, { useState, useEffect } from 'react';
import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterConfig from './Navigation/RouterConfig';
import { ToastContainer } from 'react-toastify';
// import { setLoaderCallbacks } from './assets/axios';
import { LoaderPageWithoutBG } from './assets';
import './assets/css/styles.css';

function App() {
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoaderCallbacks(() => setLoading(true), () => setLoading(false));
  // }, []);

  return (
    <Router>
      <Suspense fallback={<LoaderPageWithoutBG />}>
        <ToastContainer />
        <RouterConfig />
        {/* {loading && <LoaderPageWithoutBG />} */}
      </Suspense>
    </Router>
  );
}

export default App;
