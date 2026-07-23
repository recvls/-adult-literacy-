export type Question = {
  id: string
  type: 'letter' | 'word' | 'mcq'
  prompt: string
  choices?: string[]
  answer: string
}

export type Lesson = {
  id: string
  title: string
  icon: string
  description: string
  questions: Question[]
}

export const lessons: Lesson[] = [
  {
    id: 'letters-1',
    title: '🔤 Letters: A - E',
    icon: '🔤',
    description: 'Practice the first letter sounds with simple prompts.',
    questions: [
      { id: 'q1', type: 'letter', prompt: 'Listen and type the letter for the sound: /æ/ (like in "cat")', answer: 'a' },
      { id: 'q2', type: 'letter', prompt: 'Listen and type the letter for the sound: /b/ (like in "ball")', answer: 'b' },
      { id: 'q3', type: 'mcq', prompt: 'Which letter matches the sound /k/ (like in "cat")?', choices: ['g', 'k', 'm', 'n'], answer: 'k' },
      { id: 'q4', type: 'letter', prompt: 'Listen and type the letter for the sound: /d/ (like in "dog")', answer: 'd' },
      { id: 'q5', type: 'mcq', prompt: 'Which letter matches the sound /e/ (like in "egg")?', choices: ['a', 'e', 'i', 'o'], answer: 'e' }
    ]
  },
  {
    id: 'letters-2',
    title: '🔤 Letters: F - J',
    icon: '🅵',
    description: 'Learn the next letters with listening and matching practice.',
    questions: [
      { id: 'q6', type: 'letter', prompt: 'Listen and type the letter for the sound: /f/ (like in "fish")', answer: 'f' },
      { id: 'q7', type: 'letter', prompt: 'Listen and type the letter for the sound: /g/ (like in "go")', answer: 'g' },
      { id: 'q8', type: 'mcq', prompt: 'Which letter matches the sound /h/ (like in "hat")?', choices: ['f', 'g', 'h', 'i'], answer: 'h' },
      { id: 'q9', type: 'letter', prompt: 'Listen and type the letter for the sound: /i/ (like in "it")', answer: 'i' },
      { id: 'q10', type: 'letter', prompt: 'Listen and type the letter for the sound: /j/ (like in "jump")', answer: 'j' }
    ]
  },
  {
    id: 'words-1',
    title: '🍎 Simple Words',
    icon: '🍎',
    description: 'Match everyday words to pictures and practice spelling.',
    questions: [
      { id: 'w1', type: 'word', prompt: 'Read and type this word: CAT', answer: 'cat' },
      { id: 'w2', type: 'mcq', prompt: 'Which word means a small pet that says "meow"?', choices: ['dog', 'cat', 'cow', 'fish'], answer: 'cat' },
      { id: 'w3', type: 'word', prompt: 'Read and type this word: DOG', answer: 'dog' },
      { id: 'w4', type: 'mcq', prompt: 'Which word is a round fruit?', choices: ['apple', 'bread', 'milk', 'water'], answer: 'apple' },
      { id: 'w5', type: 'word', prompt: 'Read and type this word: SUN', answer: 'sun' }
    ]
  },
  {
    id: 'words-2',
    title: '📚 Common Words',
    icon: '📚',
    description: 'Read and choose familiar words from the world around you.',
    questions: [
      { id: 'w6', type: 'word', prompt: 'Read and type this word: BOOK', answer: 'book' },
      { id: 'w7', type: 'mcq', prompt: 'Which word means a place where you sleep?', choices: ['room', 'bed', 'house', 'chair'], answer: 'bed' },
      { id: 'w8', type: 'word', prompt: 'Read and type this word: TREE', answer: 'tree' },
      { id: 'w9', type: 'mcq', prompt: 'Which word is a large animal?', choices: ['cat', 'bird', 'elephant', 'ant'], answer: 'elephant' },
      { id: 'w10', type: 'word', prompt: 'Read and type this word: HAND', answer: 'hand' }
    ]
  }
]
