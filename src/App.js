import logo from './logo.svg';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import { DatePicker } from 'antd';

function App() {

  return (
    <>

        <div className={'flex justify-center p-6 border-b-4 border-gray-300'}>
            <h1 className={'text-4xl uppercase font-bold tracking-wider'}>Capstone App</h1>

        </div>

        <div className={'grid grid-cols-12'}>
           <div className={'col-span-12 md:col-span-2 h-96 bg-gray-200'}>
              <h1>Category Listing</h1>

                </div>

                <div className={'col-span-12 md:col-span-10 h-96 bg-gray-300'}>
                <h1>Question/Answer Listing</h1>
                </div>
          </div>

    </>
  );
}

export default App;