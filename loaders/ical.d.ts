declare module "ical.js" {
  namespace ICAL {
    class Component {
      static fromString(input: string): this;
      get name(): string;
      getFirstPropertyValue(name: string): string | null;
    }
  }

  export = ICAL;
}
