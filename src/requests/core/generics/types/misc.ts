/**
 * Keyword arguments for resolving URL template placeholders.
 * 
 * Keyword arguments are used to replace placeholders in URL templates (e.g., `<schoolSlug>`).
 * All values must be strings.
 * 
 */
export type Kwargs = Record<string, string>

/**
 * Query parameters as a record of string keys to optional string values.
 * 
 * Query parameters are appended to the URL as query string parameters (e.g., `?include=homework`).
 * 
 */
export type Params = Record<string, string | undefined>

/**
 * Supported HTTP methods for default viewsets.
 * 
 * - `fetch`: GET request to retrieve data
 * - `send`: PUT/POST request to create or update data
 * - `delete`: DELETE request to remove data
 * - `sendFile`: PATCH request to upload a file
 * - `deleteFile`: DELETE request to remove a file
 */
export type Method = 'fetch' | 'send' | 'delete' | 'sendFile' | 'deleteFile'