import serverPath from "./server";

export async function getTenantsForProperty(propertyId) {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(
    `${serverPath}/tenants?propertyId=${propertyId}&_expand=user`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}

export async function getTenants() {
  const fetchOptions = {
    method: "GET",
    credentials: "include",
  };
  return await fetch(
    `${serverPath}/tenants?_expand=property&_expand=user`,
    fetchOptions
  )
    .then((res) => res.json())
    .catch(() => ({
      error: { message: "Unable to connect to server. Please try again" },
    }));
}
