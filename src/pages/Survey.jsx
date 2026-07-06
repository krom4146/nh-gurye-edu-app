import React, { useState, useEffect } from 'react';
import { ClipboardList, Star, ExternalLink, Loader2 } from 'lucide-react';

// [환경변수 및 주석 처리] 
// 나중에 실제 운영용 구글 시트 주소로 갈아 끼우려면 아래 SHEET_URL 상수를 변경해 주세요.
// 구글 시트에서 [파일] -> [다운로드] -> [쉼표로 구분된 값(.csv)] 형식으로 받을 수 있는 export 주소입니다.
// 형식: https://docs.google.com/spreadsheets/d/{Spreadsheet_ID}/export?format=csv
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1hv9WhrYyR9IIgt7TTw47r-FdCKulhp1ltBc4G2Z69gA/export?format=csv";

const Survey = () => {
    const [surveyList, setSurveyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                const response = await fetch(SHEET_URL);
                if (!response.ok) {
                    throw new Error(`데이터 로드 실패: ${response.status} ${response.statusText}`);
                }
                const text = await response.text();
                
                // 줄바꿈을 기준으로 배열로 변환
                const rows = text.split('\n');
                
                if (rows.length <= 1) {
                    throw new Error('시트에 유효한 데이터가 존재하지 않습니다.');
                }

                // 첫 번째 줄(index 0)은 헤더이므로 제외(slice)하고 나머지 데이터만 파싱
                const parsedData = rows.slice(1).map(row => {
                    // 쉼표로 분리하되 쌍따옴표 안의 쉼표는 무시하도록 정규식 사용
                    const columns = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
                    // 앞뒤 따옴표 및 공백 제거
                    const cleanData = columns.map(item => item.replace(/^"|"$/g, '').trim());
                    return {
                        courseName: cleanData[0] || '',
                        overallLink: cleanData[1] || '#',
                        instructorLink: cleanData[2] || '#'
                    };
                });

                // 과정명이 비어있는 줄(Empty row) 철저히 필터링
                const validSurveys = parsedData.filter(item => item.courseName && item.courseName.length > 0);

                if (validSurveys.length === 0) {
                    throw new Error('유효한 과정명 데이터가 없습니다.');
                }

                setSurveyList(validSurveys);
            } catch (err) {
                console.error("[Survey.jsx] Survey Data Fetch Error:", err);
                setError(err.message || '데이터를 파싱하는 도중 오류가 발생했습니다.');
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
        <div className="space-y-12 animate-in fade-in duration-500 pb-8">
            {surveyList.map((survey, index) => (
                <div key={index} className="space-y-6">
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
                            {survey.courseName}
                        </h1>
                        <p className="text-gray-500 text-sm mt-3 leading-relaxed break-keep relative z-10">
                            교육생 여러분의 소중한 의견이<br/>더 나은 구례교육원을 만듭니다.
                        </p>
                    </div>

                    {/* Survey Buttons */}
                    <div className="space-y-4">
                        <a
                            href={survey.overallLink}
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
                            href={survey.instructorLink}
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
            ))}
        </div>
    );
};

export default Survey;

