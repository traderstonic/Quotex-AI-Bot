
export enum Signal {
  CALL = 'CALL',
  PUT = 'PUT',
  NEUTRAL = 'NEUTRAL',
}

export enum Trend {
  UPTREND = 'UPTREND',
  DOWNTREND = 'DOWNTREND',
  SIDEWAYS = 'SIDEWAYS',
}

export type SignalType = 'NON_MTG' | 'MTG_1_STEP' | 'N/A';

export interface AnalysisResult {
  signal: Signal;
  signalType: SignalType;
  confidence: number;
  trend: Trend;
  support: string;
  resistance: string;
  logic: string;
  previousCandlePower: string;
  pair: string;
  timeframe: string;
  mtgInstruction: string; // New field for clear MTG directions
}
