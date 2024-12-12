import {useNavigate, useParams} from "react-router";
import QuizList from "./QuizList";
import {useState} from "react";
import {FaEllipsisV, FaPlus, FaSearch} from "react-icons/fa";
import * as client from "../Quizzes/client";
import {useDispatch} from "react-redux";
import {addQuiz} from "./reducer";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {Link} from "react-router-dom";

export default function Quizzes() {
    const {cid} = useParams();
    const course = new Date()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const quiz = {
        _id: "",
        course_id: cid as String,
        title: "New Quiz",
        description: "-description here-",
        published: false,
        available_date: new Date(),
        until_date: new Date(),
        due_date: new Date(),
        quiz_type: "Graded Quiz",
        points: 0,
        assignment_group: "Quizzes",
        shuffle_answers: false,
        time_limit: 20,
        multiple_attempts: false,
        total_points: 100,
        show_correct_answers: "After Submission",
        access_code: "",
        one_question_at_a_time: true,
        webcam_required: false,
        lock_questions_after_answering: false,
        questions: [],
        attempts: [],
        status: 'draft',
    };

    const handleCreateQuiz = async () => {
        try {
            const newQuiz = await client.createQuiz(quiz);
            dispatch(addQuiz(newQuiz)); // updates redux store
        } catch (error) {
            console.error("Error creating quiz:", error);
        }
    };

    return (
        <div id="wd-quizzes">
            <div className="row align-items-center mb-5">
                <div className="col">
                    <div className="input-group">
                        <span className="input-group-text"><FaMagnifyingGlass/></span>
                        <input type="text" id="wd-search-quiz" placeholder="Search for Quiz" className="form-control"/>
                    </div>
                </div>
                <div className="col">


                    <button
                        id="wd-add-quiz"
                        className="float-end btn btn-lg btn-danger"
                        onClick={handleCreateQuiz}
                    >
                        <FaPlus className="position-relative me-2" style={{bottom: "1px"}}/>
                        Quiz
                    </button>

                    <button className="float-end btn btn-lg btn-secondary me-1">
                        <FaEllipsisV/>
                    </button>
                </div>
            </div>


            <div>
                <QuizList/>
            </div>
        </div>
    );
}
