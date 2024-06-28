declare module "ical.js" {
  namespace ICAL {
    class Component {
      static fromString(input: string): this;
      get name(): string;
      getAllProperties(name?: string | undefined): Property[];
    }

    class Property {
      get name(): string;
      getFirstValue(): string;
      getFirstParameter(name: string): string;
    }
  }

  export = ICAL;
}
