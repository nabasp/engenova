// Shared between the contact form (client) and the enquiry Server Action.

/** Select values are message keys, so the action can map them back to English. */
export const COUNTRY_KEYS = ["oKSA", "oUAE", "oQatar", "oOman", "oBahrain", "oKuwait", "oOther"] as const;
export const DEADLINE_KEYS = ["dl1", "dl2", "dl3", "dl4"] as const;

export type EnquiryField = "name" | "company" | "email";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  fieldErrors?: Partial<Record<EnquiryField, "required" | "email">>;
};
