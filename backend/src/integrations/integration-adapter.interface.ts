export interface IntegrationAdapter {
  name: string;
  send(payload: unknown): Promise<void>;
}
