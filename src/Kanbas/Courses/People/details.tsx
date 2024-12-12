import {useEffect, useState} from "react";
import {FaUserCircle, FaCheck} from "react-icons/fa";
import {FaPencil} from "react-icons/fa6";
import {IoCloseSharp} from "react-icons/io5";
import {useNavigate, useParams} from "react-router";
import {Link} from "react-router-dom";
import * as client from "./client";

export default function PeopleDetails({
                                          fetchUsers,
                                      }: {
    fetchUsers: () => void;
}) {
    const {uid, cid} = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [editing, setEditing] = useState(false);
    const [user, setUser] = useState<any>({});
    const navigate = useNavigate();
    const fetchUser = async () => {
        if (!uid) return;
        const user = await client.findUserById(uid);
        setUser(user);
        setName(`${user.firstName} ${user.lastName}`);
        setEmail(user.email);
        setRole(user.role);
    };
    useEffect(() => {
        if (uid) fetchUser();
    }, [uid]);
    const saveUser = async () => {
        const [firstName, lastName] = name.split(" ");
        const updatedUser = {...user, firstName, lastName, email, role};
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditing(false);
        fetchUsers();
        navigate(`/Kanbas/Courses/${cid}/People`);
    };
    const deleteUser = async (uid: string) => {
        await client.deleteUser(uid);
        fetchUsers();
        navigate(`/Kanbas/Courses/${cid}/People`);
    };
    if (!uid) return null;

    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <Link
                to={`/Kanbas/Courses/${cid}/People`}
                className="btn position-fixed end-0 top-0 wd-close-details"
            >
                <IoCloseSharp className="fs-1"/>
            </Link>
            <div className="text-center mt-2">
                <FaUserCircle className="text-secondary me-2 fs-1"/>
            </div>
            <hr/>
            <div className="text-danger fs-4 wd-name">
                <FaPencil
                    onClick={() => setEditing(!editing)}
                    className={`float-end fs-5 mt-2 ${editing ? "d-none" : "wd-edit"}`}
                />
                {editing && (
                    <FaCheck
                        onClick={() => saveUser()}
                        className="float-end fs-5 mt-2 me-2 wd-save"
                    />
                )}
                {editing ? (
                    <div className="wd-name">
                        <input
                            className="form-control w-50 wd-edit-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    saveUser();
                                }
                            }}
                        />
                    </div>
                ) : (
                    <div className="wd-name">
                        {user.firstName} {user.lastName}
                    </div>
                )}
            </div>
            <b>Roles:</b>
            {editing ? (
                <select
                    className="form-control wd-role-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="STUDENT">STUDENT</option>
                    <option value="TA">TA</option>
                    <option value="FACULTY">FACULTY</option>
                </select>
            ) : (
                <span className="wd-roles"> {user.role} </span>
            )}
            <br/>
            <b>Login ID:</b> <span className="wd-login-id"> {user.loginId} </span>
            <br/>
            <b>Section:</b> <span className="wd-section"> {user.section} </span>
            <br/>
            <b>Total Activity:</b>
            <span className="wd-total-activity">{user.totalActivity}</span>
            <br/>
            <b>Email:</b>
            {editing ? (
                <input
                    type="email"
                    className="form-control wd-edit-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            saveUser();
                        }
                    }}
                />
            ) : (
                <span className="wd-email">{user.email}</span>
            )}
            <hr/>
            <button
                onClick={() => deleteUser(uid)}
                className="btn btn-danger float-end wd-delete"
            >
                Delete
            </button>
            <button
                onClick={() => navigate(`/Kanbas/Courses/${cid}/People`)}
                className="btn btn-secondary float-start float-end me-2 wd-cancel"
            >
                Cancel
            </button>
        </div>
    );
}