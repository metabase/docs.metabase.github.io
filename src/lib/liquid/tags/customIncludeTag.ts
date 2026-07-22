import { IncludeTag, Liquid, type Context, type Emitter } from "liquidjs";

// Overrides LiquidJS's built-in `include` tag so each included template's rendered HTML
// can be post-processed before it's written to the main output.

class BufferingEmitter implements Emitter {
  buffer = "";
  write(html: unknown) {
    this.buffer += String(html);
  }
}

export const registerCustomIncludeTag =
  (postProcessFn: (includeHtml: string) => string) => (engine: Liquid) => {
    class CustomIncludeTag extends IncludeTag {
      *render(
        ctx: Context,
        emitter: Emitter,
      ): Generator<unknown, void, unknown> {
        const buffer = new BufferingEmitter();
        yield* super.render(ctx, buffer);
        emitter.write(postProcessFn(buffer.buffer));
      }
    }
    engine.registerTag("include", CustomIncludeTag);
    return engine;
  };
