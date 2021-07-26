import logo from './logo.svg';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import { DatePicker, Button } from 'antd';
import {useEffect, useState} from 'react'
import { Modal, Collapse } from 'antd';
import { isCompositeComponent } from 'react-dom/test-utils';
const { Panel } = Collapse;

// import ListBody from 'antd/lib/transfer/ListBody';

function App() {

    const [categories, setCategories] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedQuestion, setSelectedQuestion] = useState();
    const [questions, setQuestions] = useState();
    const [selectedAnswer, setSelectedAnswer] = useState();
    const [answers, setAnswers] = useState();

    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [showAnswerForm, setShowAnswerForm] = useState(false);
  

    const [questionTxt, setQuestionTxt] = useState();
    const [answerTxt, setAnswerTxt] = useState();

    const fetchCategories = async () => {
        let res = await fetch('http://localhost:3000/api/v1/categories')
        let json = await res.json()
        console.log(json)
        setCategories(json)
    };

    useEffect(() => {
        console.log('run this only once when the page loads up')
        fetchCategories()
    }, [])

    const fetchQuestions = async (category) => {
        console.log(category)
        // write code here to make a fetch call to get ALL the questions where cateogry id = category.id
        // once fetched, write code to display it on the UI
        let res = await fetch(`http://localhost:3000/api/v1/categories/${category.id}/questions`)
        let data = await res.json()
        console.log(data)
        setQuestions(data)
    };

  

    const switchCategory = async (category) => {
        console.log('the selcted category is', category)
        setSelectedCategory(category)
        // write code here to fetch the questions for the selected category
        fetchQuestions(category)

    };

const createQuestion = async () => {
console.log('questionTxt', questionTxt);
console.log('selectedCategory', selectedCategory);
let res = await fetch(`http://localhost:3000/api/v1/categories/${selectedCategory.id}/questions`, {
  method: 'POST',
  headers: {
  'Content-Type': 'application/json'
},

body: JSON.stringify({questionTxt: questionTxt})

})

let data = await res.json()
console.log(data)
fetchQuestions(selectedCategory);
setQuestionTxt('');
setShowQuestionForm(false);

    };

    const onPanelChange = async (questionId) => {
      console.log(questionId)
      let q
      questions.map((question) => {
        if (question.id == questionId) {
          q = question
        }
      })
      console.log(q)
      setSelectedQuestion(q)
      fetchAnswers(q)
      console.log('panel was clicked')
    };


    const fetchAnswers = async (question) => {

      if(question){
        console.log(question)
      // write code here to make a fetch call to get ALL the questions where cateogry id = category.id
      // once fetched, write code to display it on the UI
      let res = await fetch(`http://localhost:3000/api/v1/questions/${question.id}/answers`)
      let data = await res.json()
      console.log(data)
      setAnswers(data)

      }
      
      
      // let currentAnswers = answers
      // currentAnswers[questions.id] = data
      // setAnswers(currentAnswers)
      
  };

   
    const createAnswer = async () => {
      console.log('answerTxt', answerTxt);
      console.log('selectedQuestion', selectedQuestion);
      let res = await fetch(`http://localhost:3000/api/v1/questions/${selectedQuestion.id}/answers`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify({answerTxt: answerTxt})
      
      })

      let data = await res.json()
console.log(data)
fetchAnswers(selectedQuestion);
setAnswerTxt('');
setShowAnswerForm(false);

    };

  

  return (
    <>

        <div className={'flex justify-center p-6 border-b-4 border-green-400 bg-gradient-to-r from-green-400 to-blue-500'}>
            <h1 className={'text-4xl uppercase font-bold tracking-wider text-white text-center'}>Capstone App</h1>

        </div>

   

        <Modal title="New Question" visible={showQuestionForm} closable={false} footer={null}>
        {selectedCategory && <div className={'w-full p-2'}>
                <textarea value={questionTxt} 
                onChange ={(ev)=> setQuestionTxt(ev.currentTarget.value)} 
                type="text" 
                rows={4}
                className={'border p-1 w-full mb-4'} 
                placeholder={'Enter the question text...'} />

                <button className={'px-4 py-3 bg-blue-500 text-white rounded mr-4 hover:bg-blue-300'} onClick={createQuestion} ghost={true}>Create Question</button>
                <button className={'px-4 py-3 bg-red-500 text-white rounded'} onClick={() =>setShowQuestionForm(false)}>Cancel</button>
                </div>}
      </Modal>

      <Modal title="New Answer" visible={showAnswerForm} closable={false} footer={null}>
        {selectedCategory && selectedQuestion && <div className={'w-full p-2'}>
                <textarea value={answerTxt} 
                onChange ={(ev)=> setAnswerTxt(ev.currentTarget.value)} 
                type="text" 
                rows={4}
                className={'border p-1 w-full mb-4'} 
                placeholder={'Enter the answer text...'} />

                <Button className={'px-4 py-3 bg-blue-500 text-white rounded mr-4 hover:bg-blue-300'} onClick={createAnswer}>Create Answer</Button>
                <Button className={'px-4 py-3 bg-red-500 text-white rounded'} onClick={() =>setShowAnswerForm(false)} danger>Cancel</Button>
                </div>}
      </Modal>

     

        <div className={'grid grid-cols-12'}>
            <div className={'col-span-12 md:col-span-4'}>
                {/*<h1>Category Listing</h1>*/}

                <ul className={'border'}>
                    {categories && categories.map((category) => {
                        return <li key={category.id}
                                   onClick={() => switchCategory(category)}
                                   className={(selectedCategory && (selectedCategory.id == category.id)) ?  'p-14 border-b text-2xl bg-gradient-to-r from-green-500 to-white cursor-pointer hover:text-white uppercase text-center' : 'p-14 border-b text-2xl font-black cursor-pointer bg-gradient-to-r from-green-500 to-white hover:bg-green-200 hover:text-white uppercase text-center'}>{category.name}</li>
                    })}
                </ul>

                {/*<DatePicker />*/}
                {/*<Button type="danger" ghost>Primary Button</Button>*/}


            </div>

  <div className={'col-span-12 border md:col-span-8'}>
                

               {/* { selectedCategory && <div className={'w-1/3 p-2'}>
                <textarea value={questionTxt} 
                onChange ={(ev)=> setQuestionTxt(ev.currentTarget.value)} 
                type="text" 
                className={'border p-1 w-full'} 
                placeholder={'Enter the question text...'} />
                <button className={'px-4 py-3 bg-blue-500 text-white rouned'} onClick={createQuestion}>Create Question</button>
              
                </div>} */}

                {selectedCategory ? <h1 className={'text-center text-blue-400 text-4xl uppercase mt-10 font-black'}>Questions and Answers</h1> : <h1 className={'text-center text-4xl mt-20 uppercase text-blue-500 cursor-pointer'}>Select a Category to Continue</h1>}


                {selectedCategory && <div className={'p-4'}>
                <h2 className={'text-center text-2xl text-green-500'}>Click the Button Below to Create a New Question:</h2>
                <Button className={'px-4 py-3 bg-blue-500 text-white rounded uppercase'} onClick={() => setShowQuestionForm(true)} block>New Question</Button>
                </div>}

                {selectedCategory && <div className={'p-4'}>
                <h2 className={'text-center text-2xl text-green-500'}>Click the Button Below to Create a New Answer:</h2>
                <Button danger className={'px-4 py-3 bg-blue-500 text-white rounded uppercase'} onClick={() => setShowAnswerForm(true)} block>New Answer</Button>
                </div>}
                

                
                {/* {selectedCategory ? <h1 className={'text-center text-4xl uppercase'}>Questions</h1> : <h1 className={'text-center text-4xl mt-20 uppercase text-blue-500 cursor-pointer'}>Select a Category to Continue</h1>} */}


                {selectedCategory && questions && questions.length>0 && <div className={'flex justify-center px-24 w-full'}>
                <Collapse accordion className={'w-full '} onChange={onPanelChange}>
                {questions && questions.map((question) =>{
         
                 return <Panel header={question.questionTxt} key={question.id}>

                <Modal title="New Answer" visible={showAnswerForm} closable={false} footer={null}>
        {selectedCategory && selectedQuestion && <div className={'w-full p-2'}>
                <textarea value={answerTxt} 
                onChange ={(ev)=> setAnswerTxt(ev.currentTarget.value)} 
                type="text" 
                rows={4}
                className={'border p-1 w-full mb-4'} 
                placeholder={'Enter the answer text...'} />

                <Button className={'px-4 py-3 bg-blue-500 text-white rounded mr-4 hover:bg-blue-300'} onClick={createAnswer}>Create Answer</Button>
                <Button className={'px-4 py-3 bg-red-500 text-white rounded'} onClick={() =>setShowAnswerForm(false)} danger>Cancel</Button>
                </div>}
      </Modal>


      {/* {selectedQuestion && answers && <div className={'flex justify-center px-24 w-full'}></div>
                      }{answers && answers.map((answers) => {
                        return <p header={answers.answerTxt} key={answers.id}>{answerTxt}</p>
                      })} */}

                      {answers && answers.map((answer) => {
                        return <p header={answer.answerTxt} key={answer.id}>{answer.answerTxt}</p>
                      })}

                
          
          
          <Button onClick={() => setShowAnswerForm(true)} className={'px-2 py-1 bg-blue-500 text-white rounded'} danger>Add Answer</Button>
                
   

    </Panel> 
    })}

  </Collapse>

        
</div>}
            </div>

        </div>



    </>
  );
}

export default App;