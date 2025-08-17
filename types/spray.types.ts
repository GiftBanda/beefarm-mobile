
// --- Spraying Advice Component (Modified) ---
export interface FrontendSprayingAdvice {
    location: string;
    date: string;
    status: 'Good' | 'Caution' | 'Unsuitable';
    reasons: string[];
    details: {
        temperature: number;
        feels_like: number;
        humidity: number;
        windSpeed: number;
        description: string;
        rainProbability: number;
        iconUrl: string; // <-- NEW
    };
}