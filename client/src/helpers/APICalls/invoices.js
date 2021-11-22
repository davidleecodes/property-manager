import serverPath from "./server";

export async function getInvoices() {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(
    `${serverPath}/invoices?_expand=property&_expand=tenant&_expand=user`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function getInvoicesForTenant(tenantId) {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(
    `${serverPath}/invoices?tenantId=${tenantId}`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function getInvoicesForProperty(propertyId) {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(
    `${serverPath}/invoices?propertyId=${propertyId}&_expand=tenant&_expand=user`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}
