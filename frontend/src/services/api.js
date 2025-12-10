const BASE_URL = "http://localhost:8000";

export const predictHeartDisease = async (data) => {
  const response = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Prediction API failed");
  }

  return await response.json();
};
