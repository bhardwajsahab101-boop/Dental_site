const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

/**
 * Encodes a Uint8Array to base64url string.
 */
function uint8ArrayToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

/**
 * Decodes a base64url string to ArrayBuffer.
 */
function base64UrlToArrayBuffer(base64url: string): ArrayBuffer {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer as ArrayBuffer;
}

/**
 * Signs a payload with HMAC-SHA256 and returns a JWT token string.
 */
export async function signJWT(
  payload: Record<string, unknown>,
  secret: string,
  expireInSeconds: number = 86400
): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + expireInSeconds;
  const fullPayload = { ...payload, exp };

  const headerBase64 = uint8ArrayToBase64Url(
    textEncoder.encode(JSON.stringify(header))
  );
  const payloadBase64 = uint8ArrayToBase64Url(
    textEncoder.encode(JSON.stringify(fullPayload))
  );

  const tokenInput = `${headerBase64}.${payloadBase64}`;

  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(tokenInput)
  );

  const signatureBase64 = uint8ArrayToBase64Url(new Uint8Array(signatureBuffer));
  return `${tokenInput}.${signatureBase64}`;
}

interface JWTPayload extends Record<string, unknown> {
  exp?: number;
  email?: string;
}

/**
 * Verifies a JWT token using HMAC-SHA256 and returns the decoded payload, or null if invalid/expired.
 */
export async function verifyJWT(
  token: string,
  secret: string
): Promise<JWTPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerBase64, payloadBase64, signatureBase64] = parts;
    const tokenInput = `${headerBase64}.${payloadBase64}`;

    const key = await crypto.subtle.importKey(
      "raw",
      textEncoder.encode(secret),
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["verify"]
    );

    const signatureBuffer = base64UrlToArrayBuffer(signatureBase64);
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBuffer,
      textEncoder.encode(tokenInput)
    );

    if (!isValid) return null;

    const payloadStr = textDecoder.decode(
      new Uint8Array(base64UrlToArrayBuffer(payloadBase64))
    );
    const payload = JSON.parse(payloadStr) as JWTPayload;

    // Check expiration
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}
