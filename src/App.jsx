
import { Provider } from 'jotai';
import MdWrapper from './components/mdwrapper';
import SideBar from './components/sidebar';


function App() {
  console.log('is this working?')

  return (
    <>
    <Provider>

    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 h-screen overflow-hidden">
      <SideBar></SideBar>

      <div className="card col-span-2 md:col-span-3 lg:col-span-4 overflow-auto">
        <MdWrapper />
      </div>
    </div>
    
    </Provider>
      
    </>
  )
}

export default App
