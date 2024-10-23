const questions = [
    { answers: ['23', '8', '6'] }, // 첫 번째 질문: 이봉창이 던진 폭탄
    { answers: ['31', '빨간'] },   // 두 번째 질문: 유관순 일기
    { answers: ['1216'] },          // 세 번째 질문: 옷 주머니에 소지품 확인
    { answers: ['하얼빈의거'] },  // 네 번째 질문: 안중근 의사의 사건
    // 다섯 번째 질문은 정답 입력이 없으므로 생략
];

const hints = [
    "힌트: (첫번째 칸 숫자는 두자리)", // 첫 번째 질문 힌트
    "힌트: (밀랍인형을 자르면...)",      // 두 번째 질문 힌트
    "힌트: (소지품을 다시 확인해 보세요.)",  // 세 번째 질문 힌트
    "힌트: (안중근 의사의 사형선고를 받은 달은 2월 이었다.)", // 네 번째 질문 힌트
    // 다섯 번째 질문은 힌트가 필요하지 않음
];

let currentQuestion = 1;

function checkAnswer(questionNumber) {
    const inputs = document.querySelectorAll(`#question${questionNumber} .answer-input`);
    const resultElement = document.getElementById('result');
    const hintElement = document.getElementById('hint');
    const popup = document.getElementById('popup');

    let isCorrect = true;
    if (questionNumber !== 5) { // 5번째 질문은 정답 입력이 없음
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value !== questions[questionNumber - 1].answers[i]) {
                isCorrect = false;
                break;
            }
        }
    }

    if (isCorrect || questionNumber === 5) {
        resultElement.textContent = "정답";
        resultElement.style.color = "green";
        hintElement.textContent = "";
    } else {
        resultElement.textContent = "오답";
        resultElement.style.color = "red";
        hintElement.textContent = hints[questionNumber - 1];
    }

    popup.style.display = 'block';
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';

    const resultText = document.getElementById('result').textContent;

    if (resultText === "정답" || currentQuestion === 5) {
        if (currentQuestion < 5) {
            document.getElementById(`question${currentQuestion}`).style.display = 'none';
            currentQuestion++;
            document.getElementById(`question${currentQuestion}`).style.display = 'block';
        } else {
            goToQuestion(1); // 마지막 문제 확인 후 첫 번째 문제로 이동
        }
    }

    resetForm();
}

function goToQuestion(questionNumber) {
    const selectionPopup = document.getElementById('selection-popup');
    selectionPopup.style.display = 'none';

    document.getElementById(`question${currentQuestion}`).style.display = 'none';
    currentQuestion = questionNumber;
    document.getElementById(`question${currentQuestion}`).style.display = 'block';
}

function resetForm() {
    for (let i = 1; i <= 5; i++) {
        const inputs = document.querySelectorAll(`#question${i} .answer-input`);
        inputs.forEach(input => input.value = '');
    }
    document.getElementById('hint').textContent = '';
}
