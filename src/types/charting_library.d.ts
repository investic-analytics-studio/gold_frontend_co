declare module '@/types/charting_library' {
  export type ResolutionString =
    | '1'
    | '5'
    | '15'
    | '30'
    | '60'
    | '240'
    | '1D'
    | '1W'
    | '1M'
    | string;

  export interface ChartingLibraryWidgetOptions {
    symbol?: string;
    interval?: ResolutionString;
    datafeed: any;
    container: HTMLElement;
    library_path?: string;
    locale: string;
    disabled_features?: string[];
    enabled_features?: string[];
    charts_storage_url?: string;
    charts_storage_api_version?: string;
    client_id?: string;
    user_id?: string;
    fullscreen?: boolean;
    autosize?: boolean;
    studies_overrides?: object;
    theme?: "light" | "dark";
    overrides?: {
      [key: string]: string;
    };
  }

  export class widget {
    constructor(options: ChartingLibraryWidgetOptions);
    onChartReady(callback: () => void): void;
    setSymbol(symbol: string, interval: ResolutionString): void;
    remove(): void;
  }
} 