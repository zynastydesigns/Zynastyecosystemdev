import { useEffect, useState } from "react";
import { Vendor } from "../types/models";
import { searchVendors } from "../services/VendorService";

export function useVendorSearch(query: string) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    searchVendors(query).then((results) => {
      if (!cancelled) {
        setVendors(results);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [query]);

  return { vendors, loading };
}
