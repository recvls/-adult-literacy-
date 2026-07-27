export type Question = {
  id: string
  type: 'letter' | 'word' | 'mcq'
  prompt: string
  speech?: string
  choices?: string[]
  answer: string
}

export type Lesson = {
  id: string
  title: string
  category: 'Letters' | 'Words'
  difficulty: 'Beginner' | 'Intermediate'
  estimatedTime: string
  xp: number
  questions: Question[]
}

export const lessons: Lesson[] = [
  
    {
  id: 'letters-1',
  title: '🔤 Letters: A - E',
  category: 'Letters',
  difficulty: 'Beginner',
  estimatedTime: '3 min',
  xp: 20,
  questions: [
      {
  id: 'q1',
  type: 'letter',
  prompt: 'Listen carefully and type the letter you hear.',
  speech: 'The letter A',
  answer: 'a'
},
{
  id: 'q2',
  type: 'letter',
  prompt: 'Listen carefully and type the letter you hear.',
  speech: 'The letter B',
  answer: 'b'
},
{
  id: 'q3',
  type: 'mcq',
  prompt: 'Which letter matches the sound you hear?',
  speech: 'The letter K',
  choices: ['g', 'k', 'm', 'n'],
  answer: 'k'
},
{
  id: 'q4',
  type: 'letter',
  prompt: 'Listen carefully and type the letter you hear.',
  speech: 'The letter D',
  answer: 'd'
},
{
  id: 'q5',
  type: 'mcq',
  prompt: 'Which letter matches the sound you hear?',
  speech: 'The letter E',
  choices: ['a', 'e', 'i', 'o'],
  answer: 'e'
},

    ]
  },
  
    {
  id: 'letters-2',
  title: '🔤 Letters: F - J',
  category: 'Letters',
  difficulty: 'Beginner',
  estimatedTime: '3 min',
  xp: 20,
  questions: [
      {
  id: 'q6',
  type: 'letter',
  prompt: 'Listen carefully and type the letter you hear.',
  speech: 'The letter F',
  answer: 'f'
},
{
  id: 'q7',
  type: 'letter',
  prompt: 'Listen carefully and type the letter you hear.',
  speech: 'The letter G',
  answer: 'g'
},
{
  id: 'q8',
  type: 'mcq',
  prompt: 'Which letter matches the sound you hear?',
  speech: 'The letter H',
  choices: ['f', 'g', 'h', 'i'],
  answer: 'h'
},
{
  id: 'q9',
  type: 'letter',
  prompt: 'Listen carefully and type the letter you hear.',
  speech: 'The letter I',
  answer: 'i'
},
{
  id: 'q10',
  type: 'letter',
  prompt: 'Listen carefully and type the letter you hear.',
  speech: 'The letter J',
  answer: 'j'
}
    ]
  },
  
    {
  id: 'words-1',
  title: '📖 Simple Words',
  category: 'Words',
  difficulty: 'Beginner',
  estimatedTime: '4 min',
  xp: 30,
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
  title: '📖 Common Words',
  category: 'Words',
  difficulty: 'Intermediate',
  estimatedTime: '5 min',
  xp: 40,
  questions: [
      { id: 'w6', type: 'word', prompt: 'Read and type this word: BOOK', answer: 'book' },
      { id: 'w7', type: 'mcq', prompt: 'Which word means a place where you sleep?', choices: ['room', 'bed', 'house', 'chair'], answer: 'bed' },
      { id: 'w8', type: 'word', prompt: 'Read and type this word: TREE', answer: 'tree' },
      { id: 'w9', type: 'mcq', prompt: 'Which word is a large animal?', choices: ['cat', 'bird', 'elephant', 'ant'], answer: 'elephant' },
      { id: 'w10', type: 'word', prompt: 'Read and type this word: HAND', answer: 'hand' }
    ]
  }
]
