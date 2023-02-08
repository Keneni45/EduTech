import React, { useEffect, useState } from "react";
import { fetchGroupedCourses } from "../../DataService/fetchCourse.service";
import SelectDropdown, { SelectOption } from "../../components/SelectDropdown";
import Editor from "../../quill/Editor";
import { Direction } from "../../models/direction.model";
import { submitDirectionToServer } from "../../DataService/submit-questions.service";

export default function DirectionPage() {
  const [courses, setCourses] = useState<SelectOption[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [directionText, setDirectionText] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [passage, setPassage] = useState<string | undefined>(undefined);
  const [directionNumber, setDirectionNumber] = useState(1);
  const [year, setYear] = useState(2015);

  useEffect(() => {
    fetchCoursesFromServer();
  }, []);
  const fetchCoursesFromServer = async () => {
    let coursesFromServer = await fetchGroupedCourses();
    setCourses(coursesFromServer);
    setSelectedCourse(coursesFromServer[0].value);
  };

  const submitQuestionToBackend = async () => {
    let direction: Direction = {
      course: selectedCourse,
      courseYear: year,
      directionNumber,
      sectionName,
      directionText,
      passage,
    };
    const result = await submitDirectionToServer(direction);
  };

  const handleCourseChange = (e: any) => {
    setSelectedCourse(e.target.value);
  };

  const setDirection_text = (val: string) => {
    setDirectionText(val);
  };

  const setPassage_Text = (val: string) => {
    setPassage(val);
  };

  return (
    <div className="direction-question-bg">
      <div className="direction-question">
        <div className="course-selection mt-3">
          <SelectDropdown
            title="courses"
            items={courses}
            handleSelect={handleCourseChange}
          />
        </div>

        <div className="editor-container mt-3">
          <p>fill year here</p>
          <input
            type="number"
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
        </div>

        <div className="editor-container mt-3">
          <p>fill Direction Number here</p>
          <input
            type="number"
            onChange={(e) => setDirectionNumber(parseInt(e.target.value))}
          />
        </div>

        <div className="editor-discrption mt-3">
          <p>Paste your Direction Text here</p>
          <Editor setValue={setDirection_text} editorId="editor1" />
        </div>

        <div className="section-name">
          <p>paste Direction section Name here</p>
          <input onChange={(e) => setSectionName(e.target.value)} />
        </div>

        <div className="passage-text mt-3 mb-3">
          <p>paste your passage here if any</p>
          <Editor setValue={setPassage_Text} editorId="editor2" />
        </div>
      </div>
      <div className="submit-butt mb-3">
        <button className="btn btn-primary" onClick={submitQuestionToBackend}>
          submit
        </button>
      </div>
    </div>
  );
}
