import { fetchEventSource, EventSourceMessage, EventStreamContentType } from "@microsoft/fetch-event-source";
const { VITE_BASE_API_URL } = import.meta.env;

class RetriableError extends Error {}
class FatalError extends Error {}

type Headers = { [key: string]: string };

class EventSourceHandler {
  private static instance: EventSourceHandler | null = null;
  private eventSource: EventSource | null = null;
  private headers: Headers = {};
  private method: string = "GET";
  private url: string = "";

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  public static getInstance(): EventSourceHandler {
    if (!EventSourceHandler.instance) {
      EventSourceHandler.instance = new EventSourceHandler();
    }
    return EventSourceHandler.instance;
  }

  public setHeaders(headers: Headers): void {
    this.headers = headers;
  }

  public setUrl(url: string): void {
    this.url = url;
  }

  public async start(onMessageCallback: (msg: EventSourceMessage) => void): Promise<void> {
    if (!this.url) {
      throw new Error("URL is not set. Please set the URL before starting the event source.");
    }

    try {
      await fetchEventSource(this.url, {
        headers: this.headers,
        method: this.method,
        async onopen(response) {
          if (response.ok && response.headers.get("content-type") === EventStreamContentType) {
            return; // everything's good
          } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
            throw new FatalError();
          } else {
            throw new RetriableError();
          }
        },
        onmessage(msg) {
          if (msg.event === "FatalError") {
            throw new FatalError(msg.data);
          }
          onMessageCallback(msg);
        },
        onclose() {
          throw new RetriableError();
        },
        onerror(err) {
          if (err instanceof FatalError) {
            throw err;
          } else {
            // do nothing to automatically retry
          }
        }
      });
    } catch (err) {
      console.error("Error occurred in SSE connection:", err);
    }
  }

  public stop(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }
}

export const eventSourceHandler = EventSourceHandler.getInstance();
eventSourceHandler.setUrl(`${VITE_BASE_API_URL}/sse`);
