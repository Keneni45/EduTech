import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './plainquestiondata.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ExamCategory } from '../../models/exam-catagory.model';
import { fetchExamCategories } from '../../DataService/fetchExamCatagories.service';
import SelectDropdown, {SelectOption} from '../../components/SelectDropdown';
import { fetchExamSubCategories } from '../../DataService/fetchSubExamCategory';
import Editor from '../../quill/Editor';
import { PlainQuestion } from '../../models/question.model';
import { Dropdown } from '../../components/DropDown';


export default function PlainQuestionData() {
    const [examCatagories, setExamCatagories]=useState<SelectOption[]>([]);
    const [selectedExamCategory,setSelectedExamCategory] = useState('')
    const [selectedCourse,setSelectedCourse] = useState('')
    const [selectedSubExamCategory,setSelectedSubExamCategory] = useState('')
    const [year,setYear] = useState('')
    const [courses, setCourses]= useState<SelectOption[]>([])
    const [subExamCatagory, setSubExamCatagory]= useState<SelectOption[]>([]);
    const [questionText,setQuestionText] = useState('')
    const [option_a, setOption_a] = useState('')
    const [option_b, setOption_b] = useState('')
    const [option_c, setOption_c] = useState('')
    const [option_d, setOption_d] = useState('')
    const [description, setDescription] = useState('')
    const [answerText, setAnswerText] = useState('')
    
    async function fetchInitialFromServer() {
        let data = await fetchExamCategories();
        let examCatsOption = []
        for (const examCat of data) {
            examCatsOption.push({label:examCat.name,value:examCat._id});
        }
        setExamCatagories(examCatsOption);
        setSelectedExamCategory(data[0]._id);

      
        let coursesOption = [];  
        for (const course of data[0].courses) {
            coursesOption.push({label:course.name,value:course._id})
        }
         setCourses(coursesOption);
         setSelectedCourse(coursesOption[0].value);

         const subExamCats = await fetchExamSubCategories(data[0]._id);
         setSubExamCatagory(subExamCats);
         setSelectedSubExamCategory(subExamCats[0].value);
        
        
    }

    useEffect(()=>{
        fetchInitialFromServer();
    }, [])
        const hanldeExamCategoryChange = (e:any)=>{
     //TODO:
     }
        const hanldeCourseChange = (e:any)=>{
         setSelectedCourse(e.target.value);
    }
        const hanldeSubExamCategoryChange = (e:any)=>{
         setSelectedSubExamCategory(e.target.value);
    }
    const setQuestionTextValue = (val:string)=>{
      setQuestionText(val);
    }
    const setOption_a_Text = (val:string)=>{
      setOption_a(val);
    }
    const setOption_b_Text = (val:string)=>{
       setOption_b(val);
     }
     const setOption_c_Text = (val:string)=>{
       setOption_c(val);
     }
     const setOption_d_Text = (val:string)=>{
       setOption_d(val);
     }
     const setOption_answer_Text = (val:string)=>{
       setAnswerText(val);
     }
     const setDescription_Text = (val:string)=>{
       setDescription(val);
     }
    const submitQuestionToBackend = (e:any)=>{
      let question:PlainQuestion = {
        questionText, 
        option_a:option_a,
        option_b:option_b,
        option_c:option_c,
        option_d:option_d,
        answer:answerText,
        description:description,
        course: selectedCourse,
        year:year,
        image:'some question image'
      }
      console.log(question);
      //create question api submit
    }
  return (
    <div className="plainquestion-bg-kulli">
    <div className="plain-question"> 
      <div className="exam-catagory">
      <SelectDropdown title='' items={examCatagories} handleSelect={hanldeExamCategoryChange}/>
      </div>
      <div className="course-selection">
      <SelectDropdown title='' items={courses} handleSelect={hanldeCourseChange}/>
      </div>
      <div className="subCatagory">
      <SelectDropdown title='' items={subExamCatagory} handleSelect={hanldeSubExamCategoryChange}/>
      </div>
      <div className="kulli">
      <div className="editor-container">
        <p>Paste your question here</p>
      <Editor setValue={setQuestionTextValue}/>
      </div>
      <div className="editor-container">
        <p>Paste your option A here</p>
      <Editor setValue={setOption_a_Text}/>
      </div>
      <div className="editor-container">
        <p>Paste your option B here</p>
      <Editor setValue={setOption_b_Text}/>
      </div>
      <div className="editor-container">
        <p>Paste your option C here</p>
      <Editor setValue={setOption_c_Text}/>
      </div>
      <div className="editor-container">
        <p>Paste your option D here</p>
      <Editor setValue={setOption_d_Text}/>
      </div>
      <div className="editor-container">
        <p>Paste your  Answer here</p>
        <input onChange={(e)=>setAnswerText(e.target.value)}/>
      </div>
      
      <div className="editor-container">
        <p>fill year here</p>
        <input onChange={(e)=>setYear(e.target.value)}/>
      </div> 

      <div className="editor-container">
        <p>Paste your option Description here</p>
      <Editor setValue={setDescription_Text}/>
      </div>
      
      </div>
      <div className='submit-butt'>
        <button onClick={submitQuestionToBackend}>submit</button>
      </div>
      {questionText}
  </div>
  </div>
  
  )
}


