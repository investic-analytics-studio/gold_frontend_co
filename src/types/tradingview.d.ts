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
  library_path?: string;
  locale?: string;
  charts_storage_url?: string;
  charts_storage_api_version?: string;
  client_id?: string;
  user_id?: string;
  fullscreen?: boolean;
  autosize?: boolean;
  container?: string | HTMLElement;
  datafeed?: any;
  theme?: string;
  overrides?: Record<string, any>;
  disabled_features?: string[];
  enabled_features?: string[];
  studies_overrides?: Record<string, any>;
}

export class widget {
  constructor(options: ChartingLibraryWidgetOptions);
  onChartReady(callback: () => void): void;
  headerReady(): Promise<void>;
  createButton(): HTMLElement;
  remove(): void;
  closePopupsAndDialogs(): void;
  showNoticeDialog(options: {
    title: string;
    body: string;
    callback: () => void;
  }): void;
}

export interface IndicatorContext {
  new_var: (value: any) => any;
  select_sym: (symbol: string) => any;
}

export interface CustomIndicator {
  _context?: IndicatorContext;
  _input?: (name: string) => any;
  init: (context: IndicatorContext, input: (name: string) => any) => void;
  main: (context: IndicatorContext, input: (name: string) => any) => number[];
}

export interface CustomIndicatorConstructor {
  new (): CustomIndicator;
}

export interface PineScriptStudy {
  name: string;
  metainfo: {
    _metainfoVersion: number;
    id: string;
    name: string;
    description: string;
    shortDescription: string;
    is_hidden_study: boolean;
    is_price_study: boolean;
    isCustomIndicator: boolean;
    plots: any[];
    defaults: {
      styles: Record<string, any>;
      inputs: Record<string, any>;
    };
    inputs: any[];
    format: {
      type: string;
      precision: number;
    };
  };
  constructor: CustomIndicatorConstructor;
}

export interface TradingViewWidget {
  onChartReady: (callback: () => void) => void;
  chart: () => {
    createStudy: (
      name: string,
      isCustom: boolean,
      forceOverlay: boolean,
      inputs?: Record<string, any>,
      callback?: (entityId: string) => void
    ) => void;
  };
}

// Declare global TradingView namespace
declare global {
  interface Window {
    TradingView: {
      widget: typeof widget;
    };
  }
} 