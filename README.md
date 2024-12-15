# Wish

![wish_img_01](https://github.com/user-attachments/assets/8e5fc26d-6b78-4ef1-95ba-70ec83f23a35)

> 배포 링크
> **https://wish-test.netlify.app**

<br/>

<p align=center>
  <a href="https://docs.google.com/document/d/1Ob-5dwxqgAiJ6cobF7Lkjia355zKJJXVFZfnm-JjlY4/edit?usp=sharing">개발 기획서</a>
  &nbsp; | &nbsp;
  <a href="https://docs.google.com/presentation/d/1-bXWJeaPJE2Lpr65SKw8Sy_ByLG3uXdeSGClkZIK6Ao/edit?usp=sharing">발표자료</a>
  &nbsp; | &nbsp;
  <a href="#">발표영상</a>
</p>

## 📄 목차

- [📄 목차](#-목차)
- [🏆 2024년 제6회 K-디지털 트레이닝 해커톤 장려상 수상](#🏆-2024년-제6회-K-디지털-트레이닝-해커톤-장려상-수상)
- [✍🏻 프로젝트 개요](#-프로젝트-개요)
- [🚀 핵심 기능](#-핵심-기능)
  - [어떤 기기로든 편리하게 항공권을 검색할 수 있어요.](#어떤-기기로든-편리하게-항공권을-검색할-수-있어요)
  - [원하는 정보를 바로 필터링할 수 있어요.](#원하는-정보를-바로-필터링할-수-있어요)
  - [선택한 항공권을 구매할 수 있어요.](#선택한-항공권을-구매할-수-있어요)
  - [항공편에 따라 원하는 좌석을 선택할 수 있어요.](#항공편에-따라-원하는-좌석을-선택할-수-있어요)
  - [나만의 티켓을 꾸미고 기록을 확인할 수 있어요.](#나만의-티켓을-꾸미고-기록을-확인할-수-있어요)
- [⚙️ 기술 스택](#️-기술-스택)
- [🏛️ 서비스 구조](#️-서비스-구조)
  - [요구사항 정의서](#요구사항-정의서)
  - [플로우 차트](#플로우-차트)
- [🔎 FE 기술적 도전](#-fe-기술적-도전)

  - [반응형 UI](#반응형-ui)
  - [타입 지정](#타입-지정)
  - [아마데우스 api 사용](#아마데우스-api-사용)
  - [항공권 필터링](#항공권-필터링)
  - [좌석 배치도](#좌석-배치도)
  - [웹 접근성 고려](#웹-접근성-고려)
  - [캔버스](#캔버스)

- [🧡 팀원 소개](#-팀원-소개)

<br />

## ✍🏻 프로젝트 개요

### AI 심리상담, 감정분석을 통한 난임스트레스‧우울증 완화 솔루션

난임 인구 증가와 상담 수요 폭증에 대응해, 난임·우울증 상담센터를 모바일화하는 AI 심리케어 서비스를 개발했어요. 심리학 이론 기반의 전문 AI 상담과 감정분석, 부부동반 미션 추천 기능을 제공했어요. 이를 통해 상담센터의 접근성을 높여 우울증 개선 및 출산율 증가를 기대해요.

<br />

## 🏆 2024년 제6회 K-디지털 트레이닝 해커톤 장려상 수상

![kdt_wish](https://github.com/user-attachments/assets/91fe5654-4baf-423e-b328-61126fc0ae66)

<br />

## 🚀 핵심 기능

### 부부 연동 기능을 통해 배우자와 주간 미션을 함께 진행할 수 있어요.

> 사용자의 관심사를 토대로 AI가 추천한 부부동반 미션을 완료하고 배우자의 따뜻한 메시지를 확인할 수 있어요.

![image](https://github.com/user-attachments/assets/89cb616c-7a37-487f-aba8-ee703a10db15)

<br>

### 전문 상담사 '위시'와 언제든지 고민을 나눌 수 있어요.

> 인지행동치료를 기반으로 전문 상담사 '위시'가 난임 고민을 실시간으로 답변해요.

![image](https://github.com/user-attachments/assets/844152af-e2c6-4430-b9c2-966c5302097f)

<br>

### 난임스트레스 척도를 검사하고 결과를 확인할 수 있어요.

> 난임 스트레스 척도 검사를 해석하고, 이전 검사 결과와 비교하여 현재 상태를 점검할 수 있어요.

![image](https://github.com/user-attachments/assets/25ffeba5-1930-44e3-bb4d-1c66bc2e1e77)

<br>

### 사용자의 감정을 분석해 감정 분포와 난임스트레스 척도 점수를 예상할 수 있어요.

> 난임스트레스 척도 검사 결과와 사용자의 일일 감정을 분석하여 난임스트레스 척도 점수를 예상해요.

![image](https://github.com/user-attachments/assets/9ec69c15-ab0e-412f-b5c6-2c86086b7436)

<br />

## 💻 담당 기능

### 윤우중

**[ 회원가입 / 로그인 ]**

- Funnel 구조를 적용한 회원가입 기능 구현
- 유저 정보를 인증하는 데이터 validation 함수 구현
- 주민번호를 뒷자리를 활용한 성별을 자동으로 구분하는 로직 구현

**[ 메인페이지 데이터 시각화 ]**

- React-Query 캐싱을 통한 불 필요한 서버 호출 방지
- Echart를 활용한 부부데이터 시각화 구현
- 이번주 미션 데이터 시각화 구현

**[ 공톰 컴포넌트 구현 ]**

- 공통 버튼 컴포넌트 구현
- 공통 프로그레스바 컴포넌트 구현
- 공통 인풋 컴포넌트 구현

---

### 이경민

**[ AI 심리상담 가이드 ]**

- 심리 상담 효과를 높이기 위해 CSS로 직관적인 가이드 UI를 구현

**[ 난임스트레스 척도 검사 결과 시각화 ]**

- 난임 스트레스 데이터 사용자 친화적으로 시각화

**[ 공통 컴포넌트 구현 ]**

- 공통 타이틀 컴포넌트 구현

---

### 이소정

**[ AI 심리상담 ]**

- GPT-4o mini를 활용한 AI 프롬프팅을 통한 심리상담

**[ 난임스트레스 척도 목록 ]**

- 난임스트레스 목록 조회
- 난임스트레스 목록 차트 구현

**[ 난임스트레스 척도 테스트 ]**

- 4단계에 걸쳐 난임스트레스 척도 기능 구현
- GPT-4o mini를 활용한 난임스트레스 검사 기반 핵심신념 추출 <br>
  `핵심신념이란?` 인지행동치료에서 사용되는 사용자의 부정적인 사고를 유발하는 신념

---

### 전희선

**[ 디자인 총괄 ]**

- UXUI 디자인

**[ AI 프롬프팅 ]**

- GPT-o mini를 활용한 AI 프롬프팅
- 부부 관심사 기반 AI 미션 추천 기능 프롬프팅
- AI 일일 감정기록 기반 사용자감정 분석 기능 프롬프팅

**[ AI부부동반 미션 추천 ]**

- 부부 관심사 기반 AI 미션 추천 기능 페이지 구현

**[ AI감정분석 결과 데이터 시각화 ]**

- AI 감정분

---

### 정진욱

**[ 감정분석 ]**

- GPT-o mini를 활용한 AI 프롬프팅

**[ 관심사 등록 ]**

- 회원가입 시 사용자 관심사 등록

**[ 부부 연동 ]**

- 부부 아이디 연동

<br />

## ⚙️ 기술 스택

<table>
    <thead>
        <tr>
            <th>분류</th>
            <th>기술 스택</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td>
            <p>프론트엔드</p>
          </td>
          <td>
            <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=ffffff">
            <img src="https://img.shields.io/badge/react-61DAFB?logo=react&logoColor=333333">
            <img src="https://img.shields.io/badge/Reactquery-FF4154?logo=reactquery&logoColor=white">
            <img src="https://img.shields.io/badge/Emotion-d26ac2?logo=Emotion&logoColor=white">
          </td>
        </tr>
        <tr>
        <tr>
          <td>
            <p>상태관리</p>
          </td>
          <td>
            <img src="https://img.shields.io/badge/Zustand-000000?logo=Zustand&logoColor=ffffff">
          </td>
        </tr>
         <tr>
          <td>
            <p>AI 프롬프트</p>
          </td>
          <td>
            <img src="https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=ffffff">
          </td>
        </tr>
        <tr>
            <td>
                <p>패키지 매니저</p>
            </td>
            <td>
              <img src="https://img.shields.io/badge/npm-c12127?logo=npm&logoColor=ffffff">
            </td>
        </tr>
                <tr>
            <td>
                <p>배포</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white">
            </td>
        </tr>
        <tr>
            <td>
                <p>협업</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Notion-000000?logo=Notion">
                <img src="https://img.shields.io/badge/Figma-F24E1E?logo=Figma&logoColor=ffffff">
            </td>
        </tr>
    </tbody>
</table>

<br />

## 🏛️ 서비스 구조

### 플로우 차트

![flowchart](https://github.com/user-attachments/assets/3aeb2fc0-a1a2-4bc7-8ba0-a6900f5e2bbd)

<br />

## 🔎 FE 기술적 도전

</div>
</details>

<table>
    <thead>
        <tr>
            <th colspan="2">반응형</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td width="50%">
            <img alt="" src="https://github.com/user-attachments/assets/acec28cb-e0e9-4203-b0b3-752cf6fbe58f" width="100%" />
          </td>
          <td width="50%">
            <img alt="" src="https://github.com/user-attachments/assets/efa60a3e-97d3-4f5d-b3cd-2ddae76620fd" width="100%" />
          </td>
        </tr>
    </tbody>
</table>

### 타입 지정

- 오픈 마켓 api, 아마데우스 api 요청과 응답의 타입을 미리 지정하였습니다.
- 사용하는 api의 응답 데이터의 **depth가 깊고**, **양이 방대한** 상황에서 코드를 작성할 때부터 지정된 타입을 확인하여 **에러를 미연에 방지**하고, **효율적인 코드를 작성**할 수 있었습니다.
- 개발 전에 반복적으로 사용되는 데이터의 타입을 따로 지정 후 `extends`, `Pick`, `Omit` 등의 키워드를 활용하여 **확장성과 재사용성**을 높였습니다.

| 아마데우스 데이터                                                                                                 | 타입 지정                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="https://github.com/user-attachments/assets/17172682-64fc-456f-8afa-dc758ccb5f59" width="100%" /> | <img alt="" src="https://github.com/user-attachments/assets/8aa4cd7e-c458-43b7-9988-0bcc915279e6" width="100%" /> |

| 타입 자동 완성                                                                                                    | 타입 오류 방지                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="https://github.com/user-attachments/assets/3a231f03-6a71-4399-b669-cf1593e03aa3" width="100%" /> | <img alt="" src="https://github.com/user-attachments/assets/f76a75f5-e02a-46c4-a6ab-807d099f2325" width="100%" /> |

### 아마데우스 api 사용<br />

> 검색 조건을 <code>query</code> 에 담아 api를 호출하였습니다.

```ts
const fetchTicketSearch = async (query: string): Promise<OffersSearchData[]> => {
  let accessToken = await fetchAuth();

  const url = `${AMADEUS_API_SERVER}/v2/shopping/flight-offers?${query}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 0 },
    });

    if (res.status === 401) {
      accessToken = await fetchAuth();

      const reRes = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate: 0 },
      });

      const reResJson: OffersSearch = await reRes.json();

      if (!reResJson.meta) {
        throw new Error('검색에 실패했습니다.');
      }

      return reResJson.data;
    }

    const resJson: OffersSearch = await res.json();

    if (!resJson.meta) {
      throw new Error('검색에 실패했습니다.');
    }

    return resJson.data;
  } catch (e) {
    console.error(e);
    throw new Error('오류가 발생했습니다.');
  }
};
```

</div>
</details>

<br/>

<details>
<summary>항공편 상세 조회 (flight-offers-pricing)</summary>
<div markdown="1">

<br />

> **서버 액션**을 생성하여 사용자가 선택한 항공권에 대한 여정, 가격 등 상세 정보를 요청하였습니다.

```ts
const flightPriceAction = async (flightOffers: OffersSearchData): Promise<TravelerPricing[]> => {
  let accessToken = await fetchAuth();
  const url = `${AMADEUS_API_SERVER}/v1/shopping/flight-offers/pricing`;

  const request = {
    data: {
      type: 'flight-offers-pricing',
      flightOffers: [flightOffers],
    },
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-HTTP-Method-Override': 'GET',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(request),
    });

    if (res.status === 401) {
      accessToken = await fetchAuth();

      const reRes = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-HTTP-Method-Override': 'GET',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(flightOffers),
      });

      const reResJson: OffersPrice = await reRes.json();

      if (!reResJson.data) {
        throw new Error('에러가 발생했습니다.');
      }

      return reResJson.data.flightOffers[0].travelerPricings;
    }

    const resJson: OffersPrice = await res.json();
    if (!resJson.data) {
      throw new Error('에러가 발생했습니다.');
    }

    return resJson.data.flightOffers[0].travelerPricings;
  } catch (e) {
    console.error(e);
    throw new Error('오류가 발생했습니다.');
  }
};
```

</div>
</details>

<br/>

| 항공권 조회                                                                                                       | 항공권 상세                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="https://github.com/user-attachments/assets/0b2aa730-2869-487f-be0b-529154dff88e" width="100%" /> | <img alt="" src="https://github.com/user-attachments/assets/df33f284-6d7b-4387-a82f-6a7f50705625" width="100%" /> |

- 한계
  - self-service api의 경우 배포용 prod 버전에서는 예약 내역 생성, 실시간 좌석 배치도 불러오기 기능을 사용하기 위해 공급업체와 계약을 체결해야 하는 어려움이 있었습니다.
  - 따라서 test 계정으로 좌석 조회 api를 호출하여 seatmap 객체를 생성해두고 동적으로 좌석 배치도를 불러와 사용하였습니다.

| seatmap 데이터                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="https://github.com/user-attachments/assets/a79e3b9e-ae34-46e5-ac07-0f49e6e2137b" width="200" /> |

> useCallback hook으로 filter를 setting하는 함수를 메모이제이션하여 컴포넌트가 렌더링되더라도 **함수가 초기화되는 것을 방지**하였습니다.

```ts
const handleFilterChange = useCallback((newFilters: IFilterProps) => {
  setFilters((prevFilters) => ({
    ...prevFilters,
    ...newFilters,
  }));
}, []);
```

> filtering할 항목이 변경되면 기존 데이터 배열에서 `filter` 메서드를 이용하여 **조건에 맞는 항공편을 찾아 상태를 업데이트**하였습니다.

```ts
const applyFilters = () => {
  let newFilteredData = [...data];

  if (filters) {
    if (filters."필터") {
      const airlines = filters."필터";
      newFilteredData = newFilteredData.filter((offer) =>
        offer.itineraries.every((itinerary) =>
          itinerary.segments.every((segment) =>
            "비교 로직"
          )
        )
      );
    }
  }

  setFilteredData(newFilteredData);
}
```

</div>
</details>

| 항공권 필터링                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="https://github.com/user-attachments/assets/1710853d-dd7a-4993-81c9-aeac5965def6" width="100%" /> |

### 좌석 배치도

- 항공기 좌석 배열(예: 3-4-3, 2-3 등)과 날개 좌석, 비상구, 화장실, 갤리 등 시설 정보를 **동적으로 받아 좌석 배치도를 구현**하였습니다.
  - 기내 x, y 좌표를 사용해 정확한 위치를 시각적으로 배치하여 구체적인 레이아웃을 제공합니다.
- 탑승자의 좌석을 배열로 관리하였습니다.
  - 여러 탑승객이 선택한 좌석을 상태 값으로 관리하여 좌석을 취소하거나 재선택하여도 해당 탑승객에게 좌석이 반영되도록 구현하였습니다.

| 좌석배치도                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="https://github.com/user-attachments/assets/0f885725-e029-4d50-b05f-d3f66b35dd36" width="100%" /> |

### 웹 접근성 고려

- **헤딩 태그의 계층적 사용** 및 시맨틱 태그 사용을 통해 데이터를 그룹핑하여 전달력을 높였습니다.

<table>
    <thead>
        <tr>
            <th colspan="2">웹 접근성 고려</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td width="50%">
            <img alt="" src="https://github.com/user-attachments/assets/1f62e3c2-0deb-420d-91a4-e73f15ec7e78" width="100%" />
          </td>
          <td width="50%">
            <img alt="" src="https://github.com/user-attachments/assets/db9e8786-392a-4ff3-a583-e7fbf1fd05f6" width="100%" />
          </td>
        </tr>
    </tbody>
</table>

- 아코디언 컴포넌트에 `aria-controls`, `aria-expanded` 속성을 활용하여 **아코디언의 제어 상태를 스크린 리더기에서 확인**할 수 있도록 하였습니다.

### 캔버스

- 캔버스 한 획 지우기

  - 획을 그릴 때마다 배열에 담고, 한 획 지우기를 누르면 **마지막 획을 배열에서 제거**했습니다.
  - 남은 획들을 다시 캔버스에 그림으로서 한 획 지우기를 구현하였습니다.

- 캔버스에서 꾸민 영역을 티켓과 사진 두 가지로 분류해서 저장하였습니다.
  - 수정된 이미지가 삽입된 **티켓 전체를 파일로 저장**할 수 있습니다.
  - 수정한 이미지를 **구매 내역(order)에도 저장**하여 추후에도 확인이 가능하도록 구현했습니다.

<table>
    <thead>
        <tr>
            <th>한 획 지우기</th>
            <th>커스텀한 티켓 저장하기</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td width="50%">
            <img alt="" src="https://github.com/user-attachments/assets/6374cad8-a41a-4b4f-9eb8-a75f5de397af" width="100%" />
          </td>
          <td width="50%">
            <img alt="" src="https://github.com/user-attachments/assets/47ae71b7-503f-4b56-8b14-a6ffd639b088" width="100%" />
          </td>
        </tr>
    </tbody>
</table>

<br />

## 🧡 팀원 소개

|                                        정진욱(FE)                                         |                                        박가희(BE)                                         |                                        윤우중(FE)                                         |
| :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: |
| ![image](https://github.com/user-attachments/assets/183aef5b-f8e4-4081-ada7-db4bfadeee56) | ![image](https://github.com/user-attachments/assets/5910bc94-cd2d-404d-8a74-a524be668153) | ![image](https://github.com/user-attachments/assets/71b7af19-6b20-471c-abd0-1241eea97f19) |
|                        [@JWJung-99](https://github.com/JWJung-99)                         |                      [@godheezzang](https://github.com/godheezzang)                       |                     [@woojoung1217](https://github.com/woojoung1217)                      |

|                                        이경민(FE)                                         |                                        이소정(FE)                                         |                                                             전희선(FE)                                                             |
| :---------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------- | -------------------------------------------- |
| ![image](https://github.com/user-attachments/assets/73348a54-53be-4c41-ba72-bdd60d9d8077) | ![image](https://github.com/user-attachments/assets/b18eec6c-1efd-4188-b3cc-b990357e3da0) | ![image](https://github.com/user-attachments/assets/e674cd0c-8946-4dfd-b892-50ffb6b79637) [@kyungmim](https://github.com/kyungmim) | [@s0zzang](https://github.com/s0zzang) | [@HuiseonDev](https://github.com/HuiseonDev) |
