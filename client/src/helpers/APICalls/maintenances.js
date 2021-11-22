import serverPath from "./server";

export async function getMaintenances() {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(
    `${serverPath}/maintenance?_expand=property&_expand=tenant&_expand=user`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function getMaintenanceForTenant(tenantId) {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(
    `${serverPath}/maintenance?tenantId=${tenantId}`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function getMaintenanceForProperty(propertyId) {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(
    `${serverPath}/maintenance?propertyId=${propertyId}&_expand=tenant&_expand=user`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}
