import axios from "../api/axios";
import { Direction } from "../models/direction.model";
import { PlainQuestion } from "../models/question.model";

export async function submitPlainQuestionToServer(question: PlainQuestion) {
  try {
    let raw = await axios.post(`/questions/create`, question);
    let data = raw.data as PlainQuestion;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function submitGroupedQuestionToServer(
  groupedQuestion: PlainQuestion
) {
  try {
    let raw = await axios.post(`/grouped-questions/create`, groupedQuestion);
    let data = raw.data as PlainQuestion;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function submitDirectionToServer(direction: Direction) {
  try {
    let raw = await axios.post(`/directions/create`, direction);
    let data = raw.data as Direction;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);

    return error;
  }
}
