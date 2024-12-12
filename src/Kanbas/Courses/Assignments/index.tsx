import {FaMagnifyingGlass} from "react-icons/fa6";
import {FaTrash} from "react-icons/fa";
import {BsGripVertical} from "react-icons/bs";
import {FaPlus} from "react-icons/fa";
import {IoEllipsisVertical} from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import {BsFillJournalBookmarkFill} from "react-icons/bs";
import {Link} from 'react-router-dom';
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import {useParams} from "react-router";
import * as client from "./client";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import DeleteModal from "./DeleteModal"
import {addAssignment, setAssignments, updateAssignment, deleteAssignment} from "./reducer";

export default function Assignments() {

    const {cid} = useParams();
    const {assignments} = useSelector((state: any) => state.assignmentReducer);
    const dispatch = useDispatch();
    const fetchAssignments = async () => {
        const assignments = await client.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };
    useEffect(() => {
        fetchAssignments();
    }, []);
    const removeAssignment = async (asid: string) => {
        await client.deleteAssignment(asid);
        dispatch(deleteAssignment(asid));
    };
    const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
    const deleteButton = (assignment: any) => {
        setSelectedAssignment(assignment);
    };
    const modalDelete = () => {
        if (selectedAssignment) {
            removeAssignment(selectedAssignment._id);
            setSelectedAssignment(null);
        }
    };
    return (
        <div id="wd-assignments">
            <div className="row align-items-center mb-5">
                <div className="col">
                    <div className="input-group">
                        <span className="input-group-text"><FaMagnifyingGlass/></span>
                        <input type="text" className="form-control"/>
                    </div>
                </div>
                <div className="col">
                    <Link to={`/Kanbas/Courses/${cid}/Assignments/NewAssignment`}>
                        <button id="wd-add-assignment" className="float-end btn btn-lg btn-danger"><FaPlus/>
                            Assignment
                        </button>
                    </Link>
                    <button id="wd-add-assignment-group" className="float-end btn btn-lg btn-secondary me-1">
                        <FaPlus/> Group
                    </button>
                </div>
            </div>
            <div className="wd-title p-4 ps-2 bg-secondary border-gray">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <BsGripVertical className="me-2 fs-3"/>
                    </div>
                    <div className="col">
                        <h3 className="m-0">ASSIGNMENTS</h3>
                    </div>
                    <div className="col-auto">
                        <div className="border border-secondary rounded-5 px-2 py-1">
                            40% of Total
                        </div>
                    </div>
                    <div className="col-auto">
                        <FaPlus/>
                    </div>
                    <div className="col-auto">
                        <IoEllipsisVertical className="fs-4"/>
                    </div>
                </div>

            </div>
            <ul id="wd-assignment-list" className="list-group list-group-mine rounded-0">
                {assignments
                    .filter((assignment: any) => assignment.course === cid)
                    .map((assignment: any) => (
                        <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <BsGripVertical className="me-2 fs-3"/>
                                </div>
                                <div className="col-auto">
                                    <BsFillJournalBookmarkFill className="me-2 fs-3 text-success"/>
                                </div>
                                <div className="col">
                                    <a className="wd-assignment-link"
                                       href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                                        {assignment.title}
                                    </a>
                                    <br/>
                                    <span className="text-danger">Multiple Modules</span> | <b>Not available
                                    until</b> {assignment.available_from} at
                                    12:00am | <b>Due</b> {assignment.available_until} at 11:59pm
                                    | {assignment.points} points
                                </div>
                                <div className="col-auto">
                                    <button id="wd-add-module-btn" className="btn btn-danger me-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#wd-delete-assignment-dialog" onClick={() => deleteButton(assignment)}>
                                        Delete
                                    </button>
                                </div>
                                <div className="col-auto">
                                    <GreenCheckmark/>
                                </div>
                                <div className="col-auto">
                                    <IoEllipsisVertical className="fs-4"/>
                                </div>
                            </div>
                            <DeleteModal deleteAssignment={() => {
                                modalDelete();
                            }}/>
                        </li>

                    ))}
            </ul>

        </div>
    );
}
