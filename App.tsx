import React, { useState, useCallback } from 'react';
import { questionnaireData, therapistCheckData } from './constants';
import type { FormData, Section } from './types';
import { QuestionnaireSection } from './components/QuestionnaireSection';
import { CheckboxGroup } from './components/CheckboxGroup';

const App: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({});
    const [searchId, setSearchId] = useState<string>('');

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        setFormData(prevData => {
            let newData;
            if (type === 'checkbox') {
                const { checked } = e.target as HTMLInputElement;
                const existingValues = prevData[name] as string[] || [];
                if (checked) {
                    newData = { ...prevData, [name]: [...existingValues, value] };
                } else {
                    newData = { ...prevData, [name]: existingValues.filter(v => v !== value) };
                }
            } else {
                newData = {
                    ...prevData,
                    [name]: value
                };
            }
            return newData;
        });
    }, []);

    const handlePainScaleChange = useCallback((name: string, value: number) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }, []);
    
    const handleLocalSave = () => {
        const patientId = formData['patientId'] as string;
        if (!patientId) {
            alert("患者IDを入力してください。");
            return;
        }
        try {
            const storageKey = `questionnaire_${patientId}`;
            localStorage.setItem(storageKey, JSON.stringify(formData));

            // Save patient ID to the list of saved IDs
            const savedIds = JSON.parse(localStorage.getItem('savedPatientIds') || '[]');
            if (!savedIds.includes(patientId)) {
                savedIds.push(patientId);
                localStorage.setItem('savedPatientIds', JSON.stringify(savedIds));
            }

            alert(`患者ID: ${patientId} でデータを保存しました。`);
        } catch (error) {
            console.error("Failed to save form data to localStorage", error);
            alert("保存に失敗しました。");
        }
    };

    const handleLoadById = () => {
        if (!searchId) {
            alert("検索する患者IDを入力してください。");
            return;
        }
        try {
            const storageKey = `questionnaire_${searchId}`;
            const savedData = localStorage.getItem(storageKey);
            if (savedData) {
                setFormData(JSON.parse(savedData));
                alert(`患者ID: ${searchId} のデータを読み込みました。`);
            } else {
                alert(`患者ID: ${searchId} のデータが見つかりませんでした。`);
            }
        } catch (error) {
            console.error("Failed to load form data from localStorage", error);
            alert("読み込みに失敗しました。");
        }
    };

    const handleNewForm = () => {
        if (Object.keys(formData).length > 0) {
            if (!confirm("現在の入力内容がクリアされます。よろしいですか？")) {
                return;
            }
        }
        setFormData({});
        setSearchId('');
    };

    const handleCsvSave = () => {
        const headers = ['レベル', '項目', '質問内容', '回答'];

        const escapeCsvCell = (cell: any): string => {
            if (cell === undefined || cell === null) return '';
            let cellString = Array.isArray(cell) ? cell.join('; ') : String(cell);
            if (cellString.includes(',') || cellString.includes('"') || cellString.includes('\n')) {
                cellString = `"${cellString.replace(/"/g, '""')}"`;
            }
            return cellString;
        };

        const rows: string[] = [];

        questionnaireData.forEach(section => {
            section.questions.forEach(q => {
                let answer = formData[q.id];
                const otherAnswer = formData[`${q.id}_other`];

                if (otherAnswer) {
                    if (Array.isArray(answer)) {
                        answer = answer.map(a => a === 'その他' ? `その他: ${otherAnswer}` : a);
                    } else if (answer === 'その他') {
                        answer = `その他: ${otherAnswer}`;
                    }
                }
                
                if (q.id === 'pastSurgeries' && formData['pastSurgeriesDetails'] && answer === 'あり') {
                     answer = `あり (${formData['pastSurgeriesDetails']})`;
                } else if (q.id === 'otherClinics' && formData['otherClinicsDetails'] && answer === 'はい') {
                     answer = `はい (${formData['otherClinicsDetails']})`;
                }

                // Don't create rows for the supplemental detail fields themselves
                if (q.id === 'pastSurgeriesDetails' || q.id === 'otherClinicsDetails') return;

                rows.push([
                    section.level,
                    q.item,
                    q.text,
                    answer
                ].map(escapeCsvCell).join(','));
            });
        });

        therapistCheckData.questions.forEach(q => {
             rows.push([
                '【セラピスト用】',
                q.item,
                q.text,
                formData[q.id],
            ].map(escapeCsvCell).join(','));
        });

        const csvString = [headers.join(','), ...rows].join('\n');
        const blob = new Blob([`\uFEFF${csvString}`], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const date = new Date().toISOString().slice(0, 10);
        link.setAttribute('href', url);
        link.setAttribute('download', `Web問診票_${date}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Web問診票</h1>
                    <p className="text-gray-600 mt-2">ご協力ありがとうございます。より良い治療のために、以下の質問にお答えください。</p>
                </header>

                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">患者データ管理</h2>
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="患者IDで検索..."
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleLoadById}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition-transform transform hover:scale-105"
                        >
                            読み込み
                        </button>
                        <button
                            onClick={handleNewForm}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg shadow transition-transform transform hover:scale-105"
                        >
                            新規作成
                        </button>
                    </div>
                    <p className="text-sm text-gray-500">※ 患者IDを入力して「読み込み」で過去のデータを検索できます</p>
                </div>

                <div className="space-y-8">
                    {questionnaireData.map((section: Section) => (
                        <QuestionnaireSection
                            key={section.level}
                            section={section}
                            formData={formData}
                            handleChange={handleChange}
                            handlePainScaleChange={handlePainScaleChange}
                        />
                    ))}

                    <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">{therapistCheckData.title}</h3>
                        <div className="space-y-3">
                            {therapistCheckData.questions.map(q => (
                                <CheckboxGroup
                                    key={q.id}
                                    question={q}
                                    value={formData[q.id] as string[] || []}
                                    onChange={handleChange}
                                    formData={formData}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="text-center pt-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button type="button" onClick={handleLocalSave} className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300">
                            ローカル保存
                        </button>
                        <button type="button" onClick={handleCsvSave} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300">
                            CSV形式で保存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;