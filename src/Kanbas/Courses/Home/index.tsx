import Modules from "../Modules";
import CourseStatus from "./Status";
import Courses from "../index";

export default function Home() {
    return (
        <div className="row">
            <div className="col">
                <Modules/>
            </div>
            <div className="col-auto">
                <CourseStatus/>
            </div>
        </div>

    );
}
