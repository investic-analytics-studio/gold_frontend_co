/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/**
 * Ampli - A strong typed wrapper for your Analytics
 *
 * This file is generated by Amplitude.
 * To update run 'ampli pull crypto-studio-frontend'
 *
 * Required dependencies: @amplitude/analytics-browser@^1.3.0
 * Tracking Plan Version: 2
 * Build: 1.0.0
 * Runtime: browser:typescript-ampli-v2
 *
 * [View Tracking Plan](https://data.amplitude.com/quantsmith/quantsmith/events/main/latest)
 *
 * [Full Setup Instructions](https://data.amplitude.com/quantsmith/quantsmith/implementation/crypto-studio-frontend)
 */

import * as amplitude from '@amplitude/analytics-browser';

export type Environment = 'production' | 'staging';

export const ApiKey: Record<Environment, string> = {
  production: 'a7c564c8d8465b380575da5de1d63326',
  staging: '26725c1e0a558db224f6cb94c7ab40fd'
};

/**
 * Default Amplitude configuration options. Contains tracking plan information.
 */
export const DefaultConfiguration: BrowserOptions = {
  plan: {
    version: '2',
    branch: 'main',
    source: 'crypto-studio-frontend',
    versionId: 'f5de8c37-d3b5-48c2-879a-b3b4883404df'
  },
  ...{
    ingestionMetadata: {
      sourceName: 'browser-typescript-ampli',
      sourceVersion: '2.0.0'
    }
  }
};

export interface LoadOptionsBase { disabled?: boolean }

export type LoadOptionsWithEnvironment = LoadOptionsBase & { environment: Environment; client?: { configuration?: BrowserOptions; }; };
export type LoadOptionsWithApiKey = LoadOptionsBase & { client: { apiKey: string; configuration?: BrowserOptions; } };
export type LoadOptionsWithClientInstance = LoadOptionsBase & { client: { instance: BrowserClient; } };

export type LoadOptions = LoadOptionsWithEnvironment | LoadOptionsWithApiKey | LoadOptionsWithClientInstance;

export interface IdentifyProperties {
  /**
   * | Rule | Value |
   * |---|---|
   * | Type | integer |
   */
  current_package_id?: number;
  referring_domain?: string;
  ttclid?: string;
}

export interface ViewCryptoStudioPageProperties {
  /**
   * | Rule | Value |
   * |---|---|
   * | Regex |  |
   */
  page_name?: string;
}

export interface ViewTwitterPageComponentProperties {
  component_name: string;
  sub_select: string;
}

export class Identify implements BaseEvent {
  event_type = amplitude.Types.SpecialEventType.IDENTIFY;

  constructor(
    public event_properties?: IdentifyProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class ViewCryptoStudioPage implements BaseEvent {
  event_type = 'ViewCryptoStudioPage';

  constructor(
    public event_properties?: ViewCryptoStudioPageProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export class ViewTwitterPageComponent implements BaseEvent {
  event_type = 'ViewTwitterPageComponent';

  constructor(
    public event_properties: ViewTwitterPageComponentProperties,
  ) {
    this.event_properties = event_properties;
  }
}

export type PromiseResult<T> = { promise: Promise<T | void> };

const getVoidPromiseResult = () => ({ promise: Promise.resolve() });

// prettier-ignore
export class Ampli {
  private disabled: boolean = false;
  private amplitude?: BrowserClient;

  get client(): BrowserClient {
    this.isInitializedAndEnabled();
    return this.amplitude!;
  }

  get isLoaded(): boolean {
    return this.amplitude != null;
  }

  private isInitializedAndEnabled(): boolean {
    if (!this.amplitude) {
      console.error('ERROR: Ampli is not yet initialized. Have you called ampli.load() on app start?');
      return false;
    }
    return !this.disabled;
  }

  /**
   * Initialize the Ampli SDK. Call once when your application starts.
   *
   * @param options Configuration options to initialize the Ampli SDK with.
   */
  load(options: LoadOptions): PromiseResult<void> {
    this.disabled = options.disabled ?? false;

    if (this.amplitude) {
      console.warn('WARNING: Ampli is already intialized. Ampli.load() should be called once at application startup.');
      return getVoidPromiseResult();
    }

    let apiKey: string | null = null;
    if (options.client && 'apiKey' in options.client) {
      apiKey = options.client.apiKey;
    } else if ('environment' in options) {
      apiKey = ApiKey[options.environment];
    }

    if (options.client && 'instance' in options.client) {
      this.amplitude = options.client.instance;
    } else if (apiKey) {
      this.amplitude = amplitude.createInstance();
      const configuration = (options.client && 'configuration' in options.client) ? options.client.configuration : {};
      return this.amplitude.init(apiKey, undefined, { ...DefaultConfiguration, ...configuration });
    } else {
      console.error("ERROR: ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'");
    }

    return getVoidPromiseResult();
  }

  /**
   * Identify a user and set user properties.
   *
   * @param userId The user's id.
   * @param properties The user properties.
   * @param options Optional event options.
   */
  identify(
    userId: string | undefined,
    properties?: IdentifyProperties,
    options?: EventOptions,
  ): PromiseResult<Result> {
    if (!this.isInitializedAndEnabled()) {
      return getVoidPromiseResult();
    }

    if (userId) {
      options = {...options,  user_id: userId};
    }

    const amplitudeIdentify = new amplitude.Identify();
    const eventProperties = properties;
    if (eventProperties != null) {
      for (const [key, value] of Object.entries(eventProperties)) {
        amplitudeIdentify.set(key, value);
      }
    }
    return this.amplitude!.identify(
      amplitudeIdentify,
      options,
    );
  }

 /**
  * Flush the event.
  */
  flush() : PromiseResult<Result> {
    if (!this.isInitializedAndEnabled()) {
      return getVoidPromiseResult();
    }

    return this.amplitude!.flush();
  }

  /**
   * Track event
   *
   * @param event The event to track.
   * @param options Optional event options.
   */
  track(event: Event, options?: EventOptions): PromiseResult<Result> {
    if (!this.isInitializedAndEnabled()) {
      return getVoidPromiseResult();
    }

    return this.amplitude!.track(event, undefined, options);
  }

  /**
   * ViewCryptoStudioPage
   *
   * [View in Tracking Plan](https://data.amplitude.com/quantsmith/quantsmith/events/main/latest/ViewCryptoStudioPage)
   *
   * Event has no description in tracking plan.
   *
   * @param properties The event's properties (e.g. page_name)
   * @param options Amplitude event options.
   */
  viewCryptoStudioPage(
    properties?: ViewCryptoStudioPageProperties,
    options?: EventOptions,
  ) {
    return this.track(new ViewCryptoStudioPage(properties), options);
  }

  /**
   * ViewTwitterPageComponent
   *
   * [View in Tracking Plan](https://data.amplitude.com/quantsmith/quantsmith/events/main/latest/ViewTwitterPageComponent)
   *
   * Event has no description in tracking plan.
   *
   * @param properties The event's properties (e.g. component_name)
   * @param options Amplitude event options.
   */
  viewTwitterPageComponent(
    properties: ViewTwitterPageComponentProperties,
    options?: EventOptions,
  ) {
    return this.track(new ViewTwitterPageComponent(properties), options);
  }
}

export const ampli = new Ampli();

// BASE TYPES
type BrowserOptions = amplitude.Types.BrowserOptions;

export type BrowserClient = amplitude.Types.BrowserClient;
export type BaseEvent = amplitude.Types.BaseEvent;
export type IdentifyEvent = amplitude.Types.IdentifyEvent;
export type GroupEvent = amplitude.Types.GroupIdentifyEvent;
export type Event = amplitude.Types.Event;
export type EventOptions = amplitude.Types.EventOptions;
export type Result = amplitude.Types.Result;
