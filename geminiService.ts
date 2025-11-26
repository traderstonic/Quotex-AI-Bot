
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from './types';

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const analyzeChart = async (imageFile: File): Promise<AnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const imagePart = await fileToGenerativePart(imageFile);

  const prompt = `
  ACT AS "TITAN V2" - THE WORLD'S MOST SKEPTICAL AND PRECISE BINARY TRADING ALGORITHM.
  
  YOUR GOAL: ZERO LOSSES. 
  PHILOSOPHY: "IT IS BETTER TO MISS A TRADE THAN TO LOSE MONEY."

  Analyze the chart image to predict the NEXT 1 or 2 CANDLES.

  ### STEP 1: THE "DEVIL'S ADVOCATE" TEST (CRITICAL)
  Before issuing a signal, try to prove why the trade will FAIL.
  - Is the trend against us?
  - Is there a blocking key level nearby?
  - Is the candle size suspicious (too small/doji or too big/exhaustion)?
  
  IF YOU FIND *ANY* VALID REASON THE TRADE MIGHT FAIL, OUTPUT "NEUTRAL".

  ### STEP 2: CLASSIFICATION PROTOCOL

  #### TYPE A: "SNIPER" (NON-MTG) - 95% ACCURACY REQUIRED
  *Criteria (Must meet ALL):*
  1. **Perfect Trend Alignment**: Trade MUST be with the major trend.
  2. **Clean Breakout & Retest**: Price broke a level and is perfectly retesting it OR Price is rejecting a strong level with a large wick.
  3. **No Obstacles**: Next Support/Resistance is far away.
  *Output Logic:* Signal Type = 'NON_MTG'. Confidence = 96-100%.

  #### TYPE B: "FORTRESS" (1-STEP MTG) - HIGH PROBABILITY
  *Criteria:*
  1. **Strong Momentum**: Price is moving strongly but the last candle was a slight pause or small retracement.
  2. **Logic**: We expect the move to continue immediately, but if the next candle is a small pullback (error), the ONE AFTER THAT is guaranteed to follow the trend.
  *Direction:* MTG MUST ALWAYS BE IN THE SAME DIRECTION AS THE ORIGINAL SIGNAL.
  *Output Logic:* Signal Type = 'MTG_1_STEP'. Confidence = 88-95%.

  ### STEP 3: STRICT RULES
  1. **NEVER** signal 1-Step MTG on a Reversal trade. Reversals must be Sniper (Non-MTG) or nothing. MTG is only for Trend Following.
  2. **NEVER** trade in a chopping/sideways market. Return NEUTRAL.
  3. **NEVER** guess.

  ### STEP 4: GENERATE OUTPUT

  **mtgInstruction Field**:
  - If SignalType is 'NON_MTG': "DO NOT USE MARTINGALE. If trade loses, STOP. Wait for next signal."
  - If SignalType is 'MTG_1_STEP': "If the first trade loses, IMMEDIATELY place a [SIGNAL] trade again on the next candle (Double Investment)."
  - If Neutral: "No trade."

  **Logic Field**:
  - Explain *why* it passed the Devil's Advocate test.
  - E.g., "Trend is strong UP. Price rejected EMA 20. No resistance for 20 pips. Probability of green candle is 98%."

  EXTRACT METADATA:
  - Pair Name & Timeframe (e.g., EUR/USD M1).

  RETURN JSON ONLY.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, { text: prompt }] },
        config: {
            thinkingConfig: { thinkingBudget: 4096 }, // Increased thinking budget for deeper analysis
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    signal: { type: Type.STRING, enum: ['CALL', 'PUT', 'NEUTRAL'] },
                    signalType: { type: Type.STRING, enum: ['NON_MTG', 'MTG_1_STEP', 'N/A'] },
                    confidence: { type: Type.INTEGER },
                    trend: { type: Type.STRING, enum: ['UPTREND', 'DOWNTREND', 'SIDEWAYS'] },
                    support: { type: Type.STRING },
                    resistance: { type: Type.STRING },
                    logic: { type: Type.STRING },
                    previousCandlePower: { type: Type.STRING },
                    pair: { type: Type.STRING },
                    timeframe: { type: Type.STRING },
                    mtgInstruction: { type: Type.STRING },
                },
                required: ['signal', 'signalType', 'confidence', 'trend', 'support', 'resistance', 'logic', 'previousCandlePower', 'pair', 'timeframe', 'mtgInstruction'],
            },
        },
    });

    const resultText = response.text.trim();
    const resultJson = JSON.parse(resultText);
    return resultJson as AnalysisResult;
  } catch (error) {
    console.error("Error analyzing chart:", error);
    throw new Error("Analysis failed. Please ensure the image is clear and try again.");
  }
};
