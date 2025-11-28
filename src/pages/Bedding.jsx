import React, { useState } from 'react';
import { CheckSquare, Square, AlertCircle } from 'lucide-react';
import beddingGuide from '../assets/bedding_guide_v2.jpg';

const checklistItems = [
    { id: 1, text: '1. 이불 (전체 배출)' },
    { id: 2, text: '2. 침대 패드 (매트리스 커버 제외)' },
    { id: 3, text: '3. 베개피 (베개솜 제외)' },
    { id: 4, text: '개인 소지품 확인 (충전기, 옷 등)' },
    { id: 5, text: '쓰레기 분리수거' },
];

const Bedding = () => {
    const [checked, setChecked] = useState({});

    const toggleCheck = (id) => {
        setChecked(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <CheckSquare className="text-nh-blue" />
                    퇴실 시 주의사항
                </h2>

                <div className="rounded-lg overflow-hidden mb-6 border border-gray-100">
                    <img src={beddingGuide} alt="퇴실 시 정리 정돈 가이드" className="w-full h-auto object-cover" />
                </div>

                <div className="space-y-3">
                    {checklistItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => toggleCheck(item.id)}
                            className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                        >
                            <div className={`mt-0.5 ${checked[item.id] ? 'text-nh-green' : 'text-gray-300'}`}>
                                {checked[item.id] ? <CheckSquare size={24} /> : <Square size={24} />}
                            </div>
                            <span className={`text-gray-700 ${checked[item.id] ? 'line-through text-gray-400' : ''}`}>
                                {item.text}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="text-center text-xs text-gray-400">
                모든 항목을 확인 후 퇴실해주세요.
            </div>
        </div>
    );
};

export default Bedding;
