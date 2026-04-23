# 농협 교육원 통합관리앱 템플릿

다른 농협 교육원에서도 사용할 수 있도록 제작된 통합관리앱 템플릿입니다. 이 앱을 복사하여 귀하의 교육원에 맞게 수정하고 사용할 수 있습니다.

## 🚀 템플릿 일괄 복사 및 배포하기 (Vercel)

가장 쉽게 앱을 복사하고 호스팅 서버에 바로 배포하는 방법입니다. 아래 버튼을 클릭하면 Vercel을 통해 여러분의 GitHub 계정으로 저장소가 자동으로 복사(Fork)되고 배포까지 원클릭으로 진행됩니다.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkrom4146%2Fnh-gurye-edu-app&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY)

> **⚠️ 필수사항**: 위 버튼을 클릭하여 배포를 진행하는 과정에서, `VITE_SUPABASE_URL` 및 `VITE_SUPABASE_ANON_KEY` 환경변수(Environment Variables)를 반드시 입력해야 데이터베이스 기능(건의사항, 외출/외박 신청 등)이 정상 작동합니다. (아래 Supabase 설정 방법 참고)

---

## 📂 코드를 직접 포크(Fork)하기

Vercel 자동 배포 대신, 코드를 직접 가져와서 수정 및 커스터마이징하고 싶다면 저장소를 Fork 하세요.

**[🔗 여기를 클릭하여 GitHub에서 Fork 하기 (템플릿 복사)](https://github.com/krom4146/nh-gurye-edu-app/fork)**

---

## 🛠️ 데이터베이스 (Supabase) 초기 설정 방법

이 앱의 데이터 관리를 위해 여러분만의 **Supabase** 프로젝트를 생성해야 합니다.

1. [Supabase 공식 홈페이지](https://supabase.com/)에 회원가입 후 로그인합니다.
2. 새 프로젝트(New Project)를 생성합니다.
3. 프로젝트가 생성되면 톱니바퀴 아이콘(`Project Settings`) -> `API` 메뉴로 이동합니다.
4. 거기서 **`Project URL`**과 **`Project API keys (anon, public)`** 값을 복사합니다. 이 두 값이 Vercel 배포 시 입력할 환경변수입니다.
5. 앱 최상위 디렉터리에 있는 `suggestions_schema.sql` (등 데이터베이스 스키마 파일)의 내용을 Supabase의 `SQL Editor`에 복사+붙여넣기 한 후 실행(Run)하여 필요한 테이블을 생성합니다.

---

### 💻 로컬 개발 환경 실행 방법

로컬에서 개발 및 테스트를 진행하려면, 프로젝트의 최상단 경로에 `.env` 파일을 만들고 아래와 같이 복사한 Supabase 키를 입력하세요.

```env
VITE_SUPABASE_URL=여기에_여러분의_SUPABASE_URL_입력
VITE_SUPABASE_ANON_KEY=여기에_여러분의_SUPABASE_ANON_KEY_입력
```

명령어 실행:
```bash
npm install
npm run dev
```
