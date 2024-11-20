import type { ResolutionString } from '@/types/charting_library';

export class CustomUDFDatafeed {
  private data: any[];

  constructor(baseUrl: string, initialData: any[] = []) {
    this.data = initialData.map(bar => ({
      time: new Date(bar.datetime).getTime(),
      open: bar.open,
      high: bar.high,
      low: bar.low,
      close: bar.close,
      volume: bar.volume
    }));
  }

  onReady(callback: (configuration: any) => void): void {
    setTimeout(() => callback({
      supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'] as ResolutionString[],
      supports_time: true,
      supports_marks: false,
      supports_timescale_marks: false,
    }), 0);
  }

  resolveSymbol(
    symbolName: string,
    onSymbolResolvedCallback: (symbolInfo: any) => void
  ): void {
    setTimeout(() => {
      onSymbolResolvedCallback({
        name: symbolName,
        full_name: symbolName,
        description: symbolName,
        type: 'forex',
        session: '24x7',
        timezone: 'UTC',
        minmov: 1,
        pricescale: 100,
        has_intraday: true,
        supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'] as ResolutionString[],
        volume_precision: 2,
        data_status: 'streaming',
      });
    }, 0);
  }

  getBars(
    symbolInfo: any,
    resolution: ResolutionString,
    periodParams: any,
    onHistoryCallback: (bars: any[], meta: { noData: boolean }) => void
  ): void {
    setTimeout(() => {
      if (this.data.length === 0) {
        onHistoryCallback([], { noData: true });
        return;
      }

      onHistoryCallback(this.data, { noData: false });
    }, 0);
  }

  subscribeBars(): void {
    // Real-time updates not needed for initial display
  }

  unsubscribeBars(): void {
    // Cleanup not needed for initial display
  }
} 