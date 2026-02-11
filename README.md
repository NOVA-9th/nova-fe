# 🌟 NOVA

## ✍ 프로젝트 소개

<img width="867" height="326" alt="image" src="https://github.com/user-attachments/assets/9ac0f35a-41d0-4196-b2d3-7d1fa462db69" />

---

## 🏃‍♂️ FE 팀원 소개

### 리드

|<img src="https://avatars.githubusercontent.com/u/197043026?v=4" width="150" height="150"/>|
|:-:|
|[정찬원](https://github.com/JeongCW0522)|

### 팀원

|<img src="https://avatars.githubusercontent.com/u/106294218?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/176879649?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/134901444?v=4" width="150" height="150"/>|
|:-:|:-:|:-:|
|[김진성](https://github.com/smileman62)|[전선아](https://github.com/JeonSuna)|[임지은](https://github.com/wldmsdl7)|

---

## 🛠 기술 스택

<div align="center">
  <!-- Framework & Core -->
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
</div>

<div align="center">
  <!-- State / Data / Form -->
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" />
</div>

<div align="center">
  <!-- Collaboration -->
  <img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/Notion-A8B9CC?style=for-the-badge&logo=notion&logoColor=black" />
  <img src="https://img.shields.io/badge/Figma-49B48A?style=for-the-badge&logo=figma&logoColor=white" />
</div>

---

## 📌 커밋 전략 (Commit Strategy)

### **커밋 유형 (Commit Type)**

커밋은 다음과 같이 분류하여 메시지를 작성한다.

| 이모지 | 커밋 유형 | 코드 | 작업 내용 |
| --- | --- | --- | --- |
| ✨ | `feat` | `:sparkles:` | 새로운 기능 구현 |
| 🐛 | `fix` | `:bug:` | 버그 수정 |
| 💄 | `style` | `:lipstick:` | CSS 등 사용자 UI 디자인 변경 |
| 💬 | `chore` | `:speech_balloon:` | 코드에 영향 없는 변경 (오타, 변수명 등) |
| ♻️ | `refactor` | `:recycle:` | 코드 리팩토링 (구조 개선) |
| 💡 | `chore` | `:bulb:` | 주석 추가 및 수정 |
| 📝 | `docs` | `:memo:` | 문서 수정 (README 등) |
| ✅ | `test` | `:white_check_mark:` | 테스트 추가, 테스트 리팩토링 |
| 📦 | `chore` | `:package:` | 빌드 or 패키지 매니저 수정 |
| 🚚 | `chore` | `:truck:` | 파일/폴더명 추가/수정 |
| 🔥 | `chore` | `:fire:` | 파일/폴더 삭제 |
| 🎉 | `chore` | `:tada:` | 프로젝트 시작 |
| ⚙️ | `chore` | `:gear:` | 설정 파일 수정 및 패키지 관리 |

### **커밋 메세지 작성 규칙**

1. 커밋 메세지는 다음과 같은 형태로 작성한다. (띄어쓰기 및 형식 참고)

   ```
   <이모지> <커밋 유형>: <커밋 메세지>
   ```

2. 커밋 유형은 반드시 영문 소문자로 작성한다.
3. 커밋 메세지는 “논리적으로 독립적인 작업”을 추가 혹은 변경할 때 작성한다.
   - 독립적으로 빌드 및 테스트가 가능할 때
   - 롤백시 최소한의 영향을 주는 단위

<br>

## 📌 브랜치 전략 (Branch Strategy)

### 브랜치 유형 (Branch Type)

- ***main** : 배포용 브랜치*
    - **실제 서비스에 배포되는 코드**만 포함
    - **직접 개발하지 않고 dev 또는 fix 등의 브랜치를 이용**하여 병합하여 사용
- ***dev** : 개발 통합 브랜치*
    - **main 브랜치에서 분기**
    - 여러 기능이 개발되고 통합되는 브랜치
    - feature 브랜치에서 작업한 기능들을 이 곳으로 병합
    - 충분히 테스트한 후 main으로 배포
- ***feature/#이슈번호-기능명*** : 신규 UI 개발 브랜치
    - **dev 브랜치에서 분기**되어 컴포넌트 및 페이지 단위로 개발
    - 개발 완료 후 **dev**로 병합
- ***service/#이슈번호-기능명*** : 신규 기능 개발 브랜치
    - **dev 브랜치에서 분기**되어 기능 및 비즈니스 로직 단위로 개발
    - 개발 완료 후 **dev**로 병합
- ***fix/#이슈번호-기능명*** : 버그 수정용 브랜치
    - **dev 브랜치에서 분기**하여 개발 시 발견된 버그 수정
        - 기능 구현에 대한 버그 수정시, 반드시 해당 기능에 대한 브랜치를 병합 후, 분기하여 버그 수정
    - 수정 완료 후 해당 브랜치로 병합
- ***refactor/#이슈번호-기능명*** : 리팩토링용 브랜치
    - **dev 브랜치에서 분기하여** 코드 구조 개선 및 리팩토링 수행
        - 기능 단위 리팩토링 시, 반드시 해당 기능 브랜치를 병합 후 분기하여 리팩토링 수행
    - 리팩토링 완료 후 해당 브랜치로 병합

### **브랜치 규칙 (Branching Rule)**

1. 기능 개발은 반드시 **feature** 및 **service** 브랜치에서 개발한다.
2. 개발 완료 시 **dev** 브랜치로 병합한다.
   - 브랜치명은 **camelCase** 를 사용 <br>
     ex) `feature/#1-loginPage`
3. 모든 QA 및 버그 수정 완료 시 **dev**으로 병합한다.
4. 긴급 수정은 **hotfix** 브랜치에서 진행 후, 병합한다.

---

## 🗂️ 프로젝트 구조

### FSD 구조 활용

```
app/
├─ (pages)                    # Public Layout
│  ├─ _providers/
│  │   └─ ThemeProvider.tsx
│  ├─ login/
│  │   └─ page.tsx
│  ├── onboarding/
│  │   └─ page.tsx
│  └─ layout.tsx
│
├─ (protected)                # Protected Layout
│  ├─ trend/
│  │   └─ page.tsx
│  ├─ saved/
│  │   └─ page.tsx
│  └─ profile/
│  │   └─ page.tsx
│  ├─ page.tsx
│  └─ layout.tsx              # home/saved/mypage 공통 레이아웃 (헤더/탭/사이드바 등)
│
├─ layout.tsx                 # 최상위 루트 레이아웃 (html/body, providers 등)
└─ page.tsx                   # (선택) 루트 접근 시 리다이렉트용
```

```
widgets/                      # 위젯 컴포넌트 (페이지에서 사용하는 재사용 가능한 구성 요소)
├── layout/                   # 레이아웃 관련 위젯들
│   ├── Header/               # 헤더 위젯
│   ├── ├── model/            # 헤더 상태 관리
│   │   ├── index.ts          # 헤더 Export
│   │   ├── Header.tsx        # 헤더 컴포넌트
│   ├── Sidebar/
│   ├── ├── index.ts
│   ├── ├── model/
│   │   └── ...
│   └── ...
```

```
features/                      # 페이지별(기능별)로 구성된 폴더 (독립적인 비즈니스 로직과 UI 포함)
├── login/                     # 로그인 기능
│   ├── api/                   # 로그인 관련 API 통신 모듈
│   ├── ui/                    # 로그인 관련 UI 컴포넌트
│   │    └── LoginForm.tsx
│   ├── model/                 # 로그인 관련 상태 관리
│   ├── types/                 # 로그인 관련 타입 정의 (TypeScript)
│   ├── utils/                 # 로그인 관련 유틸리티 함수
│   ├── index.ts               # 모듈별로 export 정리
│   ├── ...                    # 기타 필요한 리소스
│   │
│   ├── onboarding/            # 온보딩 기능
│   │   ├── api/               # 온보딩 관련 API 통신 모듈
│   │   ├── ui/                # 온보딩 관련 UI 컴포넌트
│   │   │   ├── Step1Card.tsx
│   │   │   ├── Step2Card.tsx
│   │   │   └── ...
│   │   ├── models/            # 장바구니 관련 상태 관리
│   │   ├── types/             # 장바구니 관련 타입 정의 (TypeScript)
│   │   ├── utils/             # 장바구니 관련 유틸리티 함수
│   │   ├── index.ts           # 모듈별로 export 정리
│   │   └── ...                # 기타 필요한 리소스
│   └── ...                    # 기타 기능들 (home, saved, profile, trend)
```

```
shared/                      # 공통 유틸리티, 컴포넌트, 훅 등
├── assets/                  # 공통 svg 파일들
├── utils/                   # 유틸리티 함수
│   └── cn.ts                # cn 함수
│
├── hooks/                   # 공통 커스텀 훅
├── ui/                      # 공통 컴포넌트 UI
├── types/                   # 전역 타입 정의
├── index.ts                 # 모듈별로 export 정리
└── ...
```

---

<br>

## 🧠 상태 관리 전략 (Zustand)

**NOVA**는 전역적으로 공유되어야 하는 UI 상태를 `Zustand`로 관리합니다.  
서버 데이터는 `TanStack Query`로 분리하여 역할을 명확히 구분합니다.

### 📦 Store 구성

#### 01 Auth Store
- 로그인 여부
- accessToken
- memberId
- persist를 활용한 인증 상태 유지

→ Public Layout 및 Protected Layout 및 API 요청 시 활용


#### 02 Feed / Saved Filter Store
- 정렬 기준
- 기간 필터
- 타입 / 키워드 선택 상태
- 검색어 상태

→ HeaderBar, Filter UI, 리스트 컴포넌트 간 상태 공유


#### 03 Onboarding Store
- Step1 ~ Step4 입력 데이터 누적 관리

→ 다단계 온보딩 흐름에서 상태 유지


## 🌙 Theme 관리

다크모드는 `next-themes`를 사용하여 시스템 테마와 사용자 선택을 반영합니다.

- `resolvedTheme` 기반 현재 테마 판별
- `toggleTheme()`로 라이트/다크 전환

---

<br>

## ❓ Next.js 사용 이유

NOVA는 AI 트렌드, 차트, 뉴스 등 **데이터 기반 페이지가 많은 서비스**로, 빠른 초기 로딩, SEO 최적화, 그리고 유지보수하기 쉬운 구조가 중요하다.
Next.js는 파일 기반과 동적 라우팅을 지원해 페이지 구조 관리가 쉽고, 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 통해 빠른 초기 로딩과 SEO 최적화를 동시에 제공한다.
또한 공통 레이아웃 재사용과 클라이언트 사이드 탐색까지 가능해 유지보수와 사용자 경험이 뛰어나며, AI 트렌드 인사이트 플랫폼처럼 데이터와 페이지가 많은 서비스에 최적화된 프레임워크이기 때문에 선택하게 되었다.

### **01 SSR(Server-Side Rendering) 지원으로 빠른 초기 로딩**

> AI 트렌드, 차트, 뉴스 등 많은 데이터를 보여주는 플랫폼은 빠른 초기 렌더링이 중요하다.

- Next.js는 **서버에서 HTML을 미리 렌더링**해 브라우저로 전달
  - 사용자가 처음 페이지를 열 때 **콘텐츠가 바로 보여짐**
  - SEO에 유리 (검색 엔진에 데이터가 바로 노출됨)

### **02 SSG(Static Site Generation)으로 빠른 성능과 비용 절감**

- 맞춤형 AI 요약 피드, 카테고리 별 기술 스택 순위 같은 **자주 변하지 않는 콘텐츠**는 빌드 시 미리 HTML로 생성
  - 서버 요청 최소화 → 비용 절감
  - CDN 캐싱을 통한 빠른 응답
  - 트래픽 증가에도 안정적인 성능 유지

### 03. App Router & Server Components 기반 아키텍처

- Next.js App Router 기반으로 **레이아웃 / 페이지 구조를 계층적으로 관리**
- **Server Components를 활용**한
  - 불필요한 클라이언트 JS 번들 감소
  - 초기 로딩 성능 개선
- **Streaming, Suspense를 활용**한 점진적 렌더링 구조 설계
- AI 트렌드 시각화, 실시간 데이터 UI 구현에 최적

### **04 라우팅과 레이아웃 관리 용이**

- **파일 기반 라우팅**으로 URL 구조 자동 관리
- **동적 라우팅** 지원으로 AI 인사이트, 뉴스 등 페이지 자동 생성 가능
- **공통 레이아웃 재사용**으로 유지보수 효율 ↑
- `Link`를 통한 **클라이언트 사이드 탐색**으로 페이지 전환 속도 향상

### **05 SEO 친화적**

- SSR/SSG를 통해 검색 엔진이 콘텐츠를 쉽게 읽도록 최적화 가능
- 메타데이터, 오픈그래프 설정도 페이지 단위로 제어 가능

### **06 배포와 유지보수가 쉬움**

- Vercel과 연동하면 **자동 빌드 + 배포**
- 서버 관리 최소화 → 개발자가 AI 데이터, 기능 개선에 집중 가능

---

<br>

## 🧨 Trouble Shooting

### 디자인 시스템 적용 및 공통 컴포넌트 구조 설계 문제

#### 문제

- 디자이너가 Figma에 설계한 디자인 시스템이 매우 세분화되어 있었고,  
  이를 그대로 코드로 옮기기에는 **variant, size, state 조합이 지나치게 복잡한 구조**였다.
- **“어디까지를 공통 컴포넌트로 만들고, 어디까지를 variant로 처리할 것인가”**
  에 대한 팀 내 기준이 없어 구조 설계 단계에서 많은 혼란이 있었다.

#### 원인

- 디자인 시스템은 잘 설계되어 있었지만,  
  **이를 코드 구조로 번역하는 규칙이 정해져 있지 않았다.**
- 컴포넌트 추상화 수준에 대한 팀 내 합의 부족
- Tailwind + CVA를 어떤 기준으로 사용할지에 대한 경험 부족

#### 해결 과정

- 팀 내에서 디자인 시스템 구조를 다시 분석하는 회의를 여러 차례 진행했다.
  - “이 컴포넌트는 독립 컴포넌트인가?”
  - “이 옵션은 진짜 필요한가?”
- Class Variance Authority(CVA)를 도입했다.
  - variant / size / state 기준으로 스타일 체계를 재정의
  - compoundVariants를 활용해 복합 조건을 명확히 분리
- 아래 레퍼런스들을 참고해 팀 내 구조를 정립했다.
  - https://bh2980.tistory.com/275
  - https://drakon.tistory.com/136

#### 결과

- 디자인 시스템과 코드 구조가 1:1로 매칭되는 체계를 확립했다.
- 컴포넌트 스타일 수정 시
  - 한 곳만 수정하면 전체 반영되는 구조 완성
- 신규 UI 개발 시
  - 기존 컴포넌트 재사용만으로 빠른 구현 가능

---

## 🗓️ 프로젝트 일정

플랫폼 개발 일정은 스프린트 단위로 관리하며, 각 단계별 목표와 진행 상황을 명확히 합니다.

| 스프린트| 기간 | 목표 / 주요 작업 | 상태 |
| - | - | - | - |
| 1차 스프린트 | ~2026-01-18 | - 프로젝트 초기 세팅 <br/> - 라우팅 구조 설계 <br/> - 공통 UI 컴포넌트 구현 <br/> - 디자인 시스템 초기 세팅 (cn, cva) | 완료 |
| 2차 스프린트 | ~2026-02-01 | - UI 및 구조 구현 <br/> - 컴포넌트 UI 구현 <br/> - 페이지 UI 구현 <br/> - API 연동 구조 준비 <br/> - 로딩 / 빈 상태 UI 연결 <br/> - 에러 처리 구현 | 완료 |
| 2.5차 스프린트 | ~2026-02-07 | - API 연동 마무리 <br/> - 주요 API 연동 80% 완료 | 완료 |
| 3차 스프린트 | ~2026-02-15 | - 완성도 및 품질 개선 <br/> - UX 개선 <br/> - 예외 케이스 처리 <br/> - 콘솔 에러 제거 <br/> - 데모 시나리오 점검 <br/> - QA 반영 | 진행중 |
