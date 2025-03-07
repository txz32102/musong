import React from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import router from './routes/routes';

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
