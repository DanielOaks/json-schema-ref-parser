"use strict";

const { expect } = require("chai");
const $RefParser = require("../../../lib");
const helper = require("../../utils/helper");
const path = require("../../utils/path");
const parsedSchema = require("./parsed");
const dereferencedSchema = require("./dereferenced");

describe("Schema with OpenAPI 3.1 $ref description/schema overrides", () => {
  it("should parse successfully", async () => {
    let parser = new $RefParser();
    const schema = await parser.parse(path.rel("specs/oas31/oas31.yaml"));
    expect(schema).to.equal(parser.schema);
    expect(schema).to.deep.equal(parsedSchema);
    expect(parser.$refs.paths()).to.deep.equal([path.abs("specs/oas31/oas31.yaml")]);
  });

  it("should resolve successfully", helper.testResolve(
    path.rel("specs/oas31/oas31.yaml"),
    path.abs("specs/oas31/oas31.yaml"), parsedSchema
  ));

  // it("should dereference successfully", async () => {
  //   let parser = new $RefParser();
  //   const schema = await parser.dereference(path.rel("specs/oas31/oas31.yaml"));
  //   expect(schema).to.equal(parser.schema);
  //   expect(schema).to.deep.equal(dereferencedSchema);
  //   // Reference equality
  //   expect(schema.properties.name).to.equal(schema.definitions.name);
  //   expect(schema.definitions.requiredString)
  //     .to.equal(schema.definitions.name.properties.first)
  //     .to.equal(schema.definitions.name.properties.last)
  //     .to.equal(schema.properties.name.properties.first)
  //     .to.equal(schema.properties.name.properties.last);
  //   // The "circular" flag should NOT be set
  //   expect(parser.$refs.circular).to.equal(false);
  // });

  it("should dereference successfully", async () => {
    let parser = new $RefParser();
    const schema = await parser.dereference(path.rel("specs/oas31/oas31.yaml"));
    expect(schema).to.equal(parser.schema);
    expect(schema).to.deep.equal(dereferencedSchema);
    // The "circular" flag should NOT be set
    expect(parser.$refs.circular).to.equal(false);
  });

  it("should bundle successfully", async () => {
    let parser = new $RefParser();
    const schema = await parser.bundle(path.rel("specs/oas31/oas31.yaml"));
    expect(schema).to.equal(parser.schema);
    expect(schema).to.deep.equal(parsedSchema);
  });
});
