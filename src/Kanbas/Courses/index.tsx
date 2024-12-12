import CoursesNavigation from "./Navigation";
import Grades from "./Grades";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import {Navigate, Route, Routes, useParams, useLocation} from "react-router";
import {FaAlignJustify} from "react-icons/fa";
import PeopleTable from "./People/table";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizDetailsEditor from "./Quizzes/QuizDetailsEditor";
import QuizPreview from "./Quizzes/QuizPreview";


export default function Courses({courses}: { courses: any[]; }) {
    const {cid} = useParams();
    const course = courses.find((course) => course._id === cid);
    const {pathname} = useLocation();
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades"];

    return (
      <div id="wd-courses">
        <h2 className="text-danger">
          <FaAlignJustify className="me-4 fs-4 mb-1" />
          {course && course.name} &gt; {pathname.split("/")[4]}
        </h2>
        <hr />
        <div className="row">
          <div className="col-auto">
            <CoursesNavigation />
          </div>
          <div className="col">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              <Route path="Assignments/:asid" element={<AssignmentEditor />} />
              <Route path="Quizzes" element={<Quizzes />} />
              <Route
                path="Quizzes/QuizDetails/:quizId"
                element={<QuizDetails />}
              />
              <Route
                path="Quizzes/QuizDetailsEditor/:quizId/*"
                element={<QuizDetailsEditor />}
              />
              {/* need to add QuizQuestionsEditor route, but I am unsure about path - maybe try something like "Quizzes/QuizQuestionsEditor/:quizId/num/:questionNumber/" */}
              <Route
                path="Quizzes/QuizPreview/:quizId"
                element={<QuizPreview />}
              />
              <Route path="Grades" element={<Grades />} />
              <Route path="People" element={<PeopleTable />} />
              <Route path="People/:uid" element={<PeopleTable />} />
            </Routes>
          </div>
        </div>
      </div>
    );
}
