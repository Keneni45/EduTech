import axios from "../api/axios";
//import { ExamCategory } from "../models/exam-catagory.model";
import { Course } from "../models/exam-catagory.model";

export async function fetchCourse() {
  let raw = await axios.get(`/exam-categorie-course`);
  let data = raw.data;
  return data as Course[];
}