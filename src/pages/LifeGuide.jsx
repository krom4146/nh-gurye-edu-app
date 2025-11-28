import React from 'react';
import { Clock, Phone, VolumeX, Cigarette, UserCheck, Utensils } from 'lucide-react';

const rules = [
    { icon: UserCheck, title: '인사', desc: '다들 서로가 처음이시죠. 우리 먼저 인사 나눠요. (명찰 착용 권장)' },
    { icon: Utensils, title: '식사', desc: '농협구례교육원은 밥맛이 전국 최고! 3끼 식사 꼭 하세요.' },
    { icon: Phone, title: '불편사항 접수', desc: '일과시간 중: 지도교수/반장, 이후: 당직자 (061-780-1000)' },
    { icon: VolumeX, title: '휴식/정숙', desc: '23시 이후에는 본인의 숙소에서만 머물러 주세요.' },
    { icon: Cigarette, title: '흡연', desc: '비흡연자를 위해 담배는 야외(노란항아리)에서만!' },
    { icon: Clock, title: '강의실 이동', desc: '수업시작 10분전에는 강의실로 이동해 주세요.' },
];

const LifeGuide = () => {
    return (
        <div className="space-y-8">
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
                    <UserCheck className="text-nh-blue" /> 생활 수칙
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
        </div>
    );
};

export default LifeGuide;
