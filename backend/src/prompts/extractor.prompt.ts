export const CRM_FIELDS = [
  "created_at",
  "name",
  "email",
  "country_code",
  "mobile",
  "city",
  "state",
  "country",
  "lead_owner",
  "crm_status",
  "crm_note",
  "data_source",
  "possession_time",
  "description",
];

export const ALLOWED_CRM_STATUS = [
  "new",
  "open",
  "contacted",
  "qualified",
  "interested",
  "follow_up",
  "closed",
  "lost",
];

export const ALLOWED_DATA_SOURCE = [
  "website",
  "facebook",
  "instagram",
  "google",
  "referral",
  "csv_import",
  "other",
];

export const buildExtractionPrompt = (rows: unknown[]) => `
You are an expert CRM data extraction engine.

Your task is to convert arbitrary CSV records into a standardized CRM schema.

Target schema:

${CRM_FIELDS.join(", ")}

Rules:

1. Map similar column names automatically.
Examples:
Full Name -> name
Customer -> name
Person -> name
Email Address -> email
Phone -> mobile
Mobile No -> mobile
Remarks -> crm_note
Status -> crm_status

2. Return ONLY valid JSON.

3. Never invent data.

4. Missing fields must be null.

5. If multiple emails exist:
- first email -> email
- remaining -> crm_note

6. If multiple phone numbers exist:
- first -> mobile
- remaining -> crm_note

7. crm_status MUST be one of:
${ALLOWED_CRM_STATUS.join(", ")}

If uncertain use "new".

8. data_source MUST be one of:
${ALLOWED_DATA_SOURCE.join(", ")}

If unknown use "csv_import".

9. Preserve original information whenever possible.

Records:

${JSON.stringify(rows)}

Return JSON array only.
`;