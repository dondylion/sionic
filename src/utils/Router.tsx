import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {
  useLocation, Location,
  useParams, Params,
  useNavigate, NavigateFunction,
} from 'react-router-dom';
import WorkplaceLayouts from '../Layouts/WorkplaceLayouts';
import Busket from '../Pages/Busket/Busket';
import Categories from '../Pages/Categories/Categories';
import Products from '../Pages/Products/Products';

export declare type RouterProps = {
    navigate: NavigateFunction;
    location: Location;
    params: Params;
}

export function Router() {
  const navigate:NavigateFunction = useNavigate();
  const location:Location = useLocation();
  const params:Params = useParams();

  const routerProps: RouterProps = {navigate, location, params};

  return (
    <Routes>
      <Route
        path="/"
        element={
            <WorkplaceLayouts routerProps={routerProps}>
                <Categories
                    routerProps={routerProps}
                    key='categories'
                />
            </WorkplaceLayouts>
        }
      />
      <Route
        path="products"
        element={
        <WorkplaceLayouts routerProps={routerProps}>
            <Products
                routerProps={routerProps}
                key='products'
            />
        </WorkplaceLayouts>
        }
      />
      <Route
        path="busket"
        element={
        <WorkplaceLayouts routerProps={routerProps}>
            <Busket
                routerProps={routerProps}
                key='products'
            />
        </WorkplaceLayouts>
        }
      />
    </Routes>
  );
}
