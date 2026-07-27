export function getTutorResponse(
  question: string,
  lessonTitle: string,
  learnerAnswer: string
): string {

  const q = question.toLowerCase();

  // Letter A
  if (q.includes("letter a") || q === "a" || q.includes("what does a mean")) {
    return "The letter A is the first letter of the English alphabet. It can make the short sound /a/ as in 'apple' and the long sound /ay/ as in 'ape'.";
  }

  // Letter B
  if (q.includes("letter b") || q === "b") {
    return "The letter B is the second letter. It makes the /b/ sound as in 'ball', 'bat', and 'banana'.";
  }

  // Practice
  if (q.includes("example")) {
    return "Let's practice! Try saying: Apple, Ant, Ball, Book, Cat.";
  }

  // Wrong answer
  if (
    q.includes("wrong") ||
    q.includes("incorrect") ||
    q.includes("help")
  ) {
    return "That's okay! Listen carefully to the question again and think before answering. Learning takes practice.";
  }

  // Meaning
  if (q.includes("what") || q.includes("meaning")) {
    return `Let's learn together. This lesson is about ${lessonTitle}. Read the question carefully and listen to it again if needed.`;
  }

  return "Great question! Keep practicing. You can ask me about letters, words, pronunciation, or for more examples.";
}