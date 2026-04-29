import React, { useState } from 'react';
import { X, Info, Image as ImageIcon } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import facilityMap from '../assets/facility_map.jpg';

const facilities = [
    {
        id: '1', name: '연수동', emoji: '🏢', category: '교육시설', location: '본관',
        desc: '교육원의 핵심 학습 공간',
        details: [
            '1층 (원장실, 교육팀, 소강당, 강사대기실)',
            '2층 (강의실 201~203, 대강당, 행사홀)',
            '3층 (강의실 301~303)'
        ],
        x: 75, y: 35, pinColor: 'text-blue-600'
    },
    {
        id: '2', name: '식당', emoji: '🍚', category: '편의시설', location: '본관 2층',
        desc: '전국 최고 밥맛!',
        details: ['일과 중 운영시간을 꼭 확인해 주세요.'],
        x: 58, y: 42, pinColor: 'text-orange-500'
    },
    {
        id: '3', name: '숙소동', emoji: '🛏️', category: '숙박시설', location: '숙소동',
        desc: '편안한 휴식 공간',
        details: ['숙소, 화장실 및 세탁실 구비'],
        x: 20, y: 30, pinColor: 'text-green-600'
    },
    {
        id: '4', name: '독서실', emoji: '📚', category: '학습시설', location: '복지동',
        desc: '최고의 시설을 자랑하는 집중의 공간',
        details: [],
        x: 36, y: 35, pinColor: 'text-indigo-600'
    },
    {
        id: '5', name: '체력단련실', emoji: '🏋️', category: '체육시설', location: '복지동',
        desc: '일과 후 체력 증진!',
        details: ['런닝머신, 천국의 계단, 실내 자전거, 웨이트 기구, 탁구장 완비'],
        x: 45, y: 25, pinColor: 'text-red-500'
    },
    {
        id: '6', name: '카페혜움', emoji: '☕', category: '편의시설', location: '복지동 1층',
        desc: '커피 한 잔의 여유',
        details: ['카페 및 미니편의점 운영'],
        x: 50, y: 33, pinColor: 'text-yellow-600'
    },
    {
        id: '7', name: '대강당', emoji: '⚡', category: '편의시설', location: '주차장',
        desc: '입교식 및 조합원교육',
        details: ['252석'],
        x: 90, y: 45, pinColor: 'text-teal-500'
    },
    {
        id: '8', name: '산책로', emoji: '🌳', category: '휴식시설', location: '야외',
        desc: '교육원 명소',
        details: ['저녁 조명이 특히 아름다운 힐링 산책로'],
        x: 40, y: 75, pinColor: 'text-emerald-600'
    }
];

const Facility = () => {
    const [selectedFacility, setSelectedFacility] = useState(null);

    return (
        <div className="-mx-4 -mt-4 -mb-20 h-[calc(100vh-64px)] relative bg-gray-100 overflow-hidden">
            {/* Map Viewer */}
            <TransformWrapper
                initialScale={1}
                minScale={0.8}
                maxScale={4}
                centerOnInit={true}
                wheel={{ step: 0.1 }}
                pinch={{ step: 5 }}
            >
                <TransformComponent wrapperClass="w-full h-full" contentClass="w-full h-full flex items-center justify-center">
                    <div className="relative w-full max-w-none">
                        <img
                            src={facilityMap}
                            alt="시설 안내도"
                            className="w-[800px] max-w-none md:w-full h-auto object-contain drop-shadow-md"
                            draggable={false}
                        />

                        {/* Markers Overlay */}
                        {facilities.map((item) => (
                            <button
                                key={item.id}
                                className={`absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-200 focus:outline-none`}
                                style={{ top: `${item.y}%`, left: `${item.x}%` }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedFacility(item);
                                }}
                            >
                                <div className="relative flex items-center justify-center group">
                                    <div className={`w-5 h-5 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-full shadow-sm border border-white/50 text-[10px]`}>
                                        {item.emoji}
                                    </div>
                                    <span
                                        className="absolute bottom-3 left-4 px-1 py-[1px] bg-white/60 backdrop-blur-sm text-[8px] font-bold text-gray-900 rounded shadow-sm border border-white/50 whitespace-nowrap"
                                        style={{ textShadow: '0 0 4px rgba(255,255,255,1)' }}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </TransformComponent>
            </TransformWrapper>

            {/* Bottom Sheet Backdrop */}
            {selectedFacility && (
                <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity"
                    onClick={() => setSelectedFacility(null)}
                />
            )}

            {/* Bottom Sheet */}
            <div
                className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50 transform transition-transform duration-300 ease-out ${selectedFacility ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                {selectedFacility && (
                    <div className="p-6 pb-8">
                        {/* Handle bar for visual cue */}
                        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6"></div>

                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md mb-2">
                                    {selectedFacility.category} • {selectedFacility.location}
                                </span>
                                <h3 className="text-2xl font-bold text-gray-900">{selectedFacility.name}</h3>
                            </div>
                            <button
                                onClick={() => setSelectedFacility(null)}
                                className="p-2 bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Image Placeholder */}
                        <div className="w-full h-32 bg-gray-100 rounded-xl mb-5 flex flex-col items-center justify-center text-gray-400 border border-gray-200">
                            <ImageIcon size={32} className="mb-2 opacity-50" />
                            <span className="text-sm">사진 준비 중</span>
                        </div>

                        {/* Details */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Info size={20} className="text-nh-blue mt-0.5 shrink-0" />
                                <div className="w-full">
                                    <p className="text-sm font-semibold text-gray-800">{selectedFacility.desc}</p>

                                    {selectedFacility.details && selectedFacility.details.length > 0 && (
                                        <ul className="mt-2.5 space-y-1.5">
                                            {selectedFacility.details.map((detail, idx) => (
                                                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                                    <span className="text-nh-blue mt-1.5 text-[6px]">●</span>
                                                    <span className="leading-relaxed">{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Facility;
