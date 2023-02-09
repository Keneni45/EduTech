import "./groupedquestionpage.css";
import { useState, useEffect, useRef, CSSProperties } from "react";
import placeholderImage from "../../assets/place_holder.jpg";

import { AxiosError } from "axios";
import { SelectOption } from "../../DataService/service.types";
import { PlainQuestion as GroupedQuestion } from "../../models/question.model";
import SelectDropdown from "../../components/SelectDropdown";
import Editor from "../../quill/Editor";
import {
  fetchGroupedCourses,
  fetchGroupedCoursesDirectionYears,
  fetchDirectionOfCourseByYear,
} from "../../DataService/fetchCourse.service";
import { submitGroupedQuestionToServer } from "../../DataService/submit-questions.service";
import { ToastContainer, Toast } from "react-bootstrap";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { FadeLoader } from "react-spinners";
const override: CSSProperties = {
  margin: "10 auto",
  borderColor: "red",
};

export default function GroupedQuestionPage() {
  const [errorMessage, setErrorMessage] = useState("");
  let [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<SelectOption[]>([]);
  const [directions, setDirections] = useState<SelectOption[]>([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [years, setYears] = useState<SelectOption[]>([]);
  const [selectedYear, setSelectedYear] = useState("2015");
  const [selectedDirection, setSelectedDirection] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [questionNumber, setQuestionNumber] = useState<number>();
  const [option_a, setOption_a] = useState("");
  const [option_b, setOption_b] = useState("");
  const [option_c, setOption_c] = useState("");
  const [option_d, setOption_d] = useState("");
  const [description, setDescription] = useState("");
  const [answerText, setAnswerText] = useState("option_a");
  const [show, setShow] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const isInitialMount = useRef(true);

  const [questionImage, setQuestionImage] = useState("");
  const [descriptionImage, setDescriptionImage] = useState("");
  const [tempQuestionImagePath, setTempQuestionImagePath] = useState("");
  const [tempDescriptionImagePath, setTempDescriptionImagePath] = useState("");
  const answerOptions: SelectOption[] = [
    { label: "A", value: "option_a" },
    { label: "B", value: "option_b" },
    { label: "C", value: "option_c" },
    { label: "D", value: "option_d" },
  ];
  async function fetchGroupedQuestionFromServer(
    courseId?: string,
    year?: number
  ) {
    let filteringCourseId = "",
      filteringYear = 2015;
    if (!(courseId && year)) {
      //if courseId or  year not provided  fetch all from server
      const groupedCourses = await fetchGroupedCourses();
      setCourses(groupedCourses);
      const defaultCourseId = groupedCourses[0].value;
      filteringCourseId = defaultCourseId;
      setSelectedCourse(defaultCourseId);
      const years = await fetchGroupedCoursesDirectionYears(defaultCourseId);
      setYears(years);
      const defaultYear = years[0].value;
      filteringYear = parseInt(defaultYear);
      setSelectedYear(defaultYear);
    } else {
      filteringCourseId = courseId;
      filteringYear = year;
    }

    //getDirections and populate
    const directionsFromServer = await fetchDirectionOfCourseByYear(
      filteringCourseId,
      filteringYear
    );
    const defaultDirectionId = directionsFromServer[0].value;
    console.log(directionsFromServer);
    setSelectedDirection(defaultDirectionId);
    setDirections(directionsFromServer);
  }

  useEffect(() => {
    fetchGroupedQuestionFromServer();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Your useEffect code here to be run on update only not initial mount
      fetchGroupedQuestionFromServer(selectedCourse, parseInt(selectedYear));
    }
  }, [selectedCourse, selectedYear]);

  const handleCourseChange = (e: any) => {
    setSelectedCourse(e.target.value);
  };
  const handleDirectionChange = (e: any) => {
    setSelectedDirection(e.target.value);
  };
  const handleYearChange = (e: any) => {
    setSelectedYear(e.target.value);
  };
  function handleQuestionImageChange(e: any) {
    console.log(e.target.files);
    setTempQuestionImagePath(URL.createObjectURL(e.target.files[0]));
    setQuestionImage(e.target.files[0]);
  }
  function handleDescriptionImageChange(e: any) {
    console.log(e.target.files);
    setTempDescriptionImagePath(URL.createObjectURL(e.target.files[0]));
    setDescriptionImage(e.target.files[0]);
  }
  const setQuestionTextValue = (val: string) => {
    setQuestionText(val);
  };
  const setOption_a_Text = (val: string) => {
    setOption_a(val);
  };
  const setOption_b_Text = (val: string) => {
    setOption_b(val);
  };
  const setOption_c_Text = (val: string) => {
    setOption_c(val);
  };
  const setOption_d_Text = (val: string) => {
    setOption_d(val);
  };
  const set_answer_Text = (e: any) => {
    setAnswerText(e.target.value);
  };
  const setDescription_Text = (val: string) => {
    setDescription(val);
  };
  const submitQuestionToBackend = async (e: any) => {
    setErrorMessage(""); //make empty error message before submission
    setLoading((prev) => true);
    let question: GroupedQuestion = {
      questionText,
      option_a: option_a,
      option_b: option_b,
      option_c: option_c,
      option_d: option_d,
      answer: answerText,
      description: description,
      courseId: selectedCourse,
      year: parseInt(selectedYear),
      direction: selectedDirection,
      questionNumber,
    };

    const result = await submitGroupedQuestionToServer(
      question,
      questionImage,
      descriptionImage
    );
    setLoading((prev) => false);

    if (result instanceof AxiosError) {
      let msgTxt = "";
      const messages = result.response?.data?.message as Array<string>;
      for (const msg of messages) {
        msgTxt += msg + " "; //concatenate array of error messages
      }
      setErrorMessage(msgTxt);
      //Todo handle error
      setShowErrorToast(true);
    } else {
      //todo Handle success
      setShow(true);
    }
  };
  return (
    <LoadingOverlayWrapper
      active={loading}
      spinner={
        <FadeLoader
          loading={loading}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      }
    >
      <div className="grouped-question-bg-kulli">
        {errorMessage.length > 0 && (
          <p style={{ color: "red" }}>{errorMessage}</p>
        )}
        <ToastContainer className="p-3" position="bottom-end">
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            bg="success"
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Server response</strong>
            </Toast.Header>
            <Toast.Body>Question Submit Success</Toast.Body>
          </Toast>
        </ToastContainer>
        <ToastContainer className="p-3" position="bottom-end">
          <Toast
            onClose={() => setShowErrorToast(false)}
            show={showErrorToast}
            delay={5000}
            bg="danger"
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Server response</strong>
            </Toast.Header>
            <Toast.Body>Something is wrong check above message</Toast.Body>
          </Toast>
        </ToastContainer>
        <div className="grouped-question">
          <div className="list-course mt-3">
            <SelectDropdown
              title="Courses"
              items={courses}
              handleSelect={handleCourseChange}
            />
          </div>
          <div className="year-selection mt-3">
            <SelectDropdown
              title="Years"
              items={years}
              handleSelect={handleYearChange}
            />
          </div>
          <div className="direction mt-3">
            <SelectDropdown
              title="Directions"
              items={directions}
              handleSelect={handleDirectionChange}
            />
          </div>
          <div className="editor-container">
            <h6>Question Number</h6>
            <input
              type="number"
              onChange={(e) => setQuestionNumber(parseInt(e.target.value))}
            />
          </div>
          <div className="kulli">
            <div className="editor-container">
              <p>Paste your question here</p>
              <Editor setValue={setQuestionTextValue} editorId="editor1" />
            </div>
            <div className="editor-container">
              <p>
                <strong>select Image if the Question has Image</strong>
              </p>
              <img
                src={tempQuestionImagePath || placeholderImage}
                id="photo"
                className="img"
              />
              <input
                type="file"
                id="file"
                onChange={handleQuestionImageChange}
              />
            </div>
            <div className="editor-container">
              <p>Paste your option A here</p>
              <Editor setValue={setOption_a_Text} editorId="editor2" />
            </div>
            <div className="editor-container">
              <p>Paste your option B here</p>
              <Editor setValue={setOption_b_Text} editorId="editor3" />
            </div>
            <div className="editor-container">
              <p>Paste your option C here</p>
              <Editor setValue={setOption_c_Text} editorId="editor4" />
            </div>
            <div className="editor-container">
              <p>Paste your option D here</p>
              <Editor setValue={setOption_d_Text} editorId="editor5" />
            </div>
            <div className="editor-container">
              <p>choose Answer here</p>
              <SelectDropdown
                title=""
                items={answerOptions}
                handleSelect={set_answer_Text}
              />
            </div>

            <div className="editor-container">
              <p>Paste your option Description here</p>
              <Editor setValue={setDescription_Text} editorId="editor6" />
            </div>
            <div className="editor-container">
              <p>
                {" "}
                <strong>select Image if the description has Image</strong>
              </p>
              <img
                src={tempDescriptionImagePath || placeholderImage}
                id="photo"
                className="img"
              />
              <input
                type="file"
                id="file"
                onChange={handleDescriptionImageChange}
              />
            </div>
          </div>
          <div className="submit-butt">
            <button
              onClick={submitQuestionToBackend}
              className="btn btn-primary btn-lg"
            >
              submit
            </button>
          </div>
          {questionText}
        </div>
      </div>
    </LoadingOverlayWrapper>
  );
}
