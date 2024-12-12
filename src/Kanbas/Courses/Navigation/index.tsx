import "./index.css";
import {Link, useLocation} from "react-router-dom";

export default function CoursesNavigation() {
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
    const {pathname} = useLocation()

    return (
        <div id="wd-courses-navigation" className="list-group fs-5 rounded-0 d-none d-md-block">
            {
                links.map((link) => (
                    <Link key={link} to={link} className={`list-group-item
              ${pathname.includes(link) ? "active border border-0" : "text-danger border border-0"}`}>
                        {link}
                    </Link>))
            }
        </div>
    );
}



