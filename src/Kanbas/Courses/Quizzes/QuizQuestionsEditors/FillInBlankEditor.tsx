import React, {useState} from 'react';

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

interface FillInBlankQuestion extends Question {
    type: 'Fill in the Blank';
    correct_answers: string[];
}

interface Props {
    question: FillInBlankQuestion;
    onSave: (question: Question) => void;
    onCancel: () => void;
}

export default function FillInBlankEditor({question, onSave, onCancel}: Props) {
    const [editedQuestion, setEditedQuestion] = useState<FillInBlankQuestion>(question);
    const [error, setError] = useState<string | null>(null);

    const addAnswer = () => {
        setEditedQuestion({
            ...editedQuestion,
            correct_answers: [...editedQuestion.correct_answers, ''],
        });
    };

    const updateAnswer = (index: number, value: string) => {
        const newAnswers = [...editedQuestion.correct_answers];
        newAnswers[index] = value;
        setEditedQuestion({ ...editedQuestion, correct_answers: newAnswers });
    };

    const deleteAnswer = (index: number) => {
        const newAnswers = editedQuestion.correct_answers.filter((_, i) => i !== index);
        setEditedQuestion({ ...editedQuestion, correct_answers: newAnswers });
    };

    const handleSave = () => {
        if (!editedQuestion.title || !editedQuestion.question || editedQuestion.correct_answers.length === 0) {
            setError('Please fill all required fields and provide at least one correct answer.');
            return;
        }
        onSave(editedQuestion);
    };

    return (
        <div>
            <h2>Edit Fill in the Blank Question</h2>
            {error && <div style={{color: 'red'}}>{error}</div>}
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
                placeholder="Question Text (Use ___ for blank)"
                required
            />
            <p>Note: Use ___ (three underscores) to indicate where the blank should be in your question.</p>
            <label htmlFor="points">Points:</label>
            <input
                id="points"
                type="number"
                value={editedQuestion.points}
                onChange={e => setEditedQuestion({ ...editedQuestion, points: Number(e.target.value) })}
                placeholder="Points"
                required
            />
            <h3>Correct Answers:</h3>
            {editedQuestion.correct_answers.map((answer, index) => (
                <div key={index}>
                    <input
                        value={answer}
                        onChange={e => updateAnswer(index, e.target.value)}
                        placeholder="Correct Answer"
                    />
                    <button onClick={() => deleteAnswer(index)}>Delete</button>
                </div>
            ))}
            <button onClick={addAnswer}>Add Answer</button>
            <button onClick={handleSave}>Save Question</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}
