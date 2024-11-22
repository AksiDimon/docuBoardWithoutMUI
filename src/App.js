import { Form } from "./components/From";
import { Spreadsheet } from "./components/Spreadsheet";
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import { Edit } from "./components/Edit";
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Form/>
    },
    {
      path: '/spreadsheet',
      element: <Spreadsheet/>
    },
    {
      path: '/edit',
      elsement: <Edit/>
    }
  ])
  return (
    <div>
     {/* Dima
     <Form/> */}
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
