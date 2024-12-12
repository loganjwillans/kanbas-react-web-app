import {FaFileImport, FaFileExport} from "react-icons/fa";
import {FaGear, FaMagnifyingGlass} from "react-icons/fa6";
import {MdArrowDropDown} from "react-icons/md";
import {CiFilter} from "react-icons/ci";
import {useParams} from "react-router";
import * as db from "../../Database";

import GreenCheckmark from "../Modules/GreenCheckmark";
import {MdDoNotDisturbAlt} from "react-icons/md";

export default function Grades() {
    const {cid} = useParams();
    const users = db.users;
    const grades = db.grades;
    const enrollments = db.enrollments;
    const assignments = db.assignments;

    return (
        <div>
            <div className="row">
                <div className="col">
                    <button id="wd-collapse-all" className="btn btn-lg btn-secondary me-1 float-end">
                        <FaGear/>
                    </button>
                    <div className="dropdown d-inline me-1 float-end">
                        <button id="wd-publish-all-btn" className="btn btn-lg btn-secondary dropdown-toggle"
                                type="button" data-bs-toggle="dropdown">
                            <FaFileExport className="mx-2"/>
                            Export
                        </button>
                    </div>
                    <button id="wd-collapse-all" className="btn btn-lg btn-secondary me-1 float-end">
                        <FaFileImport className="mx-2"/>
                        Import
                    </button>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <h5><b>Student Names</b></h5>
                    <div className="input-group">
                        <span className="input-group-text"><FaMagnifyingGlass/></span>
                        <input type="text" className="form-control"/>
                        <span className="input-group-text"><MdArrowDropDown/></span>
                    </div>
                </div>
                <div className="col">
                    <h5><b>Assignment Names</b></h5>
                    <div className="input-group">
                        <span className="input-group-text"><FaMagnifyingGlass/></span>
                        <input type="text" className="form-control"/>
                        <span className="input-group-text"><MdArrowDropDown/></span>
                    </div>
                </div>
            </div>
            <div>
                <button id="wd-collapse-all" className="btn btn-lg btn-secondary mt-3">
                    <CiFilter/>
                    Apply Filters
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered mt-3">
                    <tbody>
                    <tr>
                        <td><b>Student Name</b></td>
                        {Object.values(assignments)
                            .filter((assignment: any) => assignment.course === cid)
                            .map((assignment: any) => (
                                <td>{assignment._id}</td>
                            ))}
                    </tr>
                    {Object.values(enrollments)
                        .filter((enrollment: any) => enrollment.course === cid)
                        .map((enrollment: any) => (
                            <tr>
                                {Object.values(users)
                                    .filter((user: any) => user._id === enrollment.user)
                                    .map((user: any) => (
                                        <td className="text-danger">{user.firstName} {user.lastName}</td>
                                    ))}
                                {Object.values(grades)
                                    .filter((grade: any) => grade.student === enrollment.user)
                                    .map((grade: any) => (
                                        <td>{grade.grade}</td>
                                    ))}

                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    );
}