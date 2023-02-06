import React, { useEffect, useState } from 'react'
import { fetchCourse } from '../../DataService/fetchCourse.service';
import SelectDropdown, {SelectOption} from '../../components/SelectDropdown';
import Editor from '../../quill/Editor';
import { DirectionText } from '../../models/direction.model';

export default function DirectionPage() {
    const [courses, setCourses]= useState<SelectOption[]>([]);
    const [selectedCourse,setSelectedCourse] = useState('')

    async function fetchDirectionPage() {
        let Data = await fetchCourse()
        
        let coursesOption = [];  
        for (const course of Data[0].courses) {
            coursesOption.push({label:course.name,value:course._id})
        }
         setCourses(coursesOption);
         setSelectedCourse(coursesOption[0].value);
    }

    useEffect(()=>{
    
    },[])
    const submitQuestionToBackend = (e:any)=>{
      let direction:DirectionText={

      }
      console.log(direction)


    }
    const hanldeCourseChange = (e:any)=>{
        setSelectedCourse(e.target.value);
   }
   
    const setDescription_Text = (val:string)=>{
      setDescription_Text(val);
    }
    const setYear = (val:string)=>{
      setYear(val)
    }
    const setSection_Text =(val:string)=>{
      setSection_Text(val)
    }
    const setPassage_Text=(val:string)=>{
      setPassage_Text(val)
    }

  return (
<div className="direction-question-bg">
    <div className="direction-question"> 
      
      <div className="course-selection">
      <SelectDropdown title='' items={courses} handleSelect={hanldeCourseChange}/>
      </div>
      <div className="editor-container">
        <p>fill year here</p>
        <input onChange={(e)=>setYear(e.target.value)}/>
      </div> 

      <div className="editor-discrption">
        <p>Paste your option Description here</p>
      <Editor setValue={setDescription_Text}/>
      </div>
      <div className="section-name">
        <p>paste your section here</p>
        <Editor setValue={setSection_Text}/>
    </div>
    <div className="passage-text">
      <p>paste your passage here</p>
    </div>
      
      </div>
      <div className='submit-butt'>
        <button onClick={submitQuestionToBackend}>submit</button>
      </div>
    
  </div>

    )
}




