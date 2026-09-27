# Dooyoung & Selin

모바일 청첩장의 기본 사이트입니다. 현재는 준비 중 안내만 표시합니다.

- 대표 주소: https://dooyoungselin.com/
- 저장소: https://github.com/dooyoungselin/dooyoungselin.github.io
- 호스팅: GitHub Pages, `main` 브랜치의 `/ (root)`
- 도메인 및 DNS 관리: Spaceship
- 별도 패키지 설치나 빌드 없이 HTML을 그대로 배포합니다.

## 파일

- `index.html`: 모바일 대응 준비 중 페이지
- `.nojekyll`: Jekyll 처리 없이 정적 파일 배포
- `CNAME`: GitHub Pages에서 Custom domain을 저장할 때 생성하는 도메인 설정

`main`에 변경 사항을 올리면 GitHub Pages가 자동 배포합니다.
처음 연결할 때 저장소 Settings → Pages에서 배포 브랜치를 선택합니다.

## DNS 목표값

| 유형 | 호스트 | 값 |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | dooyoungselin.github.io |
| TXT | _github-pages-challenge-dooyoungselin | GitHub 계정 Settings → Pages에서 발급한 값 |

Custom domain은 `dooyoungselin.com`으로 설정합니다. DNS 확인과 인증서 발급이 완료되면 Enforce HTTPS를 켭니다.
GitHub의 도메인 소유권 확인에 사용한 TXT 레코드는 유지합니다.

## 운영 메모

GitHub Free의 Pages는 공개 저장소를 사용합니다. 이 저장소의 파일과 커밋 기록은 공개됩니다.
현재 페이지의 `noindex`는 검색 제외 요청이며 접근 제한이나 비밀번호 보호가 아닙니다.
향후 RSVP 응답은 이 저장소에 저장하지 않고 별도 폼/백엔드에서 처리합니다.

## 공식 문서

- [GitHub Pages 생성](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Custom domain 연결](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [도메인 소유권 확인](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
