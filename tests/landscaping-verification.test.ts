import { describe, it, expect, beforeEach } from "vitest"

// Mock implementation for testing Clarity contracts
const mockPrincipal = (address) => ({ address })
const txSender = mockPrincipal("ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM")
const companyPrincipal = mockPrincipal("ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG")
const newAdmin = mockPrincipal("ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC")

// Mock contract state
let contractState = {
  admin: txSender,
  verifiedCompanies: new Map(),
  blockHeight: 100,
}

// Mock contract functions
const verifyCompany = (company, companyName, licenseNumber) => {
  if (contractState.admin.address !== txSender.address) {
    return { err: 1 }
  }
  
  if (contractState.verifiedCompanies.has(company.address)) {
    return { err: 2 }
  }
  
  contractState.verifiedCompanies.set(company.address, {
    companyName,
    licenseNumber,
    verifiedAt: contractState.blockHeight,
    active: true,
  })
  
  return { ok: true }
}

const isVerified = (company) => {
  const companyData = contractState.verifiedCompanies.get(company.address)
  return companyData && companyData.active ? true : false
}

const revokeVerification = (company) => {
  if (contractState.admin.address !== txSender.address) {
    return { err: 1 }
  }
  
  if (!contractState.verifiedCompanies.has(company.address)) {
    return { err: 3 }
  }
  
  const companyData = contractState.verifiedCompanies.get(company.address)
  companyData.active = false
  contractState.verifiedCompanies.set(company.address, companyData)
  
  return { ok: true }
}

const getCompanyDetails = (company) => {
  return contractState.verifiedCompanies.get(company.address) || null
}

const setAdmin = (newAdmin) => {
  if (contractState.admin.address !== txSender.address) {
    return { err: 1 }
  }
  
  contractState.admin = newAdmin
  return { ok: true }
}

// Tests
describe("Landscaping Verification Contract", () => {
  beforeEach(() => {
    // Reset contract state before each test
    contractState = {
      admin: txSender,
      verifiedCompanies: new Map(),
      blockHeight: 100,
    }
  })
  
  it("should verify a company successfully", () => {
    const result = verifyCompany(companyPrincipal, "Green Thumb Landscaping", "LIC123456")
    expect(result).toEqual({ ok: true })
    expect(isVerified(companyPrincipal)).toBe(true)
  })
  
  it("should not allow non-admin to verify a company", () => {
    contractState.admin = newAdmin // Change admin
    const result = verifyCompany(companyPrincipal, "Green Thumb Landscaping", "LIC123456")
    expect(result).toEqual({ err: 1 })
  })
  
  it("should not verify an already verified company", () => {
    verifyCompany(companyPrincipal, "Green Thumb Landscaping", "LIC123456")
    const result = verifyCompany(companyPrincipal, "Green Thumb Landscaping", "LIC123456")
    expect(result).toEqual({ err: 2 })
  })
  
  it("should revoke verification successfully", () => {
    verifyCompany(companyPrincipal, "Green Thumb Landscaping", "LIC123456")
    const result = revokeVerification(companyPrincipal)
    expect(result).toEqual({ ok: true })
    expect(isVerified(companyPrincipal)).toBe(false)
  })
  
  it("should get company details", () => {
    verifyCompany(companyPrincipal, "Green Thumb Landscaping", "LIC123456")
    const details = getCompanyDetails(companyPrincipal)
    expect(details).toEqual({
      companyName: "Green Thumb Landscaping",
      licenseNumber: "LIC123456",
      verifiedAt: 100,
      active: true,
    })
  })
  
  it("should transfer admin rights", () => {
    const result = setAdmin(newAdmin)
    expect(result).toEqual({ ok: true })
    expect(contractState.admin).toEqual(newAdmin)
  })
})
