import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as client from './client';

interface Quiz {
    _id: string;
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
    questions: any[]; // are we adding questions
}

export default function QuizDetails() {
    const { quizId } = useParams<{ quizId: string }>();
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [error, setError] = useState<string | null>(null);
    const {cid} = useParams<{ cid: string }>();
    useEffect(() => {
        const fetchQuiz = async () => {
            if (quizId) {
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

    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!quiz) return <div>Loading...</div>;

    return (
        <div>
            <h1>{quiz.title}</h1>
            <p>{quiz.description}</p>
            <ul>
                <li>Quiz Type: {quiz.quiz_type}</li>
                <li>Points: {quiz.total_points}</li>
                <li>Assignment Group: {quiz.assignment_group}</li>
                <li>Shuffle Answers: {quiz.shuffle_answers ? 'Yes' : 'No'}</li>
                <li>Time Limit: {quiz.time_limit} minutes</li>
                <li>Multiple Attempts: {quiz.multiple_attempts ? 'Yes' : 'No'}</li>
                <li>Attempts Allowed: {quiz.attempts_allowed}</li>
                <li>Show Correct Answers: {quiz.show_correct_answers}</li>
                <li>Access Code: {quiz.access_code || 'None'}</li>
                <li>One Question at a Time: {quiz.one_question_at_a_time ? 'Yes' : 'No'}</li>
                <li>Webcam Required: {quiz.webcam_required ? 'Yes' : 'No'}</li>
                <li>Lock Questions After Answering: {quiz.lock_questions_after_answering ? 'Yes' : 'No'}</li>
                <li>Due Date: {new Date(quiz.due_date).toLocaleString()}</li>
                <li>Available From: {new Date(quiz.available_date).toLocaleString()}</li>
                <li>Available Until: {new Date(quiz.until_date).toLocaleString()}</li>
            </ul>
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/QuizPreview/${quiz._id}`}>
                <button className="btn btn-secondary">Preview</button>
            </Link>
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/QuizDetailsEditor/${quiz._id}`}>
                <button className="btn btn-primary ms-2">Edit</button>
            </Link>

        </div>
    );
}
