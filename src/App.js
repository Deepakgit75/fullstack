import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import PostListPage from './pages/PostListPage';
import RootLayout from './components/RootLayout';
import { CookiesProvider } from 'react-cookie'
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';

const App = () => {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<RootLayout/>}>
            <Route path="/" element={<HomePage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route element={<PrivateRoute/>}>
                <Route path="/posts" element={<PostListPage/>} />
            </Route>
        </Route>

    ))
    return (
        <div className='App'>
            <CookiesProvider>
                <RouterProvider router={router} />
            </CookiesProvider>
        </div>

    );
};

export default App;

