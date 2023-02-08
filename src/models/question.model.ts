export type PlainQuestion = {
  questionText: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  answer: string;
  description: string;
  year: string | number;
  course?: string;
  image: string;
  courseId?: string;
  direction?: string;
};
