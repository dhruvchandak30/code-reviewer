export type Role = "user" | "manager";

export const login = (id: string, password: string) => {
  if (id === "user" && password === "user") return { role: "user" as Role };
  if (id === "manager" && password === "manager") return { role: "manager" as Role };
  return null;
};
