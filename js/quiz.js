// js/quiz.js
import { toggleVisibility, tg } from './utils.js';

let currentQuestionIndex = 0;
let correctAnswers = 0;

export const initQuizLogic = () => {
    // Sahifa ochilganda boshlang'ich holatga qaytarish
    currentQuestionIndex = 0;
    correctAnswers = 0;
    toggleVisibility('quiz-intro-card', true);
    toggleVisibility('quiz-gameplay-card', false);
    toggleVisibility('quiz-result-card', false);
};

window.startWeeklyQuiz = () => {
    const attemptsEl = document.getElementById('quiz-attempts-count');
    let attempts = parseInt(attemptsEl.innerText);
    
    if (attempts <= 0) {
        tg.showAlert("Urinishlaringiz tugadi! Keyingi haftani kuting.");
        return;
    }

    // Urinishni bittaga kamaytirish (Frontend uchun, keyin bazada ham kamaytirasiz)
    attemptsEl.innerText = attempts - 1;
    
    toggleVisibility('quiz-intro-card', false);
    toggleVisibility('quiz-gameplay-card', true);
    
    loadNextQuestion();
};

const loadNextQuestion = () => {
    // Buni Firebase'dan kelgan massivga ulaysiz. Bu namuna.
    const mockQuestions = [
        { q: "Luffyniyng laqabi nima?", correct: "Mugiwara", options: ["Mugiwara", "Kaizoku", "Yonko", "Shichibukai"], anime: "One Piece" },
        // ... (jami 20 ta savol bo'ladi)
    ];

    if (currentQuestionIndex >= mockQuestions.length || currentQuestionIndex >= 20) {
        finishQuiz();
        return;
    }

    const qData = mockQuestions[currentQuestionIndex];
    document.getElementById('current-question-num').innerText = currentQuestionIndex + 1;
    document.getElementById('source-anime-name').innerText = qData.anime;
    document.getElementById('quiz-question-text').innerText = qData.q;
    document.getElementById('quiz-live-progress').style.width = `${((currentQuestionIndex + 1) / 20) * 100}%`;

    const optionsContainer = document.getElementById('quiz-options-container');
    optionsContainer.innerHTML = '';
    
    // Variantlarni aralashtirish va chizish
    qData.options.sort(() => Math.random() - 0.5).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerText = opt;
        btn.onclick = () => handleAnswer(opt === qData.correct);
        optionsContainer.appendChild(btn);
    });
};

const handleAnswer = (isCorrect) => {
    if (isCorrect) correctAnswers++;
    currentQuestionIndex++;
    loadNextQuestion();
};

const finishQuiz = () => {
    toggleVisibility('quiz-gameplay-card', false);
    toggleVisibility('quiz-result-card', true);
    
    document.getElementById('result-score-detail').innerText = `Siz 20 tadan ${correctAnswers} ta savolga to'g'ri javob berdingiz.`;
    
    if (correctAnswers >= 15) {
        document.getElementById('result-status-title').innerText = "Ajoyib Natija!";
        document.getElementById('reward-payout-box').classList.remove('hidden');
        document.getElementById('earned-coins-count').innerText = correctAnswers;
        // Coins qo'shish logikasi (coins.js) orqali chaqiriladi
    } else {
        document.getElementById('result-status-title').innerText = "Yomon emas, lekin...";
        document.getElementById('reward-payout-box').classList.add('hidden');
    }
};
