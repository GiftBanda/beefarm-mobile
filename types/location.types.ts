export interface FrontendWeatherData {
    location: string;
    temperature: number;
    feels_like: number;
    humidity: number;
    description: string;
    wind_speed: number;
    unit: 'Celsius' | 'Fahrenheit';
    iconUrl: string;
}
