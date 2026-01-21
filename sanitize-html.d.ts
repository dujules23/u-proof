declare module "sanitize-html" {
  interface SanitizeOptions {
    allowedTags?: string[];
    allowedAttributes?: Record<string, string[]>;
    disallowedTagsMode?: "discard" | "escape";
    nonTextTags?: string[];
    transformTags?: Record<string, any>;
  }

  function sanitizeHtml(dirty: string, options?: SanitizeOptions): string;

  export = sanitizeHtml;
}
