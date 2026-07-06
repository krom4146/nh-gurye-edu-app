import React, { useState, useEffect } from 'react';
import { ClipboardList, Star, ExternalLink, Loader2 } from 'lucide-react';

// [환경변수 및 주석 처리] 
// 나중에 실제 운영용 구글 시트 웹 게시 주소로 갈아 끼우려면 아래 SHEET_URL 상수를 변경해 주세요.
// 구글 시트에서 [파일] -> [공유] -> [웹에 게시] 기능을 이용해 생성된 문서 주소의 ID를 확인하고 적용합니다.
// 형식: https://docs.google.com/spreadsheets/d/{Spreadsheet_ID}/gviz/tq?tqx=out:csv
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1hv9WhrYyR9IIgt7TTw47r-FdCKulhp1ltBc4G2Z69gA/gviz/tq?tqx=out:csv";

const Survey = () => {
    const [surveyData, setSurveyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                const response = await fetch(SHEET_URL);
                if (!response.ok) {
                    throw new Error('데이터를 불러오는데 실패했습니다.');
                }
                const text = await response.text();
                
                // 간단한 CSV 파싱 로직: 줄바꿈으로 나누고 콤마로 분리 (따옴표 처리 포함)
                const rows = text.split('\n');
                if (rows.length > 1) {
                    // 첫 번째 줄(rows[0])은 헤더, 두 번째 줄(rows[1])을 실제 데이터로 간주
                    const dataRow = rows[1].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
                    
                    // 데이터 앞뒤의 따옴표 제거
                    const cleanData = dataRow.map(item => item.replace(/^"|"$/g, '').trim());
                    
                    setSurveyData({
                        courseName: cleanData[0] || '과정명 데이터 오류',
                        overallLink: cleanData[1] || '#',
                        instructorLink: cleanData[2] || '#'
                    });
                } else {
                    throw new Error('시트에 데이터가 존재하지 않습니다.');
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSurveyData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="animate-spin text-purple-600" size={48} />
                <p className="text-gray-500 font-medium animate-pulse">설문 정보를 불러오는 중입니다...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 font-medium mb-2">데이터 로드 실패</p>
                <p className="text-sm text-gray-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Title Area */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-6 text-center shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4">
                    <ClipboardList size={100} />
                </div>
                <div className="inline-flex p-3 bg-white rounded-full text-purple-600 shadow-sm mb-4 relative z-10">
                    <ClipboardList size={32} />
                </div>
                <p className="text-sm text-purple-600 font-bold mb-1 relative z-10">수료 의견 작성</p>
                <h1 className="text-2xl font-black text-gray-800 break-keep relative z-10">
                    {surveyData?.courseName}
                </h1>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed break-keep relative z-10">
                    교육생 여러분의 소중한 의견이<br/>더 나은 구례교육원을 만듭니다.
                </p>
            </div>

            {/* Survey Buttons */}
            <div className="space-y-4">
                <a
                    href={surveyData?.overallLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full bg-white border-2 border-purple-100 hover:border-purple-500 hover:bg-purple-50 p-6 rounded-2xl transition-all shadow-sm active:scale-95 group"
                >
                    <div className="flex items-center gap-4">
                        <div className="bg-purple-100 p-3 rounded-full text-purple-600 group-hover:scale-110 transition-transform">
                            <ClipboardList size={28} />
                        </div>
                        <div className="text-left">
                            <h2 className="text-lg font-bold text-gray-800 group-hover:text-purple-700">전체 수료의견</h2>
                            <p className="text-sm text-gray-500 mt-1">교육 과정 전반에 대한 평가</p>
                        </div>
                    </div>
                    <ExternalLink className="text-purple-300 group-hover:text-purple-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={24} />
                </a>

                <a
                    href={surveyData?.instructorLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full bg-white border-2 border-indigo-100 hover:border-indigo-500 hover:bg-indigo-50 p-6 rounded-2xl transition-all shadow-sm active:scale-95 group"
                >
                    <div className="flex items-center gap-4">
                        <div className="bg-indigo-100 p-3 rounded-full text-indigo-600 group-hover:scale-110 transition-transform">
                            <Star size={28} />
                        </div>
                        <div className="text-left">
                            <h2 className="text-lg font-bold text-gray-800 group-hover:text-indigo-700">강사별 수료의견</h2>
                            <p className="text-sm text-gray-500 mt-1">강의 및 강사 만족도 평가</p>
                        </div>
                    </div>
                    <ExternalLink className="text-indigo-300 group-hover:text-indigo-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={24} />
                </a>
            </div>
        </div>
    );
};

export default Survey;
