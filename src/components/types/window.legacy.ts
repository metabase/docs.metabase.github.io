interface Window {
  // Some legacy behavior relies on globally scoped functions
  Sentry?: {
    init: (options: Record<string, unknown>) => void;
    lazyLoadIntegration?: (
      name: string,
    ) => Promise<(options: Record<string, unknown>) => unknown>;
    addIntegration?: (integration: unknown) => void;
    captureException?: (error: unknown) => void;
  };
}
