import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as client from '../client';
import MultipleChoiceEditor from './MultipleChoiceEditor';
import TrueFalseEditor from './TFEditor';
import FillInBlankEditor from './FillInBlankEditor';

interface Question {
    id: string;
    type: 'Multiple Choice' | 'True/False' | 'Fill in the Blank';
    title: string;
    points: number;
    question: string;
    choices?: { id: string; option: string }[];
    correct_choice?: string | boolean;
    correct_answers?: string[];
}

export default function QuizQuestionsEditor() {
    const { quizId } = useParams<{ quizId: string }>();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (quizId) {
                const fetchedQuestions = await client.fetchQuizQuestions(quizId);
                setQuestions(fetchedQuestions);
            }
        };
        fetchQuestions();
    }, [quizId]);

    const addQuestion = (type: Question['type']) => {
        const newQuestion: Question = {
            id: Date.now().toString(),
            type,
            title: '',
            points: 1,
            question: '',
            choices: type === 'Multiple Choice' ? [] : undefined,
            correct_choice: type === 'True/False' ? false : undefined,
            correct_answers: type === 'Fill in the Blank' ? [] : undefined,
        };
        setQuestions([...questions, newQuestion]);
        setCurrentQuestion(newQuestion);
    };

    const updateQuestion = (updatedQuestion: Question) => {
        setQuestions(questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q));
        setCurrentQuestion(null);
    };

    const deleteQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
        if (currentQuestion?.id === id) {
            setCurrentQuestion(null);
        }
    };

    const handleCancel = () => {
        setCurrentQuestion(null);
    };

    return (
        <div>
            <h1>Questions Editor</h1>
            <div>
                <button onClick={() => addQuestion('Multiple Choice')}>Add Multiple Choice</button>
                <button onClick={() => addQuestion('True/False')}>Add True/False</button>
                <button onClick={() => addQuestion('Fill in the Blank')}>Add Fill in Blank</button>
            </div>
            <ul>
                {questions.map(q => (
                    <li key={q.id}>
                        {q.title || 'Untitled Question'} ({q.type})
                        <button onClick={() => setCurrentQuestion(q)}>Edit</button>
                        <button onClick={() => deleteQuestion(q.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {currentQuestion && (
                <div>
                    {currentQuestion.type === 'Multiple Choice' && (
                        <MultipleChoiceEditor
                            question={currentQuestion as any}
                            onSave={updateQuestion}
                            onCancel={handleCancel}
                        />
                    )}
                    {currentQuestion.type === 'True/False' && (
                        <TrueFalseEditor
                            question={currentQuestion as any}
                            onSave={updateQuestion}
                            onCancel={handleCancel}
                        />
                    )}
                    {currentQuestion.type === 'Fill in the Blank' && (
                        <FillInBlankEditor
                            question={currentQuestion as any}
                            onSave={updateQuestion}
                            onCancel={handleCancel}
                        />
                    )}
                </div>
            )}
        </div>
    );
}