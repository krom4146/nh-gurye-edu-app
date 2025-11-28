import React from 'react';
import { MapPin } from 'lucide-react';
import facilityMap from '../assets/facility_map.jpg';

const facilities = [
    { id: 1, name: '연수동', desc: '원장실 · 강의실 · 대강당 · 소강당', color: 'bg-blue-100 text-blue-700' },
    { id: 2, name: '숙소동', desc: '생활공간', color: 'bg-yellow-100 text-yellow-700' },
    { id: 3, name: '복지동', desc: '체력단련실 · 탁구장', color: 'bg-green-100 text-green-700' },
    { id: 4, name: '독서실', desc: '학습 공간', color: 'bg-purple-100 text-purple-700' },
    { id: 5, name: '카페', desc: '휴게 공간', color: 'bg-orange-100 text-orange-700' },
    { id: 6, name: '식당', desc: '식사 장소', color: 'bg-red-100 text-red-700' },
    { id: 7, name: '전기차충전소', desc: '주차장 내 위치', color: 'bg-teal-100 text-teal-700' },
    { id: 8, name: '운동장', desc: '야외 활동', color: 'bg-indigo-100 text-indigo-700' },
];

const Facility = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <img src={facilityMap} alt="시설 안내도" className="w-full h-auto object-cover" />
            </div>

            <div className="grid grid-cols-1 gap-3">
                {facilities.map((item) => (
                    <div key={item.id} className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mr-4 ${item.color}`}>
                            {item.id}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Facility;
