import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { OFTCreated } from "../generated/schema"
import { OFTCreated as OFTCreatedEvent } from "../generated/UniversalFactory/UniversalFactory"
import { handleOFTCreated } from "../src/universal-factory"
import { createOFTCreatedEvent } from "./universal-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let tokenAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let name = "Example string value"
    let symbol = "Example string value"
    let eids = [BigInt.fromI32(234)]
    let deployId = BigInt.fromI32(234)
    let newOFTCreatedEvent = createOFTCreatedEvent(
      tokenAddress,
      name,
      symbol,
      eids,
      deployId
    )
    handleOFTCreated(newOFTCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("OFTCreated created and stored", () => {
    assert.entityCount("OFTCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "OFTCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "OFTCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "OFTCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "symbol",
      "Example string value"
    )
    assert.fieldEquals(
      "OFTCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "eids",
      "[234]"
    )
    assert.fieldEquals(
      "OFTCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "deployId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
