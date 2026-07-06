import React, { useState } from 'react';
import { Clock, Phone, VolumeX, Cigarette, UserCheck, Utensils, AlertTriangle, FileWarning, ChevronDown, ChevronUp } from 'lucide-react';

const rules = [
    { icon: UserCheck, title: '인사', desc: '다들 서로가 처음이시죠. 우리 먼저 인사 나눠요. (명찰 착용 권장)' },
    { icon: Utensils, title: '식사', desc: '농협구례교육원은 밥맛이 전국 최고! 3끼 식사 꼭 하세요.' },
    { icon: Phone, title: '불편사항 접수', desc: '일과시간 중: 지도교수/반장, 이후: 당직자 (061-780-1000)' },
    { icon: VolumeX, title: '휴식/정숙', desc: '23시 이후에는 본인의 숙소에서만 머물러 주세요.' },
    { icon: Cigarette, title: '흡연', desc: '비흡연자를 위해 담배는 야외(노란항아리)에서만!' },
    { icon: Clock, title: '강의실 이동', desc: '수업시작 10분전에는 강의실로 이동해 주세요.' },
];

const penalties = [
    { reason: '가. 교육원 내 무단음주 한 자', point: -6 },
    { reason: '나. 무단 결강자(시간당)', point: -2 },
    { reason: '다. 외출·외박 시 귀원 시간 무단 미준수자', point: -2 },
    { reason: '라. 고성방가 등 생활관 내에서 생활태도 불량자', point: -2 },
    { reason: '마. 각종 합동행사 무단 불참자', point: -2 },
    { reason: '바. 지시사항 불이행자', point: -2 },
    { reason: '사. 휴대전화 사용 등 학습태도 불량', point: -2 },
    { reason: '아. 금연구역에서의 흡연자', point: -2 },
    { reason: '자. 무단 지각자', point: -1 },
    { reason: '차. 복장불량자 (명찰 미패용, 슬리퍼 등)', point: -1 },
    { reason: '카. 생활관 사용(청소) 불량자 (침구미정리 등)', point: -1 },
    { reason: '타. 출석등록 미실시자', point: -1 },
];

const LifeGuide = () => {
    const [isRulesOpen, setIsRulesOpen] = useState(false);

    return (
        <div className="space-y-8 pb-8">
            {/* Meal Time */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Utensils className="text-nh-green" /> 식사 시간표
                </h2>
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <span className="block text-sm text-gray-500 mb-1">아침</span>
                        <span className="block font-bold text-nh-blue">07:40 ~ 08:20</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <span className="block text-sm text-gray-500 mb-1">점심</span>
                        <span className="block font-bold text-nh-blue">13:00 ~ 13:40</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <span className="block text-sm text-gray-500 mb-1">저녁</span>
                        <span className="block font-bold text-nh-blue">18:00 ~ 18:40</span>
                    </div>
                </div>
            </section>

            {/* Rules Grid */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <UserCheck className="text-nh-blue" /> 생활 가이드
                </h2>
                <div className="grid grid-cols-2 gap-3">
                    {rules.map((rule, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
                            <div className="p-2 bg-gray-50 rounded-full mb-2 text-gray-700">
                                <rule.icon size={24} />
                            </div>
                            <h3 className="font-bold text-gray-800 text-sm mb-1">{rule.title}</h3>
                            <p className="text-xs text-gray-500 break-keep">{rule.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Accordion for Rules */}
            <section className="pt-4">
                <button
                    onClick={() => setIsRulesOpen(!isRulesOpen)}
                    className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm hover:bg-gray-50 transition-colors"
                >
                    <span className="font-bold text-gray-800 flex items-center gap-2">
                        💡 교육원 생활수칙 보기
                    </span>
                    {isRulesOpen ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
                </button>

                {isRulesOpen && (
                    <div className="mt-4 space-y-6 animate-in slide-in-from-top-4 fade-in duration-300">
                        {/* Warning Banner */}
                        <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center">
                            <AlertTriangle className="mx-auto text-red-600 mb-2" size={40} />
                            <h2 className="text-xl font-bold text-red-700 mb-1">제17조 퇴교사유</h2>
                            <div className="text-red-600 font-medium text-sm text-left inline-block mt-2 space-y-1">
                                <p>1. 생활성적 감점점수 10점 초과</p>
                                <p>2. 정당한 사유 없이 수업 거부</p>
                                <p>3. 고의로 교육질서를 문란케 한 자</p>
                                <p>4. 무단 외박·외출한 자</p>
                                <p>5. 도박, 절도, 폭력 행위를 한 자</p>
                            </div>
                        </div>

                        {/* Penalty List */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                                <FileWarning className="text-gray-600" />
                                <h3 className="font-bold text-gray-800">벌점 기준표</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <div className="divide-y divide-gray-100 min-w-max">
                                    {penalties.map((item, index) => (
                                        <div key={index} className="p-4 flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors whitespace-nowrap">
                                            <span className="text-gray-700 font-medium">{item.reason}</span>
                                            <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded text-sm">
                                                {item.point}점
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default LifeGuide;
