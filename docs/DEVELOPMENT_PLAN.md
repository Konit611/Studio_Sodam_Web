# Sodam Studio Frontend — 개발 계획

## Context

AI 기반 개인화 레시피 서비스의 프론트엔드를 처음부터 구축한다. 현재 `docs/PRD-Frontend.md`와 `docs/CODING_RULES.md`만 존재하며, 소스 코드는 없다. 6단계로 나누어 각 단계마다 동작하는 앱을 만들면서 점진적으로 완성한다.

**확정된 기술 스택**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, TanStack Query, pnpm

---

## Phase 0: 프로젝트 초기화

```bash
pnpm create next-app@latest . --typescript --eslint --app --tailwind --src-dir --import-alias "@/*" --turbopack
pnpm add @tanstack/react-query
pnpm add -D @tanstack/react-query-devtools
```

- `tailwind.config.ts` 삭제 (v4는 CSS-first)
- 자동 생성된 보일러플레이트 정리
- `.env.local`, `.env.example` 생성

```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_DEV_MODE=true
NEXT_PUBLIC_DEV_USER_ID=dev-user-001
```

---

## Phase 1: 기반 — Tailwind v4 디자인 시스템 + 레이아웃 셸

**목표**: 헤더 + 네비게이션 + 콘텐츠 영역이 있는 앱 셸 완성, 탭 간 이동 가능

### 파일 생성

| 파일 | 타입 | 역할 |
|------|------|------|
| `src/app/globals.css` | CSS | `@theme`으로 디자인 토큰 정의 (primary 오렌지, background 크림, surface 화이트, danger 레드) |
| `postcss.config.mjs` | Config | `@tailwindcss/postcss` 플러그인 |
| `src/app/layout.tsx` | Server | 루트 레이아웃, Provider 래핑 |
| `src/components/layout/Header.tsx` | Server | "Sodam Recipe" 헤더바 |
| `src/components/layout/BottomNav.tsx` | Client | 모바일 하단 3탭 (홈/레시피/설정), `usePathname()` |
| `src/components/layout/DesktopNav.tsx` | Client | 데스크탑 상단 네비게이션 |
| `src/components/ui/Button.tsx` | Server | 공통 버튼 (primary, danger, ghost variants) |
| `src/components/ui/LoadingSpinner.tsx` | Server | CSS 애니메이션 스피너 |

---

## Phase 2: 데이터 레이어 — API 클라이언트, Auth, TanStack Query

**목표**: 모든 페이지가 사용할 인프라 완성

### TypeScript 타입 (`src/types/`)

| 파일 | 내용 |
|------|------|
| `recipe.ts` | `RecipeListItem`, `RecipeRead`, `Ingredient`, `Instruction`, `GenerateRecipeRequest` |
| `user.ts` | `UserRead`, `UpdateProfileRequest`, `CookingSkill` |
| `api.ts` | `ApiError` |

### API 클라이언트 (`src/lib/api/`)

| 파일 | 내용 |
|------|------|
| `client.ts` | fetch 래퍼 — `get()`, `post()`, `patch()`, `del()` 각각 분리 (CODING_RULES: 논리적 응집 회피) |
| `recipes.ts` | `generateRecipe()`, `fetchRecipeList()`, `fetchRecipeDetail()`, `deleteRecipe()` |
| `users.ts` | `fetchUserProfile()`, `updateUserProfile()` |

### Auth 시스템 (`src/lib/auth/`)

| 파일 | 내용 |
|------|------|
| `dev-user.ts` | 로컬 개발용 mock 유저 ID, `isDevMode()` |
| `context.tsx` | `AuthContext` + `useAuth()` 훅 |
| `provider.tsx` | `AuthProvider` — dev 모드면 mock 유저, 프로덕션은 실제 인증으로 교체 가능한 thin layer |

**로컬 개발 동작 방식**: `NEXT_PUBLIC_DEV_MODE=true`이면 `AuthProvider`가 하드코딩된 유저 ID를 제공. 나머지 앱은 `useAuth().userId`만 사용하므로 인증 구현 교체 시 `provider.tsx`만 수정하면 됨.

### TanStack Query (`src/lib/query/`)

| 파일 | 내용 |
|------|------|
| `query-client.ts` | `getQueryClient()` — 서버/브라우저 분기 |
| `provider.tsx` | `QueryClientProvider` + DevTools |
| `keys.ts` | 중앙화된 query key 상수 |

### Toast 시스템

| 파일 | 내용 |
|------|------|
| `src/components/ui/ToastProvider.tsx` | Client — toast 상태 관리 Context |
| `src/components/ui/Toast.tsx` | Client — toast UI 렌더링 |
| `src/hooks/useToast.ts` | `showSuccess()`, `showError()` 분리 (논리적 응집 회피) |

---

## Phase 3: 홈 페이지 — 레시피 생성 (`/`)

**목표**: 재료 입력 → AI 레시피 생성 → 상세 페이지 이동

### 파일 생성

| 파일 | 타입 | 역할 |
|------|------|------|
| `src/components/ui/TagInput.tsx` | Client | 재사용 태그 입력 (props: `maxItems`, `maxLength`, `placeholder` — 데이터 결합) |
| `src/components/home/IngredientForm.tsx` | Client | 재료 TagInput + 추가 요청사항 textarea + "레시피 만들기" 버튼 |
| `src/components/home/GeneratingOverlay.tsx` | Client | "AI가 레시피를 구상하고 있어요..." 로딩 오버레이 |
| `src/hooks/useGenerateRecipe.ts` | Hook | `useMutation` — 생성 후 레시피 목록 캐시 무효화 |
| `src/utils/validation.ts` | Util | `isValidIngredient()`, `isValidAllergy()` 분리 함수 |
| `src/app/page.tsx` | Server | 페이지 셸 → `IngredientForm` 렌더 |

**동작 흐름**: 재료 입력(1~30개, 50자) → 추가 요청(500자) → POST → 오버레이 표시 → 성공 시 `/recipes/[id]` 이동

---

## Phase 4: 레시피 목록 — 쇼츠 스타일 UI (`/recipes`)

**목표**: 한 번에 하나씩 카드를 보여주는 세로 스와이프 + "더 보기" 버튼

### 쇼츠 구현 기술

**CSS Scroll Snap** (JS 라이브러리 불필요):
- 컨테이너: `scroll-snap-type: y mandatory`, 뷰포트 높이 채움
- 각 카드: `scroll-snap-align: start`, `scroll-snap-stop: always`
- `IntersectionObserver`로 현재 보이는 카드 인덱스 추적
- 마지막 카드에 도달하면 "더 보기" 버튼 표시 → 다음 배치 로드

### 파일 생성

| 파일 | 타입 | 역할 |
|------|------|------|
| `src/components/recipes/ShortsContainer.tsx` | Client | 스크롤 스냅 컨테이너, IntersectionObserver, 페이지네이션 |
| `src/components/recipes/RecipeCard.tsx` | Server* | 카드 UI (시간, 난이도, 제목, 요약, 날짜) |
| `src/components/ui/DifficultyBadge.tsx` | Server | easy→쉬움, medium→보통, hard→어려움 |
| `src/components/ui/EmptyState.tsx` | Server | "아직 만든 레시피가 없어요" + 홈 이동 |
| `src/hooks/useRecipeList.ts` | Hook | 수동 페이지네이션 (offset/limit, "더 보기" 버튼 방식) |
| `src/utils/format-date.ts` | Util | ISO → "2월 23일" |
| `src/utils/format-difficulty.ts` | Util | difficulty 한글 매핑 |
| `src/app/recipes/page.tsx` | Server | 페이지 셸 → `ShortsContainer` |

---

## Phase 5: 레시피 상세 + 설정 페이지

**목표**: 나머지 2개 페이지 완성

### 레시피 상세 (`/recipes/[id]`)

| 파일 | 타입 | 역할 |
|------|------|------|
| `src/app/recipes/[id]/page.tsx` | Server | `params` await 후 서버 사이드 fetch |
| `src/components/recipes/RecipeDetail.tsx` | Server | 재료 목록 + 조리 순서 렌더링 |
| `src/components/recipes/DeleteRecipeButton.tsx` | Client | 삭제 아이콘 → ConfirmDialog → mutation → `/recipes` 이동 |
| `src/components/ui/ConfirmDialog.tsx` | Client | 삭제 확인 모달 (접근성: focus trap, ESC 닫기) |
| `src/hooks/useDeleteRecipe.ts` | Hook | `useMutation` — 삭제 후 캐시 무효화 |

### 설정 (`/settings`)

| 파일 | 타입 | 역할 |
|------|------|------|
| `src/app/settings/page.tsx` | Server | 페이지 셸 |
| `src/components/settings/SettingsForm.tsx` | Client | 통합 폼 — dirty 상태 추적, 변경 없으면 버튼 비활성화 |
| `src/components/settings/AllergyForm.tsx` | Client | `TagInput` (max 20개, 30자) |
| `src/components/settings/CookingSkillRadio.tsx` | Client | beginner/intermediate/advanced 라디오 |
| `src/hooks/useUserProfile.ts` | Hook | `useQuery` — `useAuth().userId` 사용 |
| `src/hooks/useUpdateProfile.ts` | Hook | `useMutation` — 프로필 캐시 무효화 |

---

## Phase 6: 폴리시 — 에러 처리, 로딩, 낙관적 업데이트

**목표**: 프로덕션 수준의 에러/로딩 UX

| 파일 | 역할 |
|------|------|
| `src/app/error.tsx` | 에러 바운더리 — "다시 시도" 버튼 |
| `src/app/not-found.tsx` | 404 — "페이지를 찾을 수 없습니다" |
| `src/app/loading.tsx` | 글로벌 로딩 스피너 |
| `src/app/recipes/[id]/loading.tsx` | 상세 페이지 스켈레톤 |

**낙관적 삭제**: `useDeleteRecipe`에 `onMutate`로 캐시에서 즉시 제거, `onError`로 롤백

**에러 매핑**: 400→필드 에러, 404→not-found, 500→"잠시 후 다시 시도해주세요", 네트워크→"네트워크 연결을 확인해주세요"

---

## 검증 방법

1. `pnpm dev` 후 `localhost:3000` 접속 — 모든 페이지 네비게이션 확인
2. 홈에서 재료 입력 → "레시피 만들기" → 상세 이동 확인 (백엔드 연결 필요)
3. 레시피 목록 — 쇼츠 스와이프 동작, "더 보기" 버튼 확인
4. 설정 — 알레르기 추가/제거, 숙련도 변경, 저장 확인
5. 모바일(375px) / 데스크탑(1024px+) 반응형 확인
6. `NEXT_PUBLIC_DEV_MODE=true`에서 인증 없이 모든 기능 동작 확인
7. `pnpm build` — 빌드 에러 없음 확인
