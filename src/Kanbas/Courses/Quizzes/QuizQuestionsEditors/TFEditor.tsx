import React, { useState } from 'react';

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

interface TrueFalseQuestion extends Question {
    type: 'True/False';
    correct_choice: boolean;
}

interface Props {
    question: TrueFalseQuestion;
    onSave: (question: Question) => void;
    onCancel: () => void;
}

export default function TrueFalseEditor({ question, onSave, onCancel }: Props) {
    const [editedQuestion, setEditedQuestion] = useState<TrueFalseQuestion>(question);
    const [error, setError] = useState<string | null>(null);

    const handleSave = () => {
        if (!editedQuestion.title || !editedQuestion.question) {
            setError('Please fill all required fields.');
            return;
        }
        onSave(editedQuestion);
    };

    return (
        <div>
            <h2>Edit True/False Question</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <label htmlFor="title">Question Title:</label>
            <input
                id="title"
                value={editedQuestion.title}
                onChange={e => setEditedQuestion({ ...editedQuestion, title: e.target.value })}
                placeholder="Question Title"
                required
            />
            <label htmlFor="question">Question Text:</label>
            <textarea
                id="question"
                value={editedQuestion.question}
                onChange={e => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
                placeholder="Question Text"
                required
            />
            <label htmlFor="points">Points:</label>
            <input
                id="points"
                type="number"
                value={editedQuestion.points}
                onChange={e => setEditedQuestion({ ...editedQuestion, points: Number(e.target.value) })}
                placeholder="Points"
                required
            />
            <div>
                <label>
                    <input
                        type="radio"
                        checked={editedQuestion.correct_choice === true}
                        onChange={() => setEditedQuestion({ ...editedQuestion, correct_choice: true })}
                    /> True
                </label>
                <label>
                    <input
                        type="radio"
                        checked={editedQuestion.correct_choice === false}
                        onChange={() => setEditedQuestion({ ...editedQuestion, correct_choice: false })}
                    /> False
                </label>
            </div>
            <button onClick={handleSave}>Save Question</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}
