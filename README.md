# 한양사이버대학교 4학년 졸업과제

프로젝트 이름은 **개냥이** 이며 강아지와 고양이를 분양하거나 받을 수 있는 서비스를 만드는 것이 목표입니다

## 서비스 기능 간단요약

> **주의**: 목표는 원대하게 잡았으나 시간이 촉박하다거나 개발할 내용이 너무 많아질 경우 기능이 축소 및 변경될 수 있습니다

![image](https://user-images.githubusercontent.com/78744312/193326481-508c47c7-2456-49c0-89b8-f589cd35c3f7.png)

주 기능은 강아지나 고양이를 분양하는 서비스 이고, 사진을 찍어 올리면 강아지 및 고양이 품종을 머신러닝 학습 된 모델을 이용하여 자동으로 분류해 주는 서비스 입니다. 앱은 일단 계획없고 웹 서비스 위주로 구현 될 예정입니다.

## 기술스택

- backend: nest js(with express)
(js가 주로 사용하는 언어이기도 하고 nest js에 스프링 냄새가 나는 아키텍쳐를 제공해 주는게 맘에 들어 선택했습니다)
- frontend: react(next.js)
(svelte나 vue도 생각 해 보았으나 react를 잘 안써봐서 이번 기회에 써보고자 선택했습니다)
- database: mariadb
(사실 저에겐 제일 익숙한 db이기도 하고 기간이 회사 일 때문에 시간을 많이 뺐겨 db까지 신경 쓸 여유가 없어 그냥 쓰던 거 쓰기로 했습니다 하하..)
- ML: 미정
(tensorflow랑 keras 둘 중 하나 쓰지 않을까 싶긴한데 아직 고민중)