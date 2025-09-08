"use client";
import React, { useMemo, useState } from 'react';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { trackEvent } from '@/lib/analytics';

export type QuizQuestion = {
  id: string;
  text: string;
  options: string[];
  answerIndex: number;
};

export default function Quiz({ quizId, questions }: { quizId: string; questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    return answers.reduce((acc, a, i) => (a === questions[i].answerIndex ? acc + 1 : acc), 0);
  }, [answers, questions]);

  const submit = async () => {
    if (submitted) return;
    setSubmitted(true);
    trackEvent('quiz_submit', { quizId, score, total: questions.length });
    try {
      await addDoc(collection(db, 'attempts'), {
        quizId,
        score,
        total: questions.length,
        at: serverTimestamp(),
      });
    } catch {}
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Quiz</h2>
      {questions.map((q, qi) => (
        <div key={q.id} className="border rounded p-3 space-y-2">
          <div className="font-medium">{qi + 1}. {q.text}</div>
          <div className="grid gap-2">
            {q.options.map((opt, oi) => (
              <label key={oi} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`q-${qi}`}
                  checked={answers[qi] === oi}
                  onChange={() => setAnswers(a => a.map((v, idx) => (idx === qi ? oi : v)))}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      {!submitted ? (
        <button onClick={submit} className="px-4 py-2 rounded bg-blue-600 text-white">Submit</button>
      ) : (
        <div className="font-semibold">Your score: {score} / {questions.length}</div>
      )}
    </div>
  );
}