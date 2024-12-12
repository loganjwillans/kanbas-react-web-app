import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const findAllQuizzes = async (courseId: any) => {
  const response = await axiosWithCredentials.get(`${QUIZZES_API}/${courseId}`);
  return response.data;
};

export const findQuizById = async (quizId: any) => {
  try {
    const response = await axiosWithCredentials.get(
        `${QUIZZES_API}/quiz/${quizId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    // Return mock data if the API call fails
    return mockQuizData;
  }
};

export const createQuiz = async (quiz: any) => {
  const response = await axiosWithCredentials.post(`${QUIZZES_API}`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: any) => {
  const response = await axiosWithCredentials.delete(
      `${QUIZZES_API}/${quizId}`
  );
  return response.data;
};

export const updateQuiz = async (quiz: any) => {
  const response = await axiosWithCredentials.put(
      `${QUIZZES_API}/${quiz._id}`,
      quiz
  );
  return response.data;
};

// do we have something like this?
export const fetchQuizQuestions = async (quizId: string) => {
  try {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/quiz/${quizId}/questions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return mockQuizData.questions;
  }
};

// calculate total points
export const calculateTotalPoints = (quiz: any) => { // unused, someone steal it. i saw vans comments and made it
  return quiz.questions.reduce(
      (acc: number, q: any) => acc + q.points,
      0
  );
};

// Mock quiz data
const mockQuizData = {
  "_id": "poke001",
  "title": "Pokemon Trainer Basics Quiz",
  "description": "Test your knowledge of Pokemon fundamentals!",
  "quiz_type": "Graded Quiz",
  "total_points": 30,
  "assignment_group": "Quizzes",
  "shuffle_answers": true,
  "time_limit": 15,
  "multiple_attempts": false,
  "attempts_allowed": 1,
  "show_correct_answers": "After Submission",
  "access_code": "",
  "one_question_at_a_time": true,
  "webcam_required": false,
  "lock_questions_after_answering": true,
  "due_date": "2024-09-01T23:59:59Z",
  "available_date": "2024-08-15T00:00:00Z",
  "until_date": "2024-09-02T23:59:59Z",
  "questions": [
    {
      "id": "q1",
      "title": "Starter Pokemon",
      "type": "Multiple Choice",
      "points": 10,
      "question": "Which of the following is NOT a typical starter Pokemon?",
      "choices": [
        { "id": "a", "option": "Charmender" },
        { "id": "b", "option": "Arceus" },
        { "id": "c", "option": "Pikachu" },
        { "id": "d", "option": "Bulbasaur" }
      ],
      "correct_choice": "c"
    },
    {
      "id": "q2",
      "title": "Evolution Fact",
      "type": "True/False",
      "points": 5,
      "question": "All Pokemon evolve at least once.",
      "correct_choice": false
    },
    {
      "id": "q3",
      "title": "Pokemon Type",
      "type": "Fill in the Blank",
      "points": 15,
      "question": "Pikachu is an ________ type Pokemon.",
      "correct_answers": ["electric", "Electric", "eleectuc", "elecetric"] // i messed up when testing and added them here
    }
  ]
};
