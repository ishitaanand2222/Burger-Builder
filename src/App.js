import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

const App = () => {
    return (
      <div>
        <Layout>
          <Routes>
            <Route path='/checkout/*' element={<Checkout/>}/>
            <Route path='/' exact element={<BurgerBuilder/>}/>
          </Routes>
        </Layout>
      </div>
    );
}

export default App;
