import React, { useState, useEffect } from 'react';
import { ClipboardList, Star, ExternalLink, Loader2 } from 'lucide-react';

// [환경변수 및 주석 처리]
// 나중에 실제 운영용 구글 시트 주소로 갈아 끼우려면 아래 SHEET_URL 상수를 변경해 주세요.
// 구글 시트에서 [파일] -> [다운로드] -> [쉼표로 구분된 값(.csv)] 형식으로 받을 수 있는 export 주소입니다.
// 형식: https://docs.google.com/spreadsheets/d/{Spreadsheet_ID}/export?format=csv
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1hv9WhrYyR9IIgt7TTw47r-FdCKulhp1ltBc4G2Z69gA/export?format=csv";

// CSV 파싱 헬퍼 함수: 따옴표 안의 쉼표를 무시하고 띄어쓰기를 온전히 보존합니다.
const parseCSVRow = (row) => {
  const result = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    if (char === '"') {
      if (inQuotes && row[i + 1] === '"') {
        cell += '"'; // Escape quote
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(cell.trim());
      cell = '';
    } else {
      cell += char;
    }
  }
  result.push(cell.trim());
  return result;
};

const Survey = () => {
  const [surveyList, setSurveyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lock screen states
  const [isLocked, setIsLocked] = useState(() => {
    return sessionStorage.getItem('survey_unlocked') !== 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (isLocked) return;

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
          const columns = parseCSVRow(row);
          return {
            courseName: columns[0] || '',
            overallLink: columns[1] || '#',
            instructorLink: columns[2] || '#'
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
  }, [isLocked]);

  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6 bg-white/85 backdrop-blur-md border border-white/40 shadow-sm rounded-2xl m-4 animate-in fade-in duration-500">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-gray-800">
            🔒 수료의견 작성
          </h1>
          <p className="text-sm text-gray-500 mt-2">안내받은 비밀번호 4자리를 입력해 주세요.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (passwordInput === '1660') {
              sessionStorage.setItem('survey_unlocked', 'true');
              setIsLocked(false);
              setPasswordError(false);
            } else {
              setPasswordError(true);
            }
          }}
          className="flex flex-col items-center w-full max-w-[240px] space-y-4"
        >
          <div className="w-full space-y-2">
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setPasswordError(false);
              }}
              className={`w-full text-center text-2xl tracking-[0.3em] font-bold p-4 border-2 ${passwordError ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 bg-gray-50 focus:border-nh-blue focus:ring-nh-blue'} rounded-xl focus:outline-none focus:ring-2 transition-all`}
              placeholder="••••"
            />
            {passwordError && (
              <p className="text-sm text-red-500 font-bold text-center animate-in slide-in-from-top-1">
                ❌ 비밀번호가 올바르지 않습니다.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-nh-blue text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-sm text-lg"
          >
            확인
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 bg-white/70 backdrop-blur-md rounded-2xl m-4">
        <Loader2 className="animate-spin text-nh-blue" size={48} />
        <p className="text-gray-600 font-medium animate-pulse">설문 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-white/70 backdrop-blur-md rounded-2xl m-4 border border-red-100">
        <p className="text-red-500 font-medium mb-2">데이터 로드 실패</p>
        <p className="text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-8">
      {surveyList.map((survey, index) => (
        <div key={index} className="bg-white/85 backdrop-blur-sm border border-white/40 shadow-sm rounded-2xl p-4 space-y-4">
          {/* Compact Title Area */}
          <div className="flex flex-col items-center text-center space-y-2 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="p-1 bg-nh-blue/10 rounded-lg text-nh-blue">
                <ClipboardList size={16} />
              </div>
              <span className="text-xs font-bold text-nh-blue tracking-wider">수료 의견 작성</span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-gray-800 break-keep leading-tight px-2">
              {survey.courseName}
            </h1>
          </div>

          {/* Survey Buttons */}
          <div className="grid grid-cols-1 gap-3">
            <a
              href={survey.overallLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-white hover:bg-gray-50 border border-gray-200 p-4 rounded-xl transition-all shadow-sm active:scale-95 group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-50 p-2.5 rounded-full text-nh-green group-hover:scale-110 transition-transform">
                  <ClipboardList size={22} />
                </div>
                <div className="text-left">
                  <h2 className="text-base font-bold text-gray-800">전체 수료의견</h2>
                  <p className="text-xs text-gray-500 mt-0.5">과정 전반 평가</p>
                </div>
              </div>
              <ExternalLink className="text-gray-300 group-hover:text-nh-green transition-colors" size={20} />
            </a>

            <a
              href={survey.instructorLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full bg-white hover:bg-gray-50 border border-gray-200 p-4 rounded-xl transition-all shadow-sm active:scale-95 group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-orange-50 p-2.5 rounded-full text-orange-500 group-hover:scale-110 transition-transform">
                  <Star size={22} />
                </div>
                <div className="text-left">
                  <h2 className="text-base font-bold text-gray-800">강사별 만족도</h2>
                  <p className="text-xs text-gray-500 mt-0.5">강의 및 강사 평가</p>
                </div>
              </div>
              <ExternalLink className="text-gray-300 group-hover:text-orange-500 transition-colors" size={20} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Survey;
