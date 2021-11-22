import serverPath from "./server";

export async function getLeases() {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(
    `${serverPath}/leases?_expand=property&_expand=tenant&_expand=user`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function getLeasesForTenant(tenantId) {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(`${serverPath}/leases?tenantId=${tenantId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function getLeasesForProperty(propertyId) {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(
    `${serverPath}/leases?propertyId=${propertyId}&_expand=tenant&_expand=user`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}
