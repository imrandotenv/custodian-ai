/**
 * Custodian-AI Frontend API Client
 * Drop this file into your Next.js project at: src/lib/api.ts or components/api.ts
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// ==========================================
// TypeScript Interfaces
// ==========================================

export type UserRole = "tourist" | "local" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  hamlet?: string | null;
  bio?: string | null;
  avatar?: string | null;
  verifiedGI: boolean;
  createdAt: string;
}

export interface Artwork {
  id: string;
  title: string;
  artForm: string;
  nativeDescription: string;
  englishDescription: string;
  price: number;
  images: string[];
  status: "AVAILABLE" | "RESERVED" | "ARCHIVED";
  views: number;
  pledgeCount: number;
  consentRules: string[];
  provenanceHash: string;
  giTagNumber?: string | null;
  originHamlet?: string | null;
  artisanName?: string | null;
  custodianId: string;
  custodian?: {
    id: string;
    name: string;
    hamlet?: string | null;
    avatar?: string | null;
    verifiedGI: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Pledge {
  id: string;
  userId: string;
  artworkId: string;
  acceptedRules: string[];
  digitalSignature: string;
  depositAmount: number;
  status: "ACTIVE" | "FULFILLED" | "REVOKED";
  createdAt: string;
  artwork?: Partial<Artwork>;
}

export interface Atelier {
  id: string;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  elevation: string;
  masterLineage: string;
  giTag: string;
  geologicalNotes: string;
  activeArtisans: number;
}

export interface ArtisanDashboardStats {
  activeListingsCount: number;
  totalListingsCount: number;
  totalPledgesCount: number;
  totalViews: number;
  directRemunerationPotential: number;
  commissionRate: string;
  recentPledges: Array<{
    id: string;
    travelerName: string;
    artworkTitle: string;
    price: number;
    status: string;
    timestamp: string;
  }>;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    pagination?: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  errors?: unknown;
}

// ==========================================
// Core Fetch Helper
// ==========================================

function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("custodian_token");
  }
  return null;
}

export function setAuthToken(token: string | null) {
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("custodian_token", token);
    } else {
      localStorage.removeItem("custodian_token");
    }
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const payload: ApiResponse<T> = await response.json();

  if (!response.ok || !payload.success) {
    const errorMsg =
      payload.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return payload.data;
}

// ==========================================
// API Modules
// ==========================================

export const authApi = {
  async register(params: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    hamlet?: string;
    bio?: string;
  }) {
    const data = await request<{ user: User; token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(params),
    });
    setAuthToken(data.token);
    return data;
  },

  async login(credentials: { email: string; password: string }) {
    const data = await request<{ user: User; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    setAuthToken(data.token);
    return data;
  },

  async logout() {
    try {
      await request<{ loggedOut: boolean }>("/auth/logout", { method: "POST" });
    } finally {
      setAuthToken(null);
    }
  },

  async getMe(): Promise<User> {
    return request<User>("/auth/me");
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    return request<User>("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(updates),
    });
  },
};

export const artworksApi = {
  async list(params?: {
    artForm?: string;
    region?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<Artwork[]> {
    const query = new URLSearchParams();
    if (params?.artForm) query.append("artForm", params.artForm);
    if (params?.region) query.append("region", params.region);
    if (params?.status) query.append("status", params.status);
    if (params?.search) query.append("search", params.search);
    if (params?.page) query.append("page", params.page.toString());
    if (params?.limit) query.append("limit", params.limit.toString());

    return request<Artwork[]>(`/artworks?${query.toString()}`);
  },

  async getById(id: string): Promise<Artwork> {
    return request<Artwork>(`/artworks/${id}`);
  },

  async create(data: {
    title: string;
    artForm: string;
    nativeDescription: string;
    englishDescription?: string;
    price: number;
    images: string[];
    consentRules: string[];
    giTagNumber?: string;
    originHamlet?: string;
    artisanName?: string;
  }): Promise<Artwork> {
    return request<Artwork>("/artworks", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async update(id: string, data: Partial<Artwork>): Promise<Artwork> {
    return request<Artwork>(`/artworks/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async delete(id: string): Promise<{ id: string; deleted: boolean }> {
    return request<{ id: string; deleted: boolean }>(`/artworks/${id}`, {
      method: "DELETE",
    });
  },
};

export const pledgesApi = {
  async create(data: {
    artworkId: string;
    acceptedRules: string[];
    depositAmount?: number;
  }): Promise<Pledge & { verificationUrl: string }> {
    return request<Pledge & { verificationUrl: string }>("/pledges", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getMyPledges(): Promise<Pledge[]> {
    return request<Pledge[]>("/pledges/my");
  },

  async getArtworkPledges(artworkId: string): Promise<Pledge[]> {
    return request<Pledge[]>(`/pledges/artwork/${artworkId}`);
  },

  async verify(signature: string) {
    return request<{
      verified: boolean;
      pledgeId: string;
      signedAt: string;
      status: string;
      signatory: string;
      artwork: Artwork;
      acceptedRules: string[];
      digitalSignature: string;
    }>(`/pledges/verify/${signature}`);
  },
};

export const ateliersApi = {
  async list(): Promise<Atelier[]> {
    return request<Atelier[]>("/ateliers");
  },

  async getById(id: string): Promise<Atelier> {
    return request<Atelier>(`/ateliers/${id}`);
  },
};

export const aiApi = {
  async translate(text: string, from = "auto", to = "english") {
    return request<{
      translatedText: string;
      provider: string;
      culturalNote: string;
    }>("/ai/translate", {
      method: "POST",
      body: JSON.stringify({ text, from, to }),
    });
  },

  async generateLore(params: {
    artForm: string;
    motifs: string;
    region?: string;
    artisanName?: string;
  }) {
    return request<{ lore: string; provider: string }>("/ai/generate-lore", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  async chat(
    message: string,
    conversationHistory: Array<{
      role: "user" | "assistant" | "system";
      content: string;
    }> = []
  ) {
    return request<{ message: string; provider: string }>("/ai/chat", {
      method: "POST",
      body: JSON.stringify({ message, conversationHistory }),
    });
  },
};

export const dashboardApi = {
  async getArtisanStats(): Promise<ArtisanDashboardStats> {
    return request<ArtisanDashboardStats>("/dashboard/artisan-stats");
  },
};

export const uploadApi = {
  async uploadSingle(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    const token = getAuthToken();
    const headers: Record<string, string> = {};
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}/uploads/single`, {
      method: "POST",
      headers,
      body: formData,
    });

    const payload = await response.json();
    if (!response.ok || !payload.success) {
      throw new Error(payload.message || "Failed to upload image");
    }

    return payload.data as {
      filename: string;
      url: string;
      size: number;
      mimetype: string;
    };
  },
};
