import React, {useState} from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithObjects() {
    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });
    const [module, setModule] = useState({
        id: 2, name: "My title is here",
        description: "My name is here but a description",
        course: "this one"
    })
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`
    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;
    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Modifying Properties</h4>
            <a id="wd-update-assignment-title"
               className="btn btn-primary float-end"
               href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
                Update Title
            </a>
            <input className="form-control w-75" id="wd-assignment-title"
                   value={assignment.title} onChange={(e) =>
                setAssignment({...assignment, title: e.target.value})}/>
            <hr/>

            <h4>Retrieving Objects</h4>
            <a id="wd-retrieve-assignments" className="btn btn-primary"
               href={`${REMOTE_SERVER}/lab5/assignment`}>
                Get Assignment
            </a>
            <hr/>
            <h4>Retrieving Properties</h4>
            <a id="wd-retrieve-assignment-title" className="btn btn-primary"
               href={`${REMOTE_SERVER}/lab5/assignment/title`}>
                Get Title
            </a>
            <hr/>
            <h4>Retrieving Module</h4>
            <a id="wd-retrieve-module" className="btn btn-primary"
               href={`${REMOTE_SERVER}/lab5/module`}>
                Get Module
            </a>
            <hr/>
            <h4>Retrieving Module</h4>
            <a id="wd-retrieve-module-name" className="btn btn-primary"
               href={`${REMOTE_SERVER}/lab5/module/name`}>
                Get Module Name
            </a>
            <hr/>
            <h4>Modifying Module Name</h4>
            <a id="wd-update-module-name"
               className="btn btn-primary float-end"
               href={`${MODULE_API_URL}/name/${module.name}`}>
                Update Name
            </a>
            <input className="form-control w-75" id="wd-module-name"
                   value={module.name} onChange={(e) =>
                setModule({...module, name: e.target.value})}/>
            <hr/>
            <h4>Updating Assignment Score</h4>
            <a id="wd-update-assignments-score"
               className="btn btn-primary float-end"
               href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
                Update Score
            </a>
            <input className="form-control w-75" id="wd-module-name"
                   value={assignment.score} onChange={(e) =>
                setAssignment({...assignment, score: Number(e.target.value)})}/>
            <hr/>
            <h4>Updating Assignment Completion</h4>
            <a
                id="wd-update-assignments-completed"
                target="blank"
                className="btn btn-primary float-end"
                href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
                Update Assignment Completion
            </a>
            <label htmlFor="wd-update-assignments-completed">
                Completed:{" "}
                <input
                    className="mb-2"
                    type="checkbox"
                    checked={assignment.completed}
                    onChange={(e) =>
                        setAssignment({
                            ...assignment,
                            completed: Boolean(e.target.checked),
                        })
                    }/>
            </label>
        <hr/>
        </div>
    );
}
