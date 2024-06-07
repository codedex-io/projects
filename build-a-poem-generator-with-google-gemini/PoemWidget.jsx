import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function GptResponse() {
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchPoem = async () => {
    try {
      const genAI = new GoogleGenerativeAI('YOUR_API_KEY');
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = "write me a 10 word poem in the tone of milk and honey by rupi kaur.";
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setResponse(text);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchPoem(); // Fetch a poem on initial render

    const poemIntervalId = setInterval(fetchPoem, 30000); // Fetch a new poem every 30 seconds
    const clockIntervalId = setInterval(() => setCurrentTime(new Date()), 1000); // Update clock every second

    return () => {
      clearInterval(poemIntervalId); // Cleanup poem interval on component unmount
      clearInterval(clockIntervalId); // Cleanup clock interval on component unmount
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {error ? <p>{error}</p> : <p>{response}</p>}
      <div style={{ 
        position: 'fixed', 
        bottom: 0, 
        right: 0, 
        backgroundColor: 'white', 
        padding: '10px', 
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)'
      }}>
        {currentTime.toLocaleTimeString()}
      </div>
    </div>
  );
}

export default GptResponse;
