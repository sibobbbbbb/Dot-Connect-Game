const saveScore = async (username, time, level, mode) => {
  try {
    const response = await fetch("http://localhost:5000/api/score/save-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, time, level, mode }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Score saved successfully:", data.message);
    } else {
      console.error("Failed to save score:", data.message);
    }
  } catch (error) {
    console.error("Error saving score:", error);
  }
};

export default saveScore;