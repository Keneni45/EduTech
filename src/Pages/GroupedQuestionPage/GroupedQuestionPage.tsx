import React from 'react'
import './groupedquestionpage.css'
import { useState, useEffect } from 'react'
//import { Dropdown } from '../../Components/DropDown'
import { Dropdown } from '../../components/DropDown'
import axios from 'axios'
//import SelectDropdown from '../../SelectDropdown'
import { SelectOption } from '../../DataService/service.types'
import { fetchCourse } from '../../DataService/fetchCourse.service'
import { fetchHasDirection } from '../../DataService/fetchHasDirection.service'
import { PlainQuestion } from '../../models/question.model'
import SelectDropdown from '../../components/SelectDropdown'
import Editor from '../../quill/Editor'
import { string } from 'yup'

export default function GroupedQuestionPage() {
    const [courses, setCourses]= useState<SelectOption[]>([]);
    const [selectedCourse,setSelectedCourse] = useState('')
    const [year, setYear] = useState<SelectOption[]>([]);
    const [selectedYear,setSelectedYear] = useState('')
    const [hasDirection, setHasDirection] = useState<[]>([]);
    const [selectedHasDirection,setSelectedHasDirection] = useState('')
    const [questionText,setQuestionText] = useState('')
    const [option_a, setOption_a] = useState('')
    const [option_b, setOption_b] = useState('')
    const [option_c, setOption_c] = useState('')
    const [option_d, setOption_d] = useState('')
    const [description, setDescription] = useState('')
    const [answerText, setAnswerText] = useState('')
    

    async function fetchGroupedQuestionFromServer() {
        let data = await fetchCourse();
        let coursesOption=[]
            for (const courses of data) {
                coursesOption.push({label:courses.name, value:courses._id})
            }
            setCourses(coursesOption);
            setSelectedCourse(data[0]._id);
    
          
            let yearsOption = [];  
            for (const year of data[0].years) {
                yearsOption.push({label:year.name,value:year._id})
            }
             setYear(yearsOption);
             setSelectedYear(yearsOption[0].value);
    
             const hasDirection = await fetchHasDirection(data[0]._id);
             //setHasDirection(hasDirection);
             setSelectedHasDirection(hasDirection[0].value);
            
        }

        useEffect(()=>{
            fetchGroupedQuestionFromServer()
        },[])

               const hanldeCourseChange = (e:any)=>{
                setSelectedCourse(e.target.value);
           }
              const hanldeHasDirectionChange = (e:any)=>{
                 setSelectedHasDirection(e.target.value)
            }
               const hanldeYearChange = (e:any)=>{
                setSelectedYear(e.target.value);
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
              year: selectedYear,
              image:'some question image'
            }
            console.log(question);
        return (
            <div className="grouped-question-bg-kulli">
            <div className="grouped-question"> 
              <div className="list-course">
              <SelectDropdown title='' items={courses} handleSelect={hanldeCourseChange}/>
              </div>
              <div className="year-selection">
              <SelectDropdown title='' items={year} handleSelect={hanldeYearChange}/>
              </div>
              <div className="direction">
              <SelectDropdown title='' items={hasDirection} handleSelect={hanldeHasDirectionChange}/>
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
        
        }}