'use client';

import { useState } from 'react';

const lessons = {
  pets: {
    title: "Talking About Pets",
    vocabulary: {
      nouns: ["dog", "cat", "hamster", "rabbit", "fish", "bird", "guinea pig", "turtle"],
      verbs: ["feed", "walk", "play", "train", "groom", "adopt", "care for", "pet"],
      adjectives: ["fluffy", "friendly", "playful", "loyal", "cute", "energetic", "calm", "affectionate"]
    },
    conversations: [
      {
        id: 1,
        question: "Do you have any pets?",
        answers: [
          { text: "Yes, I have a fluffy cat.", correct: true, explanation: "Great! Uses noun (cat) and adjective (fluffy)." },
          { text: "Yes, I have cat fluffy.", correct: false, explanation: "Almost! Adjectives come BEFORE nouns in English: 'a fluffy cat'." },
          { text: "Yes, I having a cat.", correct: false, explanation: "Use 'have' not 'having' for possession." }
        ]
      },
      {
        id: 2,
        question: "What do you do with your pet?",
        answers: [
          { text: "I feed and walk my dog every day.", correct: true, explanation: "Perfect! Uses two verbs (feed, walk) correctly." },
          { text: "I feeding my dog every day.", correct: false, explanation: "Use 'feed' not 'feeding' in simple present." },
          { text: "I walks my dog every day.", correct: false, explanation: "Use 'walk' not 'walks' with 'I'." }
        ]
      },
      {
        id: 3,
        question: "What kind of pet would you like to adopt?",
        answers: [
          { text: "I'd like to adopt a playful puppy.", correct: true, explanation: "Excellent! Uses adjective (playful) + noun (puppy)." },
          { text: "I'd like adopting a puppy.", correct: false, explanation: "Use 'to adopt' not 'adopting' after 'would like'." },
          { text: "I'd like to adopt puppy playful.", correct: false, explanation: "Adjective comes before the noun: 'a playful puppy'." }
        ]
      }
    ]
  },
  animals: {
    title: "Talking About Wild Animals",
    vocabulary: {
      nouns: ["lion", "elephant", "monkey", "giraffe", "tiger", "bear", "wolf", "dolphin"],
      verbs: ["roar", "run", "swim", "hunt", "climb", "protect", "observe", "migrate"],
      adjectives: ["wild", "dangerous", "majestic", "fast", "strong", "intelligent", "graceful", "fierce"]
    },
    conversations: [
      {
        id: 1,
        question: "What's your favorite wild animal?",
        answers: [
          { text: "My favorite is the majestic elephant.", correct: true, explanation: "Perfect! Uses adjective (majestic) + noun (elephant)." },
          { text: "My favorite is elephant majestic.", correct: false, explanation: "Adjective goes before noun: 'majestic elephant'." },
          { text: "My favorite are the elephant.", correct: false, explanation: "Use 'is' not 'are' with singular noun." }
        ]
      },
      {
        id: 2,
        question: "What can dolphins do?",
        answers: [
          { text: "Dolphins can swim fast and jump high.", correct: true, explanation: "Great! Uses verbs (swim, jump) with adverbs." },
          { text: "Dolphins can swimming fast.", correct: false, explanation: "Use 'swim' not 'swimming' after 'can'." },
          { text: "Dolphins swims fast.", correct: false, explanation: "Use 'swim' not 'swims' with plural subject." }
        ]
      },
      {
        id: 3,
        question: "Which animal do you think is the most dangerous?",
        answers: [
          { text: "I think the fierce tiger is very dangerous.", correct: true, explanation: "Excellent! Uses adjective (fierce) and superlative correctly." },
          { text: "I think tiger fierce is dangerous.", correct: false, explanation: "Adjective before noun: 'fierce tiger'." },
          { text: "I thinking the tiger is dangerous.", correct: false, explanation: "Use 'think' not 'thinking' in simple present." }
        ]
      }
    ]
  },
  sports: {
    title: "Talking About Sports",
    vocabulary: {
      nouns: ["soccer", "basketball", "tennis", "swimming", "volleyball", "baseball", "hockey", "athlete"],
      verbs: ["play", "practice", "compete", "train", "score", "win", "lose", "exercise"],
      adjectives: ["competitive", "athletic", "active", "skillful", "professional", "challenging", "exciting", "talented"]
    },
    conversations: [
      {
        id: 1,
        question: "What sports do you play?",
        answers: [
          { text: "I play competitive soccer every weekend.", correct: true, explanation: "Perfect! Uses verb (play) + adjective (competitive) + noun (soccer)." },
          { text: "I playing soccer every weekend.", correct: false, explanation: "Use 'play' not 'playing' in simple present." },
          { text: "I plays soccer every weekend.", correct: false, explanation: "Use 'play' not 'plays' with 'I'." }
        ]
      },
      {
        id: 2,
        question: "How often do you practice?",
        answers: [
          { text: "I practice basketball three times a week.", correct: true, explanation: "Great! Uses verb (practice) correctly with frequency." },
          { text: "I am practice basketball three times.", correct: false, explanation: "Use 'practice' not 'am practice'." },
          { text: "I practices every day.", correct: false, explanation: "Use 'practice' not 'practices' with 'I'." }
        ]
      },
      {
        id: 3,
        question: "What kind of athlete do you admire?",
        answers: [
          { text: "I admire talented and dedicated athletes.", correct: true, explanation: "Excellent! Uses two adjectives (talented, dedicated) correctly." },
          { text: "I admiring talented athletes.", correct: false, explanation: "Use 'admire' not 'admiring' in simple present." },
          { text: "I admire athletes talented.", correct: false, explanation: "Adjectives come before nouns: 'talented athletes'." }
        ]
      }
    ]
  }
};

export default function Home() {
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showVocabulary, setShowVocabulary] = useState(false);

  const handleTopicSelect = (topic) => {
    setCurrentTopic(topic);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setTotalAnswered(0);
    setShowVocabulary(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showExplanation) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const isCorrect = lessons[currentTopic].conversations[currentQuestion].answers[answerIndex].correct;
    if (isCorrect) {
      setScore(score + 1);
    }
    setTotalAnswered(totalAnswered + 1);
  };

  const handleNext = () => {
    if (currentQuestion < lessons[currentTopic].conversations.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Lesson complete
      alert(`Lesson Complete! Your score: ${score + 1}/${totalAnswered + 1}`);
    }
  };

  const handleBack = () => {
    setCurrentTopic(null);
    setShowVocabulary(false);
  };

  if (!currentTopic) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>ESL Conversation Course</h1>
          <p style={styles.subtitle}>Grade 10 - Everyday Conversations</p>
        </div>

        <div style={styles.topicsGrid}>
          <div style={styles.topicCard} onClick={() => handleTopicSelect('pets')}>
            <div style={styles.topicIcon}>🐕</div>
            <h2 style={styles.topicTitle}>Pets</h2>
            <p style={styles.topicDescription}>Learn to talk about pets and pet care</p>
          </div>

          <div style={styles.topicCard} onClick={() => handleTopicSelect('animals')}>
            <div style={styles.topicIcon}>🦁</div>
            <h2 style={styles.topicTitle}>Wild Animals</h2>
            <p style={styles.topicDescription}>Discuss wild animals and nature</p>
          </div>

          <div style={styles.topicCard} onClick={() => handleTopicSelect('sports')}>
            <div style={styles.topicIcon}>⚽</div>
            <h2 style={styles.topicTitle}>Sports</h2>
            <p style={styles.topicDescription}>Talk about sports and activities</p>
          </div>
        </div>

        <div style={styles.footer}>
          <p>Click on a topic to start learning!</p>
        </div>
      </div>
    );
  }

  const lesson = lessons[currentTopic];
  const conversation = lesson.conversations[currentQuestion];

  if (showVocabulary) {
    return (
      <div style={styles.container}>
        <button style={styles.backButton} onClick={() => setShowVocabulary(false)}>
          ← Back to Lesson
        </button>

        <div style={styles.vocabContainer}>
          <h1 style={styles.vocabTitle}>{lesson.title} - Vocabulary</h1>

          <div style={styles.vocabSection}>
            <h2 style={styles.vocabHeading}>📝 Nouns (Things/People)</h2>
            <div style={styles.vocabList}>
              {lesson.vocabulary.nouns.map((word, i) => (
                <span key={i} style={styles.vocabBadge}>{word}</span>
              ))}
            </div>
          </div>

          <div style={styles.vocabSection}>
            <h2 style={styles.vocabHeading}>🏃 Verbs (Actions)</h2>
            <div style={styles.vocabList}>
              {lesson.vocabulary.verbs.map((word, i) => (
                <span key={i} style={styles.vocabBadge}>{word}</span>
              ))}
            </div>
          </div>

          <div style={styles.vocabSection}>
            <h2 style={styles.vocabHeading}>✨ Adjectives (Descriptions)</h2>
            <div style={styles.vocabList}>
              {lesson.vocabulary.adjectives.map((word, i) => (
                <span key={i} style={styles.vocabBadge}>{word}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.lessonHeader}>
        <button style={styles.backButton} onClick={handleBack}>
          ← Back to Topics
        </button>
        <button style={styles.vocabButton} onClick={() => setShowVocabulary(true)}>
          📚 View Vocabulary
        </button>
      </div>

      <div style={styles.lessonCard}>
        <div style={styles.progressBar}>
          <div style={styles.progress}>
            Question {currentQuestion + 1} of {lesson.conversations.length}
          </div>
          <div style={styles.scoreDisplay}>
            Score: {score}/{totalAnswered}
          </div>
        </div>

        <h2 style={styles.lessonTitle}>{lesson.title}</h2>

        <div style={styles.questionBox}>
          <p style={styles.questionLabel}>Question:</p>
          <h3 style={styles.questionText}>{conversation.question}</h3>
        </div>

        <div style={styles.answersContainer}>
          <p style={styles.answersLabel}>Choose the correct answer:</p>
          {conversation.answers.map((answer, index) => (
            <button
              key={index}
              style={{
                ...styles.answerButton,
                ...(selectedAnswer === index && answer.correct ? styles.answerCorrect : {}),
                ...(selectedAnswer === index && !answer.correct ? styles.answerIncorrect : {}),
                ...(showExplanation && answer.correct ? styles.answerCorrectShow : {})
              }}
              onClick={() => handleAnswerSelect(index)}
              disabled={showExplanation}
            >
              {answer.text}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div style={{
            ...styles.explanation,
            ...(conversation.answers[selectedAnswer].correct ? styles.explanationCorrect : styles.explanationIncorrect)
          }}>
            <p style={styles.explanationTitle}>
              {conversation.answers[selectedAnswer].correct ? '✓ Correct!' : '✗ Not quite right'}
            </p>
            <p style={styles.explanationText}>
              {conversation.answers[selectedAnswer].explanation}
            </p>
            <button style={styles.nextButton} onClick={handleNext}>
              {currentQuestion < lesson.conversations.length - 1 ? 'Next Question →' : 'Finish Lesson'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    color: 'white',
    marginBottom: '40px',
    paddingTop: '20px',
  },
  title: {
    fontSize: '48px',
    margin: '0 0 10px 0',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '20px',
    margin: 0,
    opacity: 0.9,
  },
  topicsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  topicCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },
  topicIcon: {
    fontSize: '80px',
    marginBottom: '20px',
  },
  topicTitle: {
    fontSize: '28px',
    margin: '0 0 10px 0',
    color: '#333',
  },
  topicDescription: {
    fontSize: '16px',
    color: '#666',
    margin: 0,
  },
  footer: {
    textAlign: 'center',
    color: 'white',
    marginTop: '40px',
    fontSize: '18px',
  },
  lessonHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '800px',
    margin: '0 auto 20px',
  },
  backButton: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  vocabButton: {
    background: 'rgba(255,255,255,0.9)',
    color: '#667eea',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  lessonCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
  },
  progressBar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    fontSize: '16px',
    color: '#666',
  },
  progress: {
    fontWeight: 'bold',
  },
  scoreDisplay: {
    fontWeight: 'bold',
    color: '#667eea',
  },
  lessonTitle: {
    fontSize: '32px',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center',
  },
  questionBox: {
    background: '#f8f9ff',
    padding: '30px',
    borderRadius: '15px',
    marginBottom: '30px',
    borderLeft: '5px solid #667eea',
  },
  questionLabel: {
    fontSize: '14px',
    color: '#667eea',
    margin: '0 0 10px 0',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  questionText: {
    fontSize: '24px',
    color: '#333',
    margin: 0,
  },
  answersContainer: {
    marginBottom: '20px',
  },
  answersLabel: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '15px',
  },
  answerButton: {
    width: '100%',
    padding: '20px',
    marginBottom: '15px',
    fontSize: '18px',
    background: '#f8f9ff',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.3s',
  },
  answerCorrect: {
    background: '#d4edda',
    borderColor: '#28a745',
  },
  answerIncorrect: {
    background: '#f8d7da',
    borderColor: '#dc3545',
  },
  answerCorrectShow: {
    background: '#d4edda',
    borderColor: '#28a745',
    fontWeight: 'bold',
  },
  explanation: {
    padding: '25px',
    borderRadius: '12px',
    marginTop: '20px',
  },
  explanationCorrect: {
    background: '#d4edda',
    border: '2px solid #28a745',
  },
  explanationIncorrect: {
    background: '#f8d7da',
    border: '2px solid #dc3545',
  },
  explanationTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: '10px',
  },
  explanationText: {
    fontSize: '16px',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  nextButton: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '10px',
    fontSize: '18px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
  },
  vocabContainer: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '900px',
    margin: '0 auto',
    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
  },
  vocabTitle: {
    fontSize: '32px',
    color: '#333',
    marginBottom: '30px',
    textAlign: 'center',
  },
  vocabSection: {
    marginBottom: '30px',
  },
  vocabHeading: {
    fontSize: '24px',
    color: '#667eea',
    marginBottom: '15px',
  },
  vocabList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  vocabBadge: {
    background: '#f8f9ff',
    padding: '10px 20px',
    borderRadius: '25px',
    fontSize: '16px',
    color: '#333',
    border: '2px solid #667eea',
  },
};
