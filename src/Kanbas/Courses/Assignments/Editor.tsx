import {Link, useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addAssignment,
    updateAssignment,
    setAssignments,
} from "./reducer";
import * as client from "./client";

export default function AssignmentEditor() {
    const {cid, asid} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {assignments} = useSelector((state: any) => state.assignmentReducer);
    const course_assignments = assignments.filter(
        (assignment: any) => assignment.course === cid
    )
    const course_assignment = course_assignments.find((assignment: any) => assignment._id === asid)
    const [assignment, setAssignment] = useState(
        {
            _id: course_assignment?._id || "1234",
            title: course_assignment?.title || "New Assignment",
            course: cid,
            points: course_assignment?.points || 0,
            available_from: course_assignment?.available_from || "",
            available_until: course_assignment?.available_until || "",
            description: course_assignment?.description || "New Assignment Description",
            due: course_assignment?.due || ""
        }
    );
    const fetchAssignment = async () => {
        const fetchedAssignments = await client.findAssignmentsForCourse(
            cid as string
        );
        dispatch(setAssignments(fetchedAssignments));
        const specificAssignment = fetchedAssignments.find(
            (assignment: any) => assignment._id === asid
        );
        if (specificAssignment) {
            setAssignment(specificAssignment);
        } else {
            setAssignment({
                _id: "",
                title: "New Assignment",
                course: cid,
                points: 0,
                available_from: "",
                available_until: "",
                description: "New Assignment Description",
                due: ""
            });
        }
    };
    useEffect(() => {
        fetchAssignment();
    }, [cid, asid, dispatch]);
    const createAssignment = async (assignment: any) => {
        const newAssignment = await client.createAssignment(
            cid as string,
            assignment
        );
        dispatch(addAssignment(newAssignment));
    };
    const saveAssignment = async (assignment: any) => {
        const status = await client.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
    };
    return (
        <div>

            <div id="wd-assignments-editor">
                <div className="mb-3">
                    <label htmlFor="input1" className="form-label">
                        Assignment Name</label>
                    <input className="form-control"
                           id="input1" value={`${assignment.title}`}
                           onChange={(e) => setAssignment({...assignment, title: e.target.value})}/>
                </div>
                <div className="mb-3">
                    Description
                    <textarea className="form-control" id="textarea1"
                              rows={3}
                              value={`${assignment.description}`}
                              onChange={(e) => setAssignment({...assignment, description: e.target.value})}></textarea>
                </div>
                <div className="row pb-3">
                    <div className="col-3 text-end">
                        Points
                    </div>
                    <div className="col-9">
                        <input className="form-control"
                               id="input1" value={`${assignment.points}`}
                               onChange={(e) => setAssignment({...assignment, points: e.target.value})}/>
                    </div>
                </div>
                <div className="row pb-3">
                    <div className="col-3 text-end">
                        Assignment Group
                    </div>
                    <div className="col-9">
                        <select className="form-select">
                            <option selected>ASSIGNMENTS</option>
                        </select>
                    </div>
                </div>
                <div className="row pb-3">
                    <div className="col-3 text-end">
                        Display Grade as
                    </div>
                    <div className="col-9">
                        <select className="form-select">
                            <option selected>Percentage</option>
                        </select>
                    </div>
                </div>
                <div className="row pb-3">
                    <div className="col-3 text-end">
                        Submission Type
                    </div>
                    <div className="col-9">
                        <div className="border p-3 rounded-2">
                            <select className="form-select mb-3">
                                <option selected>Online</option>
                            </select>
                            <h6><b>Online Entry Options</b></h6>
                            <div className="form-check pb-2 pt-1">
                                <input className="form-check-input" type="checkbox"
                                       id="switch1"/>
                                <label className="form-check-label mx-3" htmlFor="switch1">
                                    Text Entry
                                </label>
                            </div>
                            <div className="form-check pb-2">
                                <input className="form-check-input" type="checkbox" checked
                                       id="switch2"/>
                                <label className="form-check-label mx-3" htmlFor="switch2">
                                    Website URL
                                </label>
                            </div>
                            <div className="form-check pb-2">
                                <input className="form-check-input" type="checkbox"
                                       id="switch3"/>
                                <label className="form-check-label mx-3" htmlFor="switch3">
                                    Media Recordings
                                </label>
                            </div>
                            <div className="form-check pb-2">
                                <input className="form-check-input" type="checkbox"
                                       id="switch4"/>
                                <label className="form-check-label mx-3" htmlFor="switch4">
                                    Student Annotation
                                </label>
                            </div>
                            <div className="form-check pb-2">
                                <input className="form-check-input" type="checkbox"
                                       id="switch5"/>
                                <label className="form-check-label mx-3" htmlFor="switch5">
                                    File Uploads
                                </label>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="row pb-3">
                    <div className="col-3 text-end">
                        Assign
                    </div>
                    <div className="col-9">
                        <div className="border p-3 rounded-2">
                            <h6><b>Assign to</b></h6>
                            <input type="text" className="form-control mb-3"/>
                            <h6><b>Due</b></h6>
                            <div className="input-group mb-3">
                                <input type="date" className="form-control" value={`${assignment.due}`}
                                       onChange={(e) => setAssignment({...assignment, due: e.target.value})}/>

                            </div>
                            <div className="row">
                                <div className="col">
                                    <h6><b>Available From</b></h6>
                                    <div className="input-group mb-3">
                                        <input type="date" className="form-control"
                                               value={`${assignment.available_from}`}
                                               onChange={(e) => setAssignment({
                                                   ...assignment,
                                                   available_from: e.target.value
                                               })}/>

                                    </div>
                                </div>
                                <div className="col">
                                    <h6><b>Until</b></h6>
                                    <div className="input-group mb-3">
                                        <input type="date" className="form-control"
                                               value={`${assignment.available_until}`}
                                               onChange={(e) => setAssignment({
                                                   ...assignment,
                                                   available_until: e.target.value
                                               })}/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <button className="btn btn-lg btn-danger me-1 float-end" role="button" onClick={() => {
                    if (course_assignment) {
                        saveAssignment(assignment);
                    } else {
                        createAssignment(assignment);
                    }
                    navigate(`/Kanbas/Courses/${cid}/Assignments`)
                }}
                >Save
                </button>
                <a href={`#/Kanbas/Courses/${cid}/Assignments/`}
                   className="btn btn-lg btn-secondary me-1 float-end" role="button">Cancel</a>
            </div>
        </div>
    );
}
