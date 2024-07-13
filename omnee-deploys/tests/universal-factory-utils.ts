import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  OFTCreated,
  OwnershipTransferred,
  PeerSet
} from "../generated/UniversalFactory/UniversalFactory"

export function createOFTCreatedEvent(
  tokenAddress: Address,
  name: string,
  symbol: string,
  eids: Array<BigInt>,
  deployId: BigInt
): OFTCreated {
  let oftCreatedEvent = changetype<OFTCreated>(newMockEvent())

  oftCreatedEvent.parameters = new Array()

  oftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )
  oftCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  oftCreatedEvent.parameters.push(
    new ethereum.EventParam("symbol", ethereum.Value.fromString(symbol))
  )
  oftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "eids",
      ethereum.Value.fromUnsignedBigIntArray(eids)
    )
  )
  oftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "deployId",
      ethereum.Value.fromUnsignedBigInt(deployId)
    )
  )

  return oftCreatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPeerSetEvent(eid: BigInt, peer: Bytes): PeerSet {
  let peerSetEvent = changetype<PeerSet>(newMockEvent())

  peerSetEvent.parameters = new Array()

  peerSetEvent.parameters.push(
    new ethereum.EventParam("eid", ethereum.Value.fromUnsignedBigInt(eid))
  )
  peerSetEvent.parameters.push(
    new ethereum.EventParam("peer", ethereum.Value.fromFixedBytes(peer))
  )

  return peerSetEvent
}
