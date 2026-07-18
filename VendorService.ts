import { Vendor, NO_VENDOR } from "../types/models";

/**
 * VendorService
 * ---------------------------------------------------------------------
 * Beacon intentionally does NOT persist vendor records. Vendors live in
 * the CRM system of record. This service is the single integration
 * point — swap `fetchVendorsFromCRM` for a real CRM API call and every
 * screen that lists vendors updates automatically.
 */

// Mock CRM response — replace with e.g. `fetch("/api/crm/vendors")`.
const MOCK_CRM_VENDORS: Vendor[] = [
  { id: "v1", name: "Greenply Industries", phone: "+91 98450 11223", category: "Plywood", gstin: "29ABCDE1234F1Z5", source: "crm" },
  { id: "v2", name: "Ozone Hardware", phone: "+91 99001 22334", category: "Hardware", gstin: "29QWERT5678G1Z2", source: "crm" },
  { id: "v3", name: "Lamitech Laminates", phone: "+91 97022 33445", category: "Laminate", gstin: "29LMNOP9012H1Z8", source: "crm" },
  { id: "v4", name: "Sri Sai Electricals", phone: "+91 96334 55667", category: "Electrical", source: "crm" },
  { id: "v5", name: "Royal Transport", phone: "+91 95445 66778", category: "Transportation", source: "crm" },
];

let cache: Vendor[] | null = null;

export async function fetchVendorsFromCRM(): Promise<Vendor[]> {
  // Simulate network latency of a real CRM integration.
  await new Promise((r) => setTimeout(r, 150));
  cache = MOCK_CRM_VENDORS;
  return cache;
}

export async function searchVendors(query: string): Promise<Vendor[]> {
  const vendors = cache ?? (await fetchVendorsFromCRM());
  const q = query.trim().toLowerCase();
  const results = q
    ? vendors.filter((v) => v.name.toLowerCase().includes(q))
    : vendors;
  return [...results, NO_VENDOR];
}

export async function getVendorById(id: string): Promise<Vendor | undefined> {
  if (id === NO_VENDOR.id) return NO_VENDOR;
  const vendors = cache ?? (await fetchVendorsFromCRM());
  return vendors.find((v) => v.id === id);
}
