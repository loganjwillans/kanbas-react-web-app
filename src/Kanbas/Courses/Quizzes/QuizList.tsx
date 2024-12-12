import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxRocket } from "react-icons/rx";
import { GoTriangleDown } from "react-icons/go";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaPencil } from "react-icons/fa6";
import * as client from "../Quizzes/client"
import {useDispatch, useSelector} from "react-redux";
import {findAllQuizzes} from "./client";
import {setQuizzes} from "./reducer";

export default function QuizList() {
  const { cid } = useParams();
  const {quizzes} = useSelector((state: any) => state.quizzesReducer);
  const [selectedQuizzes, setSelectedQuizzes] = useState([]);

  // Haven't been able to test this stuff yet bc of rendering issues
  const dispatch = useDispatch();
    const fetchQuizzes = async () => {
        const quizzes = await findAllQuizzes(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    useEffect(() => {
        fetchQuizzes();
    }, []);

  return (
    <ul className="list-group rounded-0 border-gray">
      <div className="wd-quiz-list-title p-3 ps-2 bg-secondary">
        <GoTriangleDown className="me-2 fs-5" />
        <strong className="fs-5">Assignment Quizzes</strong>
        <BsThreeDotsVertical className="fs-4 mb-1 mx-2" />
      </div>
      {quizzes.map((quiz: any) => (
        <li className="list-group-item p-0 border-0">
          <div
            className="wd-quizzes form-control list-group-item p-3 ps-1 d-flex align-items-center"
            style={{
              borderLeft: "5px solid #198754",
            }}
          >
            <div>
              <Link
                to={`QuizDetails/${quiz._id}`}
                className="text-dark fw-bold fs-5"
              >
                <RxRocket className="me-2 green" />
                <strong>{quiz.title}</strong>
              </Link>
              {/* MAKE THIS MODULARIZEABLE */}
              <p className="fs-6 mb-0">
                <b>Closed</b> | <b>Due</b> | {quiz.points} pts |{" "}
                {quiz.questions.length} questions
              </p>
            </div>
            <div className="ms-auto">
              <div className="wd-right-icons d-inline-flex align-items-center">
                <GreenCheckmark />
                <div id="wd-quiz-toggle">
                  <button
                    id="wd-quiz-toggle-btn"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    {/* NEED TO GET TOGGLE BUTTON WORKING */}
                    <IoEllipsisVertical className="fs-4" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        to={`QuizDetailsEditor/${quiz._id}`}
                        className="dropdown-item"
                      >
                        <FaPencil />
                        Edit
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <FaTrash />
                      Delete
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
