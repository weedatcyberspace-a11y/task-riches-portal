import { Task } from '@/types/user';

export const taskCategories = [
  'General Knowledge',
  'Technology',
  'Science',
  'Mathematics',
  'History',
  'Geography',
  'Sports',
  'Entertainment',
  'Business',
  'Literature'
];

export const generateTasks = (): Task[] => {
  const tasks: Task[] = [
    // General Knowledge
    {
      id: '1',
      category: 'General Knowledge',
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 2,
      reward: 0.50,
      difficulty: 'easy'
    },
    {
      id: '2',
      category: 'General Knowledge',
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 1,
      reward: 0.75,
      difficulty: 'easy'
    },
    {
      id: '3',
      category: 'General Knowledge',
      question: 'Who painted the Mona Lisa?',
      options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
      correctAnswer: 2,
      reward: 1.00,
      difficulty: 'medium'
    },
    
    // Technology
    {
      id: '4',
      category: 'Technology',
      question: 'What does "HTTP" stand for?',
      options: ['HyperText Transfer Protocol', 'High Tech Transfer Process', 'Home Tool Transfer Protocol', 'Hyper Tech Transport Protocol'],
      correctAnswer: 0,
      reward: 1.25,
      difficulty: 'medium'
    },
    {
      id: '5',
      category: 'Technology',
      question: 'Which company developed the iPhone?',
      options: ['Samsung', 'Google', 'Apple', 'Microsoft'],
      correctAnswer: 2,
      reward: 0.50,
      difficulty: 'easy'
    },
    {
      id: '6',
      category: 'Technology',
      question: 'What is the most popular programming language in 2024?',
      options: ['Python', 'JavaScript', 'Java', 'C++'],
      correctAnswer: 1,
      reward: 1.50,
      difficulty: 'medium'
    },

    // Science
    {
      id: '7',
      category: 'Science',
      question: 'What is the chemical symbol for gold?',
      options: ['Go', 'Gd', 'Au', 'Ag'],
      correctAnswer: 2,
      reward: 1.00,
      difficulty: 'medium'
    },
    {
      id: '8',
      category: 'Science',
      question: 'How many bones are in an adult human body?',
      options: ['196', '206', '216', '226'],
      correctAnswer: 1,
      reward: 1.75,
      difficulty: 'hard'
    },
    {
      id: '9',
      category: 'Science',
      question: 'What gas do plants absorb from the atmosphere?',
      options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
      correctAnswer: 2,
      reward: 0.75,
      difficulty: 'easy'
    },

    // Mathematics
    {
      id: '10',
      category: 'Mathematics',
      question: 'What is 15% of 200?',
      options: ['25', '30', '35', '40'],
      correctAnswer: 1,
      reward: 1.00,
      difficulty: 'medium'
    },
    {
      id: '11',
      category: 'Mathematics',
      question: 'What is the square root of 144?',
      options: ['11', '12', '13', '14'],
      correctAnswer: 1,
      reward: 0.75,
      difficulty: 'easy'
    },
    {
      id: '12',
      category: 'Mathematics',
      question: 'If x + 5 = 12, what is x?',
      options: ['6', '7', '8', '9'],
      correctAnswer: 1,
      reward: 1.25,
      difficulty: 'medium'
    },

    // History
    {
      id: '13',
      category: 'History',
      question: 'In which year did World War II end?',
      options: ['1944', '1945', '1946', '1947'],
      correctAnswer: 1,
      reward: 1.00,
      difficulty: 'medium'
    },
    {
      id: '14',
      category: 'History',
      question: 'Who was the first President of the United States?',
      options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin'],
      correctAnswer: 2,
      reward: 0.75,
      difficulty: 'easy'
    },
    {
      id: '15',
      category: 'History',
      question: 'Which ancient wonder of the world was located in Alexandria?',
      options: ['Hanging Gardens', 'Colossus of Rhodes', 'Lighthouse of Alexandria', 'Temple of Artemis'],
      correctAnswer: 2,
      reward: 2.00,
      difficulty: 'hard'
    },

    // Geography
    {
      id: '16',
      category: 'Geography',
      question: 'What is the longest river in the world?',
      options: ['Amazon River', 'Nile River', 'Mississippi River', 'Yangtze River'],
      correctAnswer: 1,
      reward: 1.25,
      difficulty: 'medium'
    },
    {
      id: '17',
      category: 'Geography',
      question: 'How many continents are there?',
      options: ['5', '6', '7', '8'],
      correctAnswer: 2,
      reward: 0.50,
      difficulty: 'easy'
    },
    {
      id: '18',
      category: 'Geography',
      question: 'Which country has the most time zones?',
      options: ['Russia', 'USA', 'China', 'Canada'],
      correctAnswer: 0,
      reward: 1.75,
      difficulty: 'hard'
    },

    // Sports
    {
      id: '19',
      category: 'Sports',
      question: 'How often are the Summer Olympic Games held?',
      options: ['Every 2 years', 'Every 3 years', 'Every 4 years', 'Every 5 years'],
      correctAnswer: 2,
      reward: 0.75,
      difficulty: 'easy'
    },
    {
      id: '20',
      category: 'Sports',
      question: 'In which sport would you perform a slam dunk?',
      options: ['Tennis', 'Basketball', 'Volleyball', 'Baseball'],
      correctAnswer: 1,
      reward: 0.50,
      difficulty: 'easy'
    },
    {
      id: '21',
      category: 'Sports',
      question: 'Who holds the record for most goals in FIFA World Cup history?',
      options: ['Pelé', 'Diego Maradona', 'Miroslav Klose', 'Ronaldo'],
      correctAnswer: 2,
      reward: 2.25,
      difficulty: 'hard'
    },

    // Entertainment
    {
      id: '22',
      category: 'Entertainment',
      question: 'Which movie won the Academy Award for Best Picture in 2023?',
      options: ['Top Gun: Maverick', 'Avatar: The Way of Water', 'Everything Everywhere All at Once', 'The Banshees of Inisherin'],
      correctAnswer: 2,
      reward: 1.50,
      difficulty: 'medium'
    },
    {
      id: '23',
      category: 'Entertainment',
      question: 'How many strings does a standard guitar have?',
      options: ['4', '5', '6', '7'],
      correctAnswer: 2,
      reward: 0.75,
      difficulty: 'easy'
    },
    {
      id: '24',
      category: 'Entertainment',
      question: 'Which streaming platform created "Stranger Things"?',
      options: ['Disney+', 'Netflix', 'Amazon Prime', 'Hulu'],
      correctAnswer: 1,
      reward: 1.00,
      difficulty: 'medium'
    },

    // Business
    {
      id: '25',
      category: 'Business',
      question: 'What does "CEO" stand for?',
      options: ['Chief Executive Officer', 'Central Executive Officer', 'Corporate Executive Officer', 'Chief Executive Operations'],
      correctAnswer: 0,
      reward: 0.75,
      difficulty: 'easy'
    },
    {
      id: '26',
      category: 'Business',
      question: 'Which company is known for the slogan "Just Do It"?',
      options: ['Adidas', 'Puma', 'Nike', 'Reebok'],
      correctAnswer: 2,
      reward: 1.00,
      difficulty: 'medium'
    },
    {
      id: '27',
      category: 'Business',
      question: 'What is the largest company by market capitalization as of 2024?',
      options: ['Apple', 'Microsoft', 'Amazon', 'Google'],
      correctAnswer: 0,
      reward: 1.75,
      difficulty: 'hard'
    },

    // Literature
    {
      id: '28',
      category: 'Literature',
      question: 'Who wrote "Romeo and Juliet"?',
      options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
      correctAnswer: 1,
      reward: 0.75,
      difficulty: 'easy'
    },
    {
      id: '29',
      category: 'Literature',
      question: 'In which novel would you find the character Atticus Finch?',
      options: ['1984', 'To Kill a Mockingbird', 'The Great Gatsby', 'Pride and Prejudice'],
      correctAnswer: 1,
      reward: 1.50,
      difficulty: 'medium'
    },
    {
      id: '30',
      category: 'Literature',
      question: 'Who wrote "One Hundred Years of Solitude"?',
      options: ['Jorge Luis Borges', 'Gabriel García Márquez', 'Mario Vargas Llosa', 'Isabel Allende'],
      correctAnswer: 1,
      reward: 2.00,
      difficulty: 'hard'
    }
  ];

  // Shuffle and add more variety
  return [...tasks, ...generateAdditionalTasks()];
};

const generateAdditionalTasks = (): Task[] => {
  const additionalTasks: Task[] = [];
  const categories = taskCategories;
  
  // Generate more questions to keep the pool fresh
  for (let i = 31; i <= 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const baseReward = difficulty === 'easy' ? 0.5 : difficulty === 'medium' ? 1.0 : 1.5;
    const reward = baseReward + (Math.random() * 0.75);

    additionalTasks.push({
      id: i.toString(),
      category,
      question: getRandomQuestion(category),
      options: getRandomOptions(category),
      correctAnswer: Math.floor(Math.random() * 4),
      reward: Math.round(reward * 100) / 100,
      difficulty
    });
  }
  
  return additionalTasks;
};

const getRandomQuestion = (category: string): string => {
  const questions: Record<string, string[]> = {
    'General Knowledge': [
      'What is the smallest country in the world?',
      'Which ocean is the largest?',
      'What is the hardest natural substance?',
      'How many sides does a hexagon have?',
      'What is the largest mammal?'
    ],
    'Technology': [
      'What does "AI" stand for?',
      'Which company owns Android?',
      'What is cloud computing?',
      'When was the first iPhone released?',
      'What does "URL" stand for?'
    ],
    'Science': [
      'What is the speed of light?',
      'How many chambers does a human heart have?',
      'What is photosynthesis?',
      'Which element has the symbol "O"?',
      'What is the largest organ in the human body?'
    ]
  };
  
  const categoryQuestions = questions[category] || questions['General Knowledge'];
  return categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
};

const getRandomOptions = (category: string): string[] => {
  const optionSets = [
    ['Option A', 'Option B', 'Option C', 'Option D'],
    ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
    ['Answer A', 'Answer B', 'Answer C', 'Answer D'],
    ['First', 'Second', 'Third', 'Fourth']
  ];
  
  return optionSets[Math.floor(Math.random() * optionSets.length)];
};
