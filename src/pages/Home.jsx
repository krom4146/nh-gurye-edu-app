import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Map, BookOpen, AlertCircle, CheckSquare, Coffee } from 'lucide-react';

const MenuItem = ({ icon, label, to, color }) => {
    const navigate = useNavigate();
    const Icon = icon;
    return (
        <button
            onClick={() => navigate(to)}
            className="flex flex-col items-center justify-center p-6 bg-white/70 backdrop-blur-md rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 border border-gray-100 aspect-square"
        >
            <div className={`p-3 rounded-full ${color} text-white mb-3`}>
                <Icon size={32} />
            </div>
            <span className="font-medium text-gray-800 text-sm sm:text-base">{label}</span>
        </button>
    );
};

const Home = () => {
    return (
        <div className="space-y-6">
            {/* Banner Area */}
            <div className="text-center py-4">
                <div className="space-y-2">
                    <p className="text-xl font-bold text-nh-blue">구례교육원에 스며듦</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                        짧게는 이틀, 길게는 2주일 머무는 교육생도<br />
                        1년 365일 중 대부분의 시간을 이곳에서 보내는 직원들도<br />
                        편안함, 성장, 동료애를 느끼는 농협구례교육원이 되길 바라며...
                    </p>
                </div>
            </div>

            {/* Grid Menu */}
            <div className="grid grid-cols-2 gap-4">
                <MenuItem
                    icon={LogOut}
                    label="외출/외박 신청"
                    to="/outing"
                    color="bg-nh-blue"
                />
                <MenuItem
                    icon={Map}
                    label="시설 안내"
                    to="/facility"
                    color="bg-nh-green"
                />
                <MenuItem
                    icon={Coffee}
                    label="생활 안내"
                    to="/life"
                    color="bg-orange-400"
                />
                <MenuItem
                    icon={BookOpen}
                    label="생활 수칙"
                    to="/rules"
                    color="bg-red-500"
                />
                <MenuItem
                    icon={CheckSquare}
                    label="퇴실시 주의사항"
                    to="/bedding"
                    color="bg-indigo-500"
                />
                <MenuItem
                    icon={AlertCircle}
                    label="건의사항"
                    to="/suggestions"
                    color="bg-pink-500"
                />
            </div>
        </div>
    );
};

export default Home;
