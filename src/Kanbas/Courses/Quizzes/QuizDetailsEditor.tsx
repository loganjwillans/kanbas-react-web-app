import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import * as client from './client';

interface Quiz {
    _id?: string;
    title: string;
    description: string;
    quiz_type: string;
    total_points: number;
    assignment_group: string;
    shuffle_answers: boolean;
    time_limit: number;
    multiple_attempts: boolean;
    attempts_allowed: number;
    show_correct_answers: string;
    access_code: string;
    one_question_at_a_time: boolean;
    webcam_required: boolean;
    lock_questions_after_answering: boolean;
    due_date: string;
    available_date: string;
    until_date: string;
}

export default function QuizDetailsEditor() {
    const {quizId} = useParams<{ quizId: string }>();
    const {cid} = useParams<{ cid: string }>();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<Quiz>({
        title: '',
        description: '',
        quiz_type: 'Graded Quiz',
        total_points: 0,
        assignment_group: 'Quizzes',
        shuffle_answers: true,
        time_limit: 20, // its default anyways
        multiple_attempts: false,
        attempts_allowed: 1,
        show_correct_answers: 'After Submission',
        access_code: '',
        one_question_at_a_time: true,
        webcam_required: false,
        lock_questions_after_answering: false,
        due_date: new Date().toISOString().split('T')[0],
        available_date: new Date().toISOString().split('T')[0],
        until_date: new Date().toISOString().split('T')[0],
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            if (quizId && quizId !== 'new') {
                try {
                    const fetchedQuiz = await client.findQuizById(quizId);
                    setQuiz(fetchedQuiz);
                } catch (err) {
                    setError('Failed to fetch quiz');
                }
            }
        };
        fetchQuiz();
    }, [quizId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        setQuiz((prev: Quiz) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (quizId === 'new') {
                await client.createQuiz(quiz);
            } else {
                await client.updateQuiz(quiz);
            }
            navigate(`/Kanbas/Courses/${cid}/Quizzes`);
        } catch (err) {
            setError('Failed to save quiz'); // idc if it does
        }
    };

    if (error) return <div className="alert alert-danger">{error}</div>;
    let tab = 'questions';
    return (
        <div>
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <button onClick={() => tab = 'details'} className={`nav-link ${tab === 'details' ? "active" : ""}`}>
                        Details
                    </button>
                </li>
                <li className="nav-item">
                    <button onClick={() => tab = 'questions'}
                       className={`nav-link ${tab === 'questions' ? "active" : ""}`}>
                        Questions
                    </button>
                </li>
            </ul>
                <form onSubmit={handleSubmit}>
                    <h1>{quizId === 'new' ? 'Create New Quiz' : 'Edit Quiz'}</h1>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={quiz.title}
                               onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" value={quiz.description}
                                  onChange={handleChange}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary ms-2 float-end">Save Quiz</button>
                    <button type="button" className="btn btn-secondary float-end"
                            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}>Cancel
                    </button>
                    {/* wtf else do we need */}
                </form>
        </div>
);
}
