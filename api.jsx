export const fetchQuizData = async () => {
    try {
      const response = await fetch("/api/proxy"); // Using Vite proxy
      if (!response.ok) {
        throw new Error("Failed to fetch quiz data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      return [];
    }
  };
  