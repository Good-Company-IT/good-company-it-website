// Free assessment quiz (a separate site built and hosted by Good Company).
// The UTM tags are plain labels (no personal data) that tell the quiz and analytics where a visit came from.
const QUIZ_BASE_URL = 'https://quiz.goodcompanyit.com/';

// medium: 'exit_popup' (pop-up) or 'blog_banner' (box on the blog page)
export const quizUrl = (medium) =>
  `${QUIZ_BASE_URL}?utm_source=goodcompanyit&utm_medium=${medium}&utm_campaign=free_assessment`;
